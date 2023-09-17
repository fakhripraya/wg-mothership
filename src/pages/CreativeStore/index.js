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
  showDisplayName,
  smoothScrollTop,
} from "../../utils/functions/global";
import FloatButton from "../../components/FloatButton";
import BottomSheet from "../../components/BottomSheet";
import { initialPurchaseOrders } from "../../variables/initial/creativeStore";
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
  TEXT,
} from "../../variables/constants/creativeStore";
import { cookies } from "../../config/cookie";
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
import {
  ShowBottomStatus,
  ShowFullName,
} from "./ModularComponents/ShowBottomStatus";
import Modal from "../../components/Modal";
import { ShowErrorModal } from "./ModularComponents/ShowModals";
import PageLoading from "../PageLoading";
import { creativeStoreDb as db } from "../../config/dexie";
import moment from "moment/moment";
import ShowChatWrappers from "./ModularComponents/ShowChats";
import { v4 as uuidv4 } from "uuid";
import ShowVisitors from "./ModularComponents/ShowVisitors";
import ShowNewPurchaseOrders from "./ModularComponents/ShowPurchaseOrders";
import { ShowSettingTab } from "./ModularComponents/ShowSettingTab";

export default function CreativeStore() {
  // REFS //
  const chatInputRef = useRef();
  const chatBodyContainerRef = useRef();

  // HOOKS //
  const zeusService = useAxios();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  // STATES //
  const [userJoin, setUserJoin] = useState(null);
  const [storeId, setStoreId] = useState(
    searchParams.get("id")
  );
  const [storeInfo, setStoreInfo] = useState(null);
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [chatSocket, setChatSocket] = useState(null);
  const [webRTCSocket, setWebRTCSocket] = useState(null);
  const [rendered, setRendered] = useState(false);
  const [chatPagination, setChatPagination] = useState(0);
  const [channels, setChannels] = useState({});
  const [chats, setChats] = useState({});
  const [visitor, setVisitors] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [joinedRoom, setJoinedRoom] = useState(null);
  const [joinedChatRoom, setJoinedChatRoom] =
    useState(null);
  const [toggle, setToggle] = useState(false);
  const [selectedRightPanel, setSelectedRightPanel] =
    useState(VISITORS);
  const [modalToggle, setModalToggle] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [joinedStatus, setJoinedStatus] =
    useState(DISCONNECTED);
  const [connectionStatus, setConnectionStatus] = useState({
    webRTCSocketFirstConnected: false,
    webRTCSocketStatus: NO_STRING,
    webRTCStatus: NO_STRING,
    chatSocketFirstConnected: false,
    chatSocketStatus: NO_STRING,
  });

  // VARIABLES //
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
            webRTCSocketFirstConnected: true,
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
        this.peerRef.connect();
      });

      this.peerRef.on("webrtc-error", () =>
        console.log(`already joined the room`)
      );

      this.peerRef.on(
        "user-already-joined",
        ({ JoinedRoom }) => {
          handleRoomSocketCleanUp(JoinedRoom);
        }
      );

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

  class ChatSignaler {
    constructor(peerRef) {
      this.peerRef = peerRef;
      this.joinedChatRoom = null;

      // SOCKET EVENTS LISTENER//
      // server informs the client of user joining the room
      this.peerRef.on("connection-success", (callback) => {
        callback({
          storeId: storeId,
          user: login && login.user,
        });
      });

      this.peerRef.on(
        "new-connection-render",
        ({ allJoinedUsers, user }) => {
          if (user) setUserJoin(user);
          handleVisitorsRender(allJoinedUsers);
          setConnectionStatus((val) => {
            return {
              ...val,
              chatSocketStatus: CONNECTED,
              chatSocketFirstConnected: true,
            };
          });
        }
      );

      this.peerRef.on(
        "receive-chat",
        ({ content, roomId, channelId }) => {
          this.saveChatToDatabase({
            content,
            roomId,
            channelId,
          });
        }
      );

      // CLEANUP EVENTS
      // this will trigger when the local producer(user) leave the room
      this.peerRef.on("disconnect", () => {});
    }

    get joinedChatRoom() {
      return this._joinedChatRoom;
    }

    set joinedChatRoom(joinedChatRoom) {
      if (typeof joinedChatRoom === "undefined")
        throw new Error(
          "Unable to set 'joinedChatRoom' property with undefined value"
        );
      this._joinedChatRoom = joinedChatRoom;
    }

    async getChatFromDatabase(joinedChatRoom) {
      const chats = await db.creative_store_chats
        .orderBy(":id")
        .filter(
          (filter) =>
            filter.roomId === joinedChatRoom.roomId
        )
        .offset(25 * chatPagination) // offset the record first
        //.reverse() // reverse it cause we want it from last to first
        .limit(25)
        .toArray();

      return chats;
    }

    saveChatToDatabase({ content, roomId, channelId }) {
      // Do some application logic on the database:
      // do some local db for storing the newly signaled chat
      // let it run asynchronously
      // TODO: add server ID to accurately save the identifier
      db.transaction(
        "rw",
        db.creative_store_chats,
        async () => {
          const id = await db.creative_store_chats.add({
            channelId,
            roomId,
            chatContent: content.chatContent,
            imageURI: content.imageURI,
            isChat: content.isChat,
            isImage: content.isImage,
            senderId: content.senderId,
            senderFullName: content.senderFullName,
            senderProfilePictureUri:
              content.senderProfilePictureUri,
            createdAt: moment(new Date())
              .format("dddd, MMMM Do YYYY, h:mm:ss a")
              .toString(),
            updatedAt: null,
            deletedAt: null,
          });

          const chat = await db.creative_store_chats.get({
            id,
          });
          // if the chat is intended to be send to user current joined room, render it
          // if the chat is from the sender, update the sender chat checkmark
          handleNewSendedChatRender(chat);
        }
      ).catch(function (e) {
        console.error(e.stack || e);
      });
    }

    sendChat(
      { chat, imageURI, isChat, isImage },
      joinedChatRoom
    ) {
      const content = {
        chatContent: chat,
        imageURI: imageURI,
        isChat: isChat,
        isImage: isImage,
        senderId: login.user.userId,
        senderFullName: login.user.fullName,
        senderProfilePictureUri:
          login.user.profilePictureUri,
      };

      const chatData = {
        content: content,
        roomId: joinedChatRoom.roomId,
        channelId: joinedChatRoom.channelId,
      };
      this.saveChatToDatabase(chatData);
      this.peerRef.emit(
        "chat-send",
        storeId,
        chatData,
        () => {
          // set sending chat delay
          // TODO: add chat delay function
        }
      );
    }
  }

  let mediaSignaler = useMemo(() => {
    if (webRTCSocket) return new WGSignaler(webRTCSocket);
  }, [webRTCSocket]);

  let chatSignaler = useMemo(() => {
    if (chatSocket) return new ChatSignaler(chatSocket);
  }, [chatSocket]);

  // FUNCTION SPECIFICS
  async function handleInitialize() {
    let result;
    try {
      result = await zeusService.getData({
        endpoint: process.env.REACT_APP_ZEUS_SERVICE,
        url: URL_GET_SERVER_INFO(`?storeId=${storeId}`),
      });
    } catch (error) {
      handleModalError(error);
    }

    if (result.responseStatus === 204) {
      chatSocket.disconnect();
      webRTCSocket.disconnect();
      setStoreId(null);
      return;
    }

    // if we got the value and its not and error, map it
    const initialMappedChannels =
      result.responseData.MasterStoreChannels.sort(
        (a, b) => a.channelsOrder - b.channelsOrder
      ).reduce((acc, value) => {
        return {
          ...acc,
          ...value.channelsJSON,
        };
      }, {});

    // set the store info
    // render all the left panel datas
    // and set the initial joined chat room
    // also handle the purchase orders render here
    setStoreInfo(result.responseData);
    handlePurchaseOrdersRender(initialPurchaseOrders);
    handleInitialChannelsRender(initialMappedChannels);
    const joinedChatRoom = handleInitialJoinChatRoom(
      initialMappedChannels
    );

    if (result.responseStatus === 200) {
      try {
        const chats =
          await chatSignaler.getChatFromDatabase(
            joinedChatRoom
          );
        // render currently joined chat room body
        // and set render to true so the page can exit the loading screen
        handleChatsRender(chats);
        setRendered(true);
      } catch (e) {
        console.error(e.stack || e);
      }
    }
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

  function handleModalError(error) {
    if (error.responseStatus === 500) handleError500();
    else
      handleErrorMessage(
        error,
        setErrorMessage,
        setModalToggle,
        modalToggle
      );
  }

  function handleSelectRightPanel(code) {
    setSelectedRightPanel(code);
  }

  function handleSelectedRightPanelClassname(code) {
    if (code === selectedRightPanel) return "-active";
    else return "";
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

  const handleNewSendedChatRender = (addingChat) => {
    if (
      addingChat.roomId !==
      chatSignaler.joinedChatRoom.roomId
    )
      return;
    if (addingChat.length === 0) return;
    setChats((oldChats) => {
      let newChats = { ...oldChats };
      const previousChatObjects = Object.entries(newChats);
      const previousChatObjectsLastIndex =
        previousChatObjects.length - 1;
      const lastSenderObject =
        previousChatObjects[previousChatObjectsLastIndex];
      const lastSenderId =
        lastSenderObject && lastSenderObject[1].sender.id;
      if (lastSenderId === addingChat.senderId) {
        const lastSenderObjectKey = lastSenderObject[0];
        newChats = {
          ...newChats,
          [lastSenderObjectKey]: {
            ...newChats[lastSenderObjectKey],
            chats: {
              ...newChats[lastSenderObjectKey].chats,
              [addingChat.id]: addingChat,
            },
          },
        };
      } else {
        const newChatObjectKey = uuidv4();
        let newChat = createNewChat(addingChat);
        let tempNewChatObject = {
          ...createNewTempChatObject(addingChat),
        };
        tempNewChatObject.chats = {
          ...tempNewChatObject.chats,
          [newChat.id]: newChat,
        };
        newChats = {
          ...newChats,
          [newChatObjectKey]: tempNewChatObject,
        };
      }

      return { ...newChats };
    });
  };

  // do something about chat rendering
  function handleChatsRender(addingChats) {
    setChats(() => {
      if (addingChats.length === 0) return {};
      let newChats = {};
      let tempChat = null;
      for (const [key, chat] of Object.entries(
        addingChats
      )) {
        let newChat = createNewChat(chat);
        if (!tempChat)
          tempChat = { ...createNewTempChatObject(chat) };
        else if (
          tempChat &&
          tempChat.sender.id !== chat.senderId
        ) {
          // TODO: chat arent rendered in order,
          // presumably because of it didnt get from the database when render
          // or presumably because of the key being uuid
          newChats = {
            ...newChats,
            [uuidv4()]: tempChat,
          };
          tempChat = { ...createNewTempChatObject(chat) };
        }
        tempChat.chats = {
          ...tempChat.chats,
          [newChat.id]: newChat,
        };
      }
      // push last tempChat to newChats object
      newChats = {
        ...newChats,
        [uuidv4()]: tempChat,
      };

      return { ...newChats };
    });
  }

  function handleInitialJoinChatRoom(initialChannels) {
    let joinedChatRoom = null;
    for (const [key, value] of Object.entries(
      initialChannels
    )) {
      const found = Object.entries(value.channelRooms).find(
        ([, value]) => value.roomType === TEXT
      );

      if (found) {
        joinedChatRoom = {
          channelId: key,
          ...found[1],
        };
        break;
      }
    }

    if (joinedChatRoom) {
      // set the joined chat room state
      setJoinedChatRoom({ ...joinedChatRoom });
      // set the chatSignaler joinedChatRoom properties to a new value
      chatSignaler.joinedChatRoom = {
        ...joinedChatRoom,
      };
    }

    return joinedChatRoom;
  }

  // do something about channel rendering
  // emit the initial channel socket data to be rendered
  function handleInitialChannelsRender(initialChannels) {
    webRTCSocket.emit(
      "get-channels-data",
      {
        storeId: storeId,
      },
      (socketsInTheStore) => {
        setChannels(() => {
          return handleChannelRender(
            initialChannels,
            socketsInTheStore
          );
        });
      }
    );
  }

  // do something about rendering
  function handleVisitorsRender(joinedUsers) {
    console.log(joinedUsers);
    setVisitors(() => {
      return { ...joinedUsers };
    });
  }

  function handlePurchaseOrdersRender(purchaseOrders) {
    setPurchaseOrders(() => {
      return [...purchaseOrders];
    });
  }

  function handleAddPurchaseOrder(newPurchaseOrder) {}

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

  const handleOnSendMessage = useCallback(() => {
    if (!login) return window.handleOpenOverriding(LOGIN);
    if (!chatInputRef.current) return;

    let isChat = false;
    let isImage = false;
    if (
      chatInputRef.current &&
      chatInputRef.current.value.length > 0
    )
      isChat = true;

    //TODO: later add imageURI support
    chatSignaler.sendChat(
      {
        chat: chatInputRef.current.value,
        imageURI: null,
        isChat: isChat,
        isImage: isImage,
      },
      joinedChatRoom
    );
    chatInputRef.current.value = null;
  }, [joinedChatRoom]);

  // this process will only render the user client side chat body, not the other peer
  const listenJoinChatRoom = async (channel, room) => {
    const newJoinedChatRoom = {
      channelId: channel.channelId,
      ...room,
    };

    // set the new joined chat room state
    setJoinedChatRoom(() => {
      return { ...newJoinedChatRoom };
    });
    // set the chatSignaler joinedChatRoom properties to a new value
    chatSignaler.joinedChatRoom = {
      ...newJoinedChatRoom,
    };

    // get the joined chat room datas from the database
    const chats = await chatSignaler.getChatFromDatabase(
      newJoinedChatRoom
    );

    // set the chat body state with the newly joined chat room datas
    handleChatsRender(chats);
  };

  const listenJoinRoom = useCallback(
    async (channel, room, joinedRoom) => {
      // handle WebRTC Socket connection to the signaler service,
      // and store it to webRTCref
      // once it connect it will process the ICE establishment

      // do some validation here
      // validate the connecting state, the desired room type, the login,
      // whether user connected to the room already,
      // and do some cleanups if user want to change room
      if (room.roomType !== VOICE) return;
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

  const createNewChat = (chat) => {
    return {
      id: chat.id,
      chatContent: chat.chatContent,
      imageURI: chat.imageURI,
      isChat: chat.isChat,
      isImage: chat.isImage,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    };
  };

  const createNewTempChatObject = (chat) => {
    return {
      sender: {
        id: chat.senderId,
        fullName: chat.senderFullName,
        profilePictureURI: chat.senderProfilePictureUri,
      },
      chats: {},
    };
  };

  const openSettingTab = () => {
    setIsOpenSetting((state) => !state);
  };

  // MEMOIZE COMPONENTS
  const showRightSidePanel = useMemo(() => {
    if (selectedRightPanel === TRANSACTION_ORDERS)
      return (
        <ShowNewPurchaseOrders datas={purchaseOrders} />
      );
    else return <ShowVisitors datas={visitor} />;
  }, [selectedRightPanel, visitor, purchaseOrders]);

  useEffect(() => {
    if (chatBodyContainerRef.current) {
      const scrollHeight =
        chatBodyContainerRef.current.scrollHeight;
      chatBodyContainerRef.current.scrollTop = scrollHeight;
    }
  }, [chats]);

  // INITIAL PEERS CONNECTION
  useEffect(() => {
    setWebRTCSocket(
      connectWebsocket(
        process.env.REACT_APP_WG_SIGNALER_SERVICE
      )
    );
    setChatSocket(
      connectWebsocket(
        process.env.REACT_APP_FOREFRONT_HERMES_SERVICE
      )
    );
    return () => {
      if (webRTCSocket) webRTCSocket.disconnect();
      if (chatSocket) chatSocket.disconnect();
    };
  }, []);

  // INITIAL RENDER AND INITIALIZATION
  useEffect(() => {
    if (
      connectionStatus.webRTCSocketFirstConnected &&
      connectionStatus.chatSocketFirstConnected
    ) {
      smoothScrollTop();
      handleInitialize();
    }
  }, [
    connectionStatus.webRTCSocketFirstConnected,
    connectionStatus.chatSocketFirstConnected,
  ]);

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
    <div className="creative-store">
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
                    {storeInfo && storeInfo.storeName}
                  </h3>
                  <label className="creative-store-store-label">
                    {storeInfo &&
                      storeInfo.storeDescription}
                  </label>
                </div>
              </div>
              <div className="creative-store-sub-container creative-store-add-menu">
                <div
                  onClick={openSettingTab}
                  className="creative-store-add-menu-wording">
                  <h4 className="white-color">
                    Setting Toko
                  </h4>
                  <span className="creative-store-gear-button" />
                </div>
              </div>
              <div className="creative-store-sub-container creative-store-scrollable-menu-header">
                <Button className="creative-store-scrollable-menu-button">
                  Katalog
                </Button>
                <Button className="creative-store-scrollable-menu-button">
                  Tambah Kategori
                </Button>
              </div>
              <div className="creative-store-sub-container creative-store-scrollable-menu-body">
                <div className="creative-store-scrollable-menu-container">
                  <ShowChannels
                    uniqueKey="channels"
                    channels={channels}
                    joinedRoom={joinedRoom}
                    listenJoinRoom={listenJoinRoom}
                    listenJoinChatRoom={listenJoinChatRoom}
                  />
                </div>
              </div>
              {!login && (
                <div className="creative-store-sub-container creative-store-user-avatar">
                  <div className="creative-store-user-avatar-container">
                    <div className="creative-store-user-identifier-img-wrapper">
                      <Avatar
                        style={{ cursor: "pointer" }}
                        round={true}
                        size={50}
                        title={showDisplayName(
                          userJoin && userJoin
                        )}
                        name={showDisplayName(
                          userJoin && userJoin
                        )}
                      />
                    </div>
                  </div>
                  <div className="creative-store-user-avatar-side-container">
                    <ShowFullName
                      connectionStatus={connectionStatus}
                      fullName={showDisplayName(
                        userJoin && userJoin
                      )}
                      statusMessage={"Guest User"}
                    />
                  </div>
                </div>
              )}
              {login && login.user && (
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
            {!isOpenSetting && (
              <div className="creative-store-body-container">
                <div className="creative-store-body-header-container">
                  <div className="creative-store-body-header-left">
                    <FloatButton
                      onClick={() => handleBottomSheet()}
                      className="creative-store-filter-button"
                    />
                    <h4>
                      {joinedChatRoom &&
                        joinedChatRoom.roomTitle}
                    </h4>
                  </div>
                </div>
                <div
                  ref={chatBodyContainerRef}
                  className="creative-store-chatbody-container dark-bg-color">
                  <div className="creative-store-chatbody-wrapper">
                    <ShowChatWrappers
                      uniqueKey={"chats"}
                      chats={chats}
                    />
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
                  <TextInput
                    onEnter={handleOnSendMessage}
                    ref={chatInputRef}
                    className="creative-store-chat-textinput light-color darker-bg-color"></TextInput>
                  <Button onClick={handleOnSendMessage}>
                    Send
                  </Button>
                </div>
              </div>
            )}
            {isOpenSetting && (
              <ShowSettingTab
                isOpenSettingTab={isOpenSetting}
                functions={{
                  openSettingTab,
                }}
              />
            )}
            <div className="creative-store-right-panel-container">
              <div className="creative-store-sub-container creative-store-right-panel-tools">
                <div className="creative-store-right-panel-left-header">
                  <FloatButton
                    onClick={() =>
                      handleSelectRightPanel(VISITORS)
                    }
                    className={`creative-store-rightside-menu-button${handleSelectedRightPanelClassname(
                      VISITORS
                    )} creative-store-rightside-menu-people-button`}
                  />
                  <FloatButton
                    onClick={() =>
                      handleSelectRightPanel(
                        TRANSACTION_ORDERS
                      )
                    }
                    className={`creative-store-rightside-menu-button${handleSelectedRightPanelClassname(
                      TRANSACTION_ORDERS
                    )} creative-store-rightside-menu-pinned-button`}
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
              <div className="creative-store-sub-container creative-store-scrollable-rightside-panel-header">
                <h3 className="creative-store-scrollable-rightside-panel-title">
                  {selectedRightPanel === VISITORS
                    ? "Visitor"
                    : "Purchase Orders"}
                </h3>
                <hr className="creative-store-linebreak"></hr>
              </div>
              <div className="creative-store-sub-container creative-store-scrollable-rightside-panel-body">
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
    </div>
  );
}
