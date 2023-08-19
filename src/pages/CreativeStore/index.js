import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Button from "../../components/Button";
import "./style.scss";
import {
  handleError500,
  handleErrorMessage,
  removeAllChildNodes,
  smoothScrollTop,
} from "../../utils/functions/global";
import FloatButton from "../../components/FloatButton";
import BottomSheet from "../../components/BottomSheet";
import {
  initialChatTexts,
  initialLeftPanelDatas,
  initialVisitors,
} from "../../variables/initial/creativeStore";
import Avatar from "react-avatar";
import TextInput from "../../components/TextInput";
import {
  CLIENT_USER_INFO,
  LOGIN,
  MENU_MOBILE,
  NO_STRING,
  ROOM_UNAVAILABLE,
  URL_GET_SERVER_INFO,
} from "../../variables/global";
import {
  VISITORS,
  TRANSACTION_ORDERS,
  VOICE,
  JOINING_AUDIO_URL,
  JOINING_AUDIO,
  LEAVING_AUDIO,
  MUTE_AUDIO,
  UNMUTE_AUDIO,
  UNMUTE_AUDIO_URL,
  MUTE_AUDIO_URL,
  LEAVING_AUDIO_URL,
  DISCONNECTED,
  CONNECTED,
  CONNECTING,
  DISCONNECTING,
} from "../../variables/constants/creativeStore";
import { cookies } from "../../config/cookie";
import { trackPromise } from "react-promise-tracker";
import { useAxios } from "../../utils/hooks/useAxios";
import { videoConfig } from "../../config/mediasoup/config";
import { connectWebsocket } from "../../config/websocket/websocket";
import { useSearchParams } from "react-router-dom";
import {
  NO_STORE_FOUND_IN_THE_CREATIVE_STORE,
  SYSTEM_STILL_EXECUTING_THE_CONNECTION,
} from "../../variables/errorMessages/creativeStore";
import { Device } from "mediasoup-client";
import ErrorHandling from "../ErrorHandling";
import ShowChannels from "./ModularComponents/ShowChannel";
import ShowBottomStatus from "./ModularComponents/ShowBottomStatus";
import Modal from "../../components/Modal";
import { ShowErrorModal } from "./ModularComponents/ShowModals";
import PageLoading from "../PageLoading";

export default function CreativeStore() {
  // REFS //
  // const webRTCref = useRef();
  // socket = connectWebsocket(
  //   process.env.REACT_APP_WG_SIGNALER_SERVICE
  // );

  // HOOKS //
  const zeusService = useAxios();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  // STATES //
  const [socket, setSocket] = useState(null);
  const [rendered, setRendered] = useState(false);
  const [channels, setChannels] = useState([]);
  const [joinedRoom, setJoinedRoom] = useState(null);
  const [joinedStatus, setJoinedStatus] =
    useState(DISCONNECTED);
  const [visitor, setVisitors] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [selectedRightPanel, setSelectedRightPanel] =
    useState(VISITORS);
  const [modalToggle, setModalToggle] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState({
    webRTCSocketConnected: false,
    webRTCStatus: NO_STRING,
    chatSocketStatus: "Ready",
  });

  // VARIABLES //
  const storeId = searchParams.get("id");
  let login = cookies.get(CLIENT_USER_INFO);
  // device variable used to store device
  // to create send/consume transport with the given rtpCapabilities
  let device;
  let rtpCapabilities;
  // producerTransport needed only as an object,
  // as it can produce multiple producer with a single producerTransport
  let producerTransport;
  // consumerTransports need to be as array,
  // as it will be needed to store multiple consumerTransport
  let consumerTransports = [];
  // audio and video parameter for mediasoup producer configuration
  let audioProducer;
  let audioParams;
  let videoProducer;
  let videoParams = { videoConfig };
  // this variable will store all remote audio/video producer
  // to prevent multiple redundant consuming
  let consumedTransports = [];
  // END OF VARIABLES //

  // CLASS SPECIFIC //
  // this class made specifically to store all the function
  // and needed to execute mediasoup webrtc
  class WGSignaler {
    constructor(peerRef) {
      this.peerRef = peerRef;
      this.joinedRoom = null;

      // SOCKET EVENTS LISTENER//
      // server informs the client of user joining the room
      this.peerRef.on("connection-success", (callback) => {
        setConnectionStatus((val) => {
          return {
            ...val,
            webRTCSocketConnected: true,
          };
        });
        callback(storeId);
      });

      // GENERAL EVENTS
      this.peerRef.on("new-producer", ({ producerId }) =>
        this.signalNewConsumerTransport(producerId)
      );

      this.peerRef.on(
        "receive-channels-data",
        (socketsInTheStore) => {
          handleSignaledChannelsRender(socketsInTheStore);
        }
      );

      // ERROR EVENTS
      this.peerRef.on("connect_error", (error) => {
        console.error(
          `connection error due to ${error.message}`
        );
        socket.connect();
      });

      this.peerRef.on("webrtc-error", () =>
        console.log(`already joined the room`)
      );

      this.peerRef.on("user-already-joined", () => {
        alert(`already joined the room`);
        handleRoomSocketCleanUp(this.joinedRoom);
      });

      // CLEANUP EVENTS
      // this will trigger when the local producer(user) leave the room
      this.peerRef.on("disconnect", () => {});

      // this will trigger when the remote producer leave the room
      this.peerRef.on(
        "producer-closed",
        ({
          serverConsumerId,
          serverConsumerKind,
          remoteProducerId,
        }) => {
          // handling remote peer leaving audio , this indicates the remote peer is leaving the room
          handleJoinAudio(LEAVING_AUDIO);
          console.log(
            `producer from id ${remoteProducerId} is closed`
          );
          // server notification is received when a producer is closed
          // we need to close the client-side consumer and associated transport
          const producerToClose = consumerTransports.find(
            (data) => data.producerId === remoteProducerId
          );
          producerToClose.consumerTransport.close();
          producerToClose.consumer.close();

          // remove the consumer transport from the list
          consumerTransports = consumerTransports.filter(
            (data) => data.producerId !== remoteProducerId
          );

          // remove the video div element
          const isAudio = serverConsumerKind === "audio";
          const container = isAudio
            ? document.getElementsByClassName(
                "creative-store-audio-media-container"
              )[0]
            : document.getElementsByClassName(
                `creative-store-video-media-container-${this.joinedRoom.roomId}`
              )[0];

          let removingElem = document.getElementById(
            `creative-store-consumer-${serverConsumerId}-remote-producer-${remoteProducerId}`
          );
          container.removeChild(removingElem);
        }
      );
    }

    get joinedRoom() {
      return this._joinedRoom;
    }

    set joinedRoom(joinedRoom) {
      if (typeof joinedRoom === "undefined")
        throw new Error(
          "Unable to set 'joinedRoom' property with undefined value"
        );
      this._joinedRoom = joinedRoom;
    }

    streamSuccess = (stream) => {
      // set new connection status
      handleChangeStatus(
        "assigning stream recieved to the audio/video param"
      );
      // the video/audio param will later be used to create the producer transport
      audioParams = {
        track: stream.getAudioTracks()[0],
        ...audioParams,
      };
      this.joinRoom();
    };

    getLocalStream = () => {
      // set new connection status
      handleChangeStatus("Getting the local stream");
      // get the audio media device of the user
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then(this.streamSuccess)
        .catch((error) =>
          handleChangeStatus(
            `error getting the local stream with error: ${error.message}`
          )
        );
    };

    joinRoom = () => {
      // set new connection status
      handleChangeStatus(
        "user is ready to join the room - emitting signal to the server"
      );
      // emit join room socket events
      this.peerRef.emit(
        "join-room",
        {
          storeId,
          room: this.joinedRoom,
          user: login.user,
        },
        (data) => {
          // we assign to local variable and will be used when
          // loading the client Device (see createDevice above)
          rtpCapabilities = data.rtpCapabilities;

          // set new connection status
          handleChangeStatus(
            "Got the signal, proceed to create the device"
          );
          // once we have rtpCapabilities from the Router, create Device
          this.createDevice();
        }
      );
    };

    // A device is an endpoint connecting to a Router on the
    // server side to send/recive media
    createDevice = async () => {
      try {
        // handling audio join, this indicates the user is accepted by the signaling server aswell
        handleJoinAudio(JOINING_AUDIO);
        // creating the device constructor
        device = new Device();
        // Loads the device with RTP capabilities of the Router (server side)
        await device.load({
          // see getRtpCapabilities() below
          routerRtpCapabilities: rtpCapabilities,
        });

        // set new connection status
        handleChangeStatus(
          "Device has been successfully created, proceed to create the SEND TRANSPORT"
        );
        // once the device loads, create transport
        this.createSendTransport();
      } catch (error) {
        if (error.name === "UnsupportedError")
          handleChangeStatus("Browser is not supported");
        else
          handleChangeStatus(
            `there is an error while creating the DEVICE, error: ${error}`
          );
      }
    };

    createSendTransport = () => {
      // set new connection status
      handleChangeStatus("Creating the SEND TRANSPORT");
      // see server's socket.on('create-webrtc-transport', sender?, ...)
      // this is a call from Producer, so sender = true
      // The server sends back params needed
      // to create Send Transport on the client side
      this.peerRef.emit(
        "create-webrtc-transport",
        {
          isConsumer: false,
          room: this.joinedRoom,
          user: login.user,
        },
        ({ params }) => {
          // if error the process will end here
          if (params.error) {
            handleChangeStatus(`${params.error}`);
            return;
          }

          // set the new connection status
          handleChangeStatus(
            `Successfully create the new SEND TRANSPORT, proceed with creating the SEND PRODUCER TRANSPORT`
          );
          // creating SEND PRODUCER TRANSPORT
          try {
            producerTransport =
              device.createSendTransport(params);
          } catch (error) {
            handleChangeStatus(
              `there is an error while creating SEND PRODUCER TRANSPORT\n error: ${error}`
            );
            return;
          }

          // assigning event listener on the newly created producer transport
          // transmit the dtls parameters to the server
          producerTransport.on(
            "connect",
            async (
              { dtlsParameters },
              callback,
              errback
            ) => {
              try {
                await this.peerRef.emit(
                  "transport-connect",
                  {
                    dtlsParameters,
                    room: this.joinedRoom,
                    user: login.user,
                    producerTransportId:
                      producerTransport.id,
                  }
                );
                callback();
              } catch (error) {
                errback(error);
              }
            }
          );

          // tell the server to create a Producer
          // with the following parameters and produce
          // and expect back a server side producer id
          // see server's socket.on('transport-produce', ...)
          producerTransport.on(
            "produce",
            async (parameters, callback, errback) => {
              try {
                // console.log(`produce event on producer transport has been fired!`);
                // console.log(`produce parameters: ${JSON.stringify(parameters)}`);
                // console.log(`produce transport id: ${producerTransport.id}`);
                await this.peerRef.emit(
                  "transport-produce",
                  {
                    user: login.user,
                    room: this.joinedRoom,
                    producerTransportId:
                      producerTransport.id,
                    kind: parameters.kind,
                    rtpParameters: parameters.rtpParameters,
                    appData: parameters.appData,
                  },
                  ({ producerId, peersExist }) => {
                    // Tell the transport that parameters were transmitted and provide it with the
                    // server side producer's id.
                    // if producers exist, then join room
                    callback({ producerId });
                    if (peersExist) this.getProducers();
                  }
                );
              } catch (error) {
                errback(error);
              }
            }
          );

          // set the new connection status
          handleChangeStatus(`Producing the audio`);
          this.connectSendTransportForAudio();
        }
      );
    };

    connectSendTransportForAudio = async () => {
      // we now call produce() to instruct the producer transport
      // to send audio media to the Router
      // this action will trigger the 'connect' and 'produce' events above

      audioProducer = await producerTransport.produce(
        audioParams
      );
      if (audioProducer) {
        setJoinedStatus(CONNECTED);
        handleChangeStatus(`Connected`);
        this.peerRef.emit("signal-channels-data", {
          storeId,
        });
      } else {
        handleChangeStatus(`Connection Failed`);
      }
      audioProducer.on("trackended", () =>
        console.log("audio track ended")
      );
      audioProducer.on("transportclose", () =>
        console.log("audio transport ended")
      );
    };

    getProducers = () => {
      // console.log(`get all existing producer to signal: `);
      this.peerRef.emit(
        "get-producers",
        {
          user: login.user,
          room: this.joinedRoom,
        },
        (producerIds) => {
          // for each of the producer create a consumer
          // producerIds.forEach(id => signalNewConsumerTransport(id))
          // console.log(`signal all existing peer : `);
          // console.log(producerIds);
          producerIds.forEach(
            this.signalNewConsumerTransport
          );
        }
      );
    };

    signalNewConsumerTransport = async (
      remoteProducerId
    ) => {
      // check if we are already consuming the remoteProducerId
      if (consumedTransports.includes(remoteProducerId))
        return;
      consumedTransports.push(remoteProducerId);
      // emit the create webrtc transport, this time is to create consumer transport
      await this.peerRef.emit(
        "create-webrtc-transport",
        {
          isConsumer: true,
          room: this.joinedRoom,
          user: login.user,
        },
        ({ params }) => {
          // The server sends back params needed
          // to create Send Transport on the client side
          if (params.error) {
            console.error(
              `there is an error while creating RECV TRANSPORT\n error: ${params.error}`
            );
            return;
          }

          console.log(
            `server successfully create the new RECV TRANSPORT with param: ${JSON.stringify(
              params
            )}`
          );
          console.log(
            `proceed with creating the RECV CONSUMER TRANSPORT`
          );
          let consumerTransport;
          try {
            consumerTransport =
              device.createRecvTransport(params);
          } catch (error) {
            console.error(
              `there is an error while creating RECV CONSUMER TRANSPORT\n error: ${error}`
            );
            return;
          }

          consumerTransport.on(
            "connect",
            async (
              { dtlsParameters },
              callback,
              errback
            ) => {
              try {
                // Signal local DTLS parameters to the server side transport
                // see server's socket.on('transport-recv-connect', ...)
                await this.peerRef.emit(
                  "transport-recv-connect",
                  {
                    dtlsParameters,
                    room: this.joinedRoom,
                    user: login.user,
                    serverConsumerTransportId: params.id,
                  }
                );
                // Tell the transport that parameters were transmitted.
                callback();
              } catch (error) {
                // Tell the transport that something was wrong
                errback(error);
              }
            }
          );

          this.connectRecvTransport(
            consumerTransport,
            remoteProducerId,
            params.id
          );
        }
      );
    };

    connectRecvTransport = async (
      consumerTransport,
      remoteProducerId,
      serverConsumerTransportId
    ) => {
      // for consumer, we need to tell the server first
      // to create a consumer based on the rtpCapabilities and consume
      // if the router can consume, it will send back a set of params as below
      await this.peerRef.emit(
        "transport-recv-consume",
        {
          user: login.user,
          room: this.joinedRoom,
          rtpCapabilities: device.rtpCapabilities,
          remoteProducerId,
          serverConsumerTransportId,
        },
        async ({ params }) => {
          if (params.error) {
            console.error(`there is an error while CONSUMING the producer,
                        with PRODUCER ID: ${remoteProducerId}\n error: ${params.error}`);
            return;
          }

          // then consume with the local consumer transport
          // which creates a consumer
          // console.log(`successfully consume the producer, PRODUCER ID: ${remoteProducerId} and get parameters: ${JSON.stringify(params)}`);
          // console.log(`proceed with consuming the producer on the local consumer transport, with SERVER CONSUMER TRANSPORT ID: ${params.id}`);
          const consumer = await consumerTransport.consume({
            id: params.id,
            producerId: params.producerId,
            kind: params.kind,
            rtpParameters: params.rtpParameters,
          });

          consumerTransports = [
            ...consumerTransports,
            {
              consumerKind: params.kind,
              consumerTransport: consumerTransport,
              consumer: consumer,
              serverConsumerTransportId: params.id,
              producerId: remoteProducerId,
            },
          ];

          this.assignTrackFromConsumer(
            consumer,
            remoteProducerId,
            params.id,
            params.kind
          );
        }
      );
    };

    assignTrackFromConsumer = (
      consumer,
      remoteProducerId,
      serverConsumerId,
      serverConsumerKind,
      roomId = null
    ) => {
      // create a new div element for the new consumer media
      const newElem = document.createElement("div");
      newElem.setAttribute(
        "id",
        `creative-store-consumer-${serverConsumerId}-remote-producer-${remoteProducerId}`
      );

      const isAudio = serverConsumerKind === "audio";
      const newElementId = isAudio
        ? `creative-store-consumer-${serverConsumerId}-remote-producer-${remoteProducerId}-audio`
        : `creative-store-consumer-${serverConsumerId}-remote-producer-${remoteProducerId}-video`;
      if (isAudio) {
        //append to the audio container
        newElem.setAttribute(
          "class",
          "creative-store-remote-audio-subcontainer"
        );
        newElem.innerHTML = `<audio id="${newElementId}" autoplay></audio>`;
      } else {
        //append to the video container
        newElem.setAttribute(
          "class",
          "creative-store-remote-video-subcontainer"
        );
        newElem.innerHTML = `<video 
                id="${newElementId}"
                playsInline 
                autoplay 
                class="creative-store-remote-video" ></video>`;
      }

      // append the new consumer element
      const container = isAudio
        ? document.getElementsByClassName(
            "creative-store-audio-media-container"
          )[0]
        : document.getElementsByClassName(
            `creative-store-video-media-container-${roomId}`
          )[0];
      container.appendChild(newElem);

      // destructure and retrieve the video track from the producer
      const { track } = consumer;
      // console.log(`playing track from CONSUMER WITH ID: ${consumer.id}`);
      document.getElementById(newElementId).srcObject =
        new MediaStream([track]);

      // the server consumer started with media paused
      // so we need to inform the server to resume
      this.peerRef.emit("consumer-resume", {
        room: this.joinedRoom,
        user: login.user,
        serverConsumerId: serverConsumerId,
      });
    };

    leaveRoom = async () => {
      await this.peerRef.emit("leave-room", () => {
        // handling user leaving audio , this indicates the user is leaving the room
        handleJoinAudio(LEAVING_AUDIO);
        // set array variables to empty array
        // set the variables to undefined so it can be garbage collected
        consumerTransports = [];
        consumedTransports = [];
        device = undefined;
        rtpCapabilities = undefined;
        producerTransport = undefined;
        audioProducer = undefined;
        // stop audio/video tracks
        audioParams.track.stop();
        // delete reference to the variable
        delete audioParams.track;
        // get containers
        const audioContainer =
          document.getElementsByClassName(
            "creative-store-audio-media-container"
          )[0];
        const videoContainer =
          document.getElementsByClassName(
            `creative-store-video-media-container-${this.joinedRoom.roomId}`
          )[0];
        // remove all media element child
        if (audioContainer)
          removeAllChildNodes(audioContainer);
        if (videoContainer)
          removeAllChildNodes(videoContainer);
      });
    };
  }

  const mediaSignaler = useMemo(() => {
    if (socket) return new WGSignaler(socket);
  }, [socket]);

  // FUNCTION SPECIFICS

  function handleInitialize() {
    zeusService
      .getData({
        endpoint: process.env.REACT_APP_ZEUS_SERVICE,
        url: URL_GET_SERVER_INFO(`?storeId=${storeId}`),
      })
      .then((result) => {
        if (result.responseStatus === 200) {
          handleInitialChannelsRender(
            initialLeftPanelDatas
          );
          setVisitors(initialVisitors);
          setRendered(true);
        }
      })
      .catch((error) => {
        if (error.responseStatus === 500) handleError500();
        else
          handleErrorMessage(
            error,
            setErrorMessage,
            setModalToggle,
            modalToggle
          );
      });
  }

  function handleClearChannel(channels) {
    const newChannels = (function selfInvoke(
      obj,
      alterKey,
      isContinueInvoke
    ) {
      return Object.entries(obj).reduce(
        (acc, [key, val]) => {
          return {
            ...acc,
            [key]: {
              ...val,
              [alterKey]: isContinueInvoke
                ? selfInvoke(
                    val[alterKey],
                    "roomSockets",
                    false
                  )
                : {},
            },
          };
        },
        {}
      );
    })(channels, "channelRooms", true);

    return { ...newChannels };
  }

  function handleChannelRender(
    channels,
    socketsInTheStore
  ) {
    // iterate through the room from the ws response
    let newChannels = { ...channels };
    if (Object.entries(socketsInTheStore).length === 0)
      return handleClearChannel(newChannels);
    else {
      newChannels = (function selfInvoke(
        obj,
        alterKey,
        isContinueInvoke
      ) {
        return Object.entries(obj).reduce(
          (acc, [key, val]) => {
            const findRoom = (() => {
              if (isContinueInvoke) return;
              return Object.entries(socketsInTheStore).find(
                ([roomKey, socketVal]) => {
                  return roomKey === key;
                }
              );
            })();

            return {
              ...acc,
              [key]: {
                ...val,
                [alterKey]: isContinueInvoke
                  ? selfInvoke(
                      val[alterKey],
                      "roomSockets",
                      false
                    )
                  : typeof findRoom !== "undefined"
                  ? findRoom[1].remotePeers
                  : {},
              },
            };
          },
          {}
        );
      })(channels, "channelRooms", true);
    }

    return { ...newChannels };
  }

  function handleInitialChannelsRender(initialValue) {
    // do something about rendering
    socket.emit(
      "get-channels-data",
      {
        storeId: storeId,
      },
      (socketsInTheStore) => {
        setChannels(() => {
          return handleChannelRender(
            initialValue,
            socketsInTheStore
          );
        });
      }
    );
  }

  function handleSignaledChannelsRender(socketsInTheStore) {
    // do something about rendering
    // socketInTheStore comes from the receiving signal that got emitted from the server
    // the flow supposed to be like:
    /* 
    - (source) emit signal to the server -> socket.emit("signal-channels-data", storeId) 
    - this function is the same as "get-render-data", the differences is just the callback
    - (server) server will process the signal and broadcast to the peer by -> (peer socket).emit("receive-channels-data",...)
    - (other peers) and the other peer will retrieve the signal by -> socket.on("receive-channels-data",...)
    */
    setChannels((oldChannels) => {
      return handleChannelRender(
        oldChannels,
        socketsInTheStore
      );
    });
  }

  function handleChangeStatus(newStatus) {
    setConnectionStatus((oldStatus) => {
      return {
        ...oldStatus,
        webRTCStatus: newStatus,
      };
    });
  }

  function handleJoinTextRoom() {}

  function handleDeleteSocketFromChannel(
    channelId,
    roomId,
    targetUser
  ) {
    setChannels((oldChannels) => {
      let selectedRoomChannel = oldChannels[channelId];
      let updateRooms = selectedRoomChannel.channelRooms;
      let updateRoom = updateRooms[roomId];
      if (!updateRoom) throw new Error(ROOM_UNAVAILABLE);

      // filter the socket
      let filteredSockets = {
        ...oldChannels[channelId].channelRooms[roomId]
          .roomSockets,
      };
      delete filteredSockets[targetUser.userId];

      return {
        ...oldChannels,
        [channelId]: {
          ...oldChannels[channelId],
          channelRooms: {
            ...oldChannels[channelId].channelRooms,
            [roomId]: {
              ...oldChannels[channelId].channelRooms[
                roomId
              ],
              roomSockets: {
                ...filteredSockets,
              },
            },
          },
        },
      };
    });
  }

  function handleAddorUpdateSocketOfChannel(
    oldChannels,
    channelId,
    roomId,
    targetUsers,
    isUpdate
  ) {
    // find the room that the socket join
    // if the room is available then push the new socket user info
    let selectedChannel = oldChannels[channelId];
    let updateRooms = selectedChannel.channelRooms;
    let updateRoom = updateRooms[roomId];
    if (!updateRoom) throw new Error(ROOM_UNAVAILABLE);

    // if room available, handle new channel, room, and socket value
    const newSockets = Object.entries(targetUsers).reduce(
      (acc, [key, val]) => {
        return {
          ...acc,
          [key]: {
            ...val,
          },
        };
      },
      {}
    );

    const roomSockets = isUpdate
      ? {
          ...newSockets,
        }
      : {
          ...oldChannels[channelId].channelRooms[roomId]
            .roomSockets,
          ...newSockets,
        };

    return {
      ...oldChannels,
      [channelId]: {
        ...oldChannels[channelId],
        channelRooms: {
          ...oldChannels[channelId].channelRooms,
          [roomId]: {
            ...oldChannels[channelId].channelRooms[roomId],
            roomSockets: roomSockets,
          },
        },
      },
    };
  }

  function handleJoinRoom(room, channel) {
    // find the room that the socket join
    // if the room is available then push the new socket user info
    setChannels((oldChannels) =>
      handleAddorUpdateSocketOfChannel(
        oldChannels,
        channel.channelId,
        room.roomId,
        { [login.user.userId]: login.user },
        false
      )
    );

    // set room with the new value and new channel id
    let selectedRoom = {
      channelId: channel.channelId,
      ...room,
    };

    // set the state and set joined status
    setJoinedRoom({ ...selectedRoom });
    setJoinedStatus(CONNECTING);
    // return the new selected room to be processed
    return selectedRoom;
  }

  function handleBottomSheet() {
    setToggle(!toggle);
  }

  function handleOpenModal(setToggle, toggleValue) {
    setToggle(!toggleValue);
  }

  async function handleJoinAudio(id) {
    const audioElement = document.getElementById(id);
    audioElement.currentTime = 0;
    audioElement.play();
  }

  async function handleRoomSocketCleanUp(joinedRoom) {
    // set room with the new value
    if (!joinedRoom) return;
    setJoinedStatus(DISCONNECTING);
    handleChangeStatus("Leaving...");
    handleDeleteSocketFromChannel(
      joinedRoom.channelId,
      joinedRoom.roomId,
      login.user
    );

    // clear the joined room value
    setJoinedRoom(null);
    // signal the socket to leave the room and do some cleanup on the server side
    await mediaSignaler.leaveRoom().then(() => {
      // set joined status
      setJoinedStatus(DISCONNECTED);
      // set new connection status
      handleChangeStatus(NO_STRING);
    });
  }

  const listenJoinRoom = useCallback(
    async (channel, room, joinedRoom) => {
      // handle WebRTC Socket connection to the signaler service,
      // and store it to webRTCref
      // once it connect it will process the ICE establishment

      // do some validation here
      // validate the connecting state, the desired room type, the login,
      // whether user connected to the room already,
      // and do some cleanups if user want to change room
      if (
        joinedStatus === CONNECTING ||
        joinedStatus === DISCONNECTING
      ) {
        return handleErrorMessage(
          {
            errorContent:
              SYSTEM_STILL_EXECUTING_THE_CONNECTION,
          },
          setErrorMessage,
          setModalToggle,
          modalToggle
        );
      }
      if (room.roomType !== VOICE)
        return handleJoinTextRoom();
      if (!login) return window.handleOpenOverriding(LOGIN);
      if (!room.roomId) return;
      if (
        joinedStatus === CONNECTED &&
        joinedRoom.roomId === room.roomId
      )
        return;
      if (joinedStatus === CONNECTED)
        await handleRoomSocketCleanUp(joinedRoom);

      // proceed altering room state and join status state
      setJoinedStatus(CONNECTING);
      let selectedRoom = handleJoinRoom(room, channel);

      // get local stream and join the selected room
      mediaSignaler.joinedRoom = selectedRoom;
      mediaSignaler.getLocalStream();
    },
    [joinedRoom, joinedStatus, mediaSignaler]
  );

  // COMPONENTS SPECIFIC //
  const ShowNewOrders = (props) => {
    return (
      <Fragment>
        <div className="creative-store-scrollable-visitor-container">
          {props.datas &&
            props.datas.map((obj, index) => {
              return (
                <div
                  className="creative-store-visitor-user"
                  key={`creative-store-visitor-user-${index}`}>
                  <Avatar
                    style={{ cursor: "pointer" }}
                    size={40}
                    round={true}
                    title={obj.fullname}
                    name={obj.fullname}
                  />
                  <div className="creative-store-visitor-user-text-container">
                    <label className="light-color">
                      {obj.fullname}
                    </label>
                    <small>{obj.userRank}</small>
                  </div>
                </div>
              );
            })}
        </div>
      </Fragment>
    );
  };

  const ShowVisitors = (props) => {
    return (
      <Fragment>
        <div className="creative-store-scrollable-visitor-container">
          {props.datas &&
            props.datas.map((obj, index) => {
              return (
                <div
                  className="creative-store-visitor-user cursor-pointer"
                  key={`creative-store-visitor-user-${index}`}>
                  <Avatar
                    style={{ cursor: "pointer" }}
                    size={40}
                    round={true}
                    title={obj.fullname}
                    name={obj.fullname}
                  />
                  <div className="creative-store-visitor-user-text-container">
                    <label className="light-color cursor-pointer">
                      {obj.fullname}
                    </label>
                    <small>{obj.userRank}</small>
                  </div>
                </div>
              );
            })}
        </div>
      </Fragment>
    );
  };

  const ShowChatTexts = (props) => {
    return props.datas.map((obj1, index1) => {
      return (
        <div
          key={`creative-store-chattext-container-${index1}`}
          className="creative-store-chattext-container">
          <div className="creative-store-chattext-avatar">
            <Avatar
              style={{ cursor: "pointer" }}
              round={true}
              size={50}
              src={obj1.user.profilePictureURI}
              title={obj1.user.fullname}
              name={obj1.user.fullname}
            />
          </div>
          <div className="creative-store-chattext-wrapper">
            <div>
              <h4 className="creative-store-chattext-username">
                {obj1.user.fullname}
              </h4>
              <small>
                {
                  obj1.chats[obj1.chats.length - 1]
                    .createdAt
                }
              </small>
            </div>
            {obj1.chats.map((obj2, index2) => {
              return (
                <p
                  key={`creative-store-chattext-p-${index2}`}>
                  {obj2.content}
                </p>
              );
            })}
          </div>
        </div>
      );
    });
  };

  // MEMOIZE COMPONENTS
  const showChats = useMemo(() => {
    return <ShowChatTexts datas={initialChatTexts} />;
  }, [initialChatTexts]);

  const showRightSidePanel = useMemo(() => {
    if (selectedRightPanel === TRANSACTION_ORDERS)
      return <ShowNewOrders datas={visitor} />;
    return <ShowVisitors datas={visitor} />;
  }, [selectedRightPanel, visitor]);

  // INITIAL RENDER AND INITIALIZATION
  useEffect(() => {
    setSocket(
      connectWebsocket(
        process.env.REACT_APP_WG_SIGNALER_SERVICE
      )
    );
  }, []);

  useEffect(() => {
    if (connectionStatus.webRTCSocketConnected) {
      smoothScrollTop();
      handleInitialize();
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, [connectionStatus.webRTCSocketConnected]);

  // Placeholder message while redirecting to home page
  if (!storeId) {
    return (
      <ErrorHandling
        errorMessage={NO_STORE_FOUND_IN_THE_CREATIVE_STORE}>
        <Button
          className="margin-top-12-18 "
          onClick={() => window.location.replace("/")}>
          Balik ke Home
        </Button>
      </ErrorHandling>
    );
  }

  // TODO: Make a retry function of websocket and render the loading screen of reconnecting
  return (
    <Fragment>
      <PageLoading
        className={
          rendered ? "hidden no-height" : "visible"
        }
        loadingMessage={
          "Kita lagi nyiapin tokonya dulu ya, harap tunggu :)"
        }
      />
      <Modal
        className="dark-bg-color"
        clicked={() =>
          handleOpenModal(setModalToggle, modalToggle)
        }
        toggle={modalToggle}>
        <ShowErrorModal
          handleOpenModal={handleOpenModal}
          setModalToggle={setModalToggle}
          modalToggle={modalToggle}
          errorMessage={errorMessage}
        />
      </Modal>
      <audio
        id={JOINING_AUDIO}
        src={JOINING_AUDIO_URL}
      />
      <audio
        id={LEAVING_AUDIO}
        src={LEAVING_AUDIO_URL}
      />
      <audio
        id={MUTE_AUDIO}
        src={MUTE_AUDIO_URL}
      />
      <audio
        id={UNMUTE_AUDIO}
        src={UNMUTE_AUDIO_URL}
      />
      <div className="creative-store-audio-media-container"></div>
      <div className="creative-store-container">
        <div className="creative-store-wrapper">
          <div className="creative-store-flex-container">
            <div className="creative-store-left-panel-container">
              <div className="creative-store-sub-container creative-store-avatar">
                <div className="creative-store-avatar-container">
                  <div className="creative-store-identifier-img-wrapper">
                    <Avatar
                      style={{ cursor: "pointer" }}
                      src={
                        "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g"
                      }
                      size={60}
                      title={"test"}
                      name={"test"}
                    />
                  </div>
                </div>
                <div className="creative-store-header">
                  <h3 className="creative-store-store-title">
                    Bahari One Stop
                  </h3>
                  <label className="creative-store-store-label">
                    Kita adalah toko terbaik di muka bumi
                    Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Veritatis,
                    dignissimos! Obcaecati, magni temporibus
                    soluta atque nesciunt ipsam velit
                    explicabo eligendi earum ullam nemo,
                    voluptate nam totam iusto culpa optio
                    repudiandae?
                  </label>
                </div>
              </div>
              <div className="creative-store-sub-container creative-store-add-menu">
                <div className="creative-store-add-menu-wording">
                  <h4 className="white-color">
                    Tambah Kategori
                  </h4>
                  <span className="creative-store-plus-button" />
                </div>
              </div>
              <div className="creative-store-sub-container creative-store-scrollable-menu-header">
                <Button className="creative-store-scrollable-menu-button">
                  Katalog
                </Button>
              </div>
              <div className="creative-store-sub-container creative-store-scrollable-menu-body">
                <div className="creative-store-scrollable-menu-container">
                  <ShowChannels
                    uniqueKey="desktop"
                    channels={channels}
                    joinedRoom={joinedRoom}
                    listenJoinRoom={listenJoinRoom}
                  />
                </div>
              </div>
              {login && (
                <div className="creative-store-sub-container creative-store-user-avatar">
                  <div className="creative-store-user-avatar-container">
                    <div className="creative-store-user-identifier-img-wrapper">
                      <Avatar
                        style={{ cursor: "pointer" }}
                        round={true}
                        size={50}
                        title={login.user.fullName}
                        name={login.user.fullName}
                      />
                    </div>
                  </div>
                  <ShowBottomStatus
                    login={login}
                    handleRoomSocketCleanUp={
                      handleRoomSocketCleanUp
                    }
                    connectionStatus={connectionStatus}
                    joinedRoom={joinedRoom}
                    joinedStatus={joinedStatus}
                  />
                </div>
              )}
            </div>
            <div className="creative-store-body-container">
              <div className="creative-store-body-header-container">
                <div className="creative-store-body-header-left">
                  <FloatButton
                    onClick={() => handleBottomSheet()}
                    className="creative-store-filter-button"
                  />
                  <h4>📢︱announcement</h4>
                </div>
              </div>
              <div className="creative-store-chatbody-container dark-bg-color">
                <div className="creative-store-chatbody-wrapper">
                  {showChats}
                </div>
              </div>
              <div className="creative-store-chat-container dark-bg-color">
                <FloatButton
                  onClick={() => {}}
                  className="creative-store-chat-leftside-textinput-button creative-store-chat-leftside-textinput-button-emoji"
                />
                <FloatButton
                  onClick={() => {}}
                  className="creative-store-chat-leftside-textinput-button creative-store-chat-leftside-textinput-button-gif"
                />
                <TextInput className="creative-store-chat-textinput light-color darker-bg-color"></TextInput>
                <Button>Send</Button>
              </div>
            </div>
            <div className="creative-store-right-panel-container">
              <div className="creative-store-sub-container creative-store-right-panel-tools">
                <div className="creative-store-right-panel-left-header">
                  <FloatButton
                    onClick={() =>
                      setSelectedRightPanel(VISITORS)
                    }
                    className="creative-store-rightside-menu-button-active creative-store-rightside-menu-people-button"
                  />
                  <FloatButton
                    onClick={() =>
                      setSelectedRightPanel(
                        TRANSACTION_ORDERS
                      )
                    }
                    className="creative-store-rightside-menu-button creative-store-rightside-menu-pinned-button"
                  />
                </div>
                <div className="creative-store-right-panel-right-header">
                  <FloatButton
                    onClick={() =>
                      window.handleOpenOverriding(
                        MENU_MOBILE
                      )
                    }
                    className="creative-store-hamburg-menu-button"
                  />
                </div>
              </div>
              <div className="creative-store-sub-container creative-store-scrollable-visitor-header">
                <h3 className="creative-store-scrollable-visitor-title">
                  Visitor
                </h3>
                <hr className="creative-store-linebreak"></hr>
              </div>
              <div className="creative-store-sub-container creative-store-scrollable-visitor-body">
                {showRightSidePanel}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomSheet
        toggle={toggle}
        clicked={handleBottomSheet}>
        <div className="creative-store-mobile-tools-container"></div>
      </BottomSheet>
    </Fragment>
  );
}
