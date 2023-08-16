import React, {
    Fragment,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import Button from '../../components/Button';
import './style.scss';
import {
    handleError500,
    handleErrorMessage,
    smoothScrollTop
} from '../../utils/functions/global';
import FloatButton from '../../components/FloatButton';
import BottomSheet from '../../components/BottomSheet';
import DynamicAccordion from '../../components/DynamicAccordion';
import {
    initialChatTexts,
    initialLeftPanelDatas,
    initialVisitors
} from '../../variables/dummy/creativeStore';
import Avatar from 'react-avatar';
import TextInput from '../../components/TextInput';
import {
    CLIENT_USER_INFO,
    LOGIN,
    MENU_MOBILE,
    ROOM_UNAVAILABLE,
    URL_GET_SERVER_INFO,
} from '../../variables/global';
import {
    VISITORS,
    TRANSACTION_ORDERS,
    VOICE,
} from '../../variables/constants/creativeStore';
import { cookies } from '../../config/cookie';
import { trackPromise } from 'react-promise-tracker';
import { useAxios } from '../../utils/hooks/useAxios';
import { videoConfig } from '../../config/mediasoup/config';
import { connectWebsocket } from '../../config/websocket/websocket';
import { useSearchParams } from 'react-router-dom';
import { NO_STORE_FOUND_IN_THE_CREATIVE_STORE } from '../../variables/errorMessages/creativeStore';
import { Device } from 'mediasoup-client';
import ErrorHandling from '../ErrorHandling';
import ShowChannels from './ModularComponents/ShowChannel';

export default function CreativeStore() {

    // REFS //
    const webRTCref = useRef();

    // HOOKS //
    const zeusService = useAxios();
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    // STATES //
    const [channels, setChannels] = useState([]);
    const [joinedRoom, setJoinedRoom] = useState(null);
    const [visitor, setVisitors] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [selectedRightPanel, setSelectedRightPanel] = useState(VISITORS);
    const [modalToggle, setModalToggle] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    // VARIABLES //
    const storeId = searchParams.get("id");
    let login = cookies.get(CLIENT_USER_INFO);
    // device variable used to store device
    // to create send/consume transport with the given rtpCapabilities
    let device
    let rtpCapabilities
    // producerTransport needed only as an object,
    // as it can produce multiple producer with a single producerTransport
    // consumerTransports need to be as array,
    // as it will be needed to store multiple consumerTransport
    let producerTransport
    let consumerTransports = [];
    // audio and video parameter for mediasoup producer configuration
    let audioProducer
    let audioParams;
    let videoProducer
    let videoParams = { videoConfig };
    // this variable will store all remote audio/video producer
    // to prevent multiple redundant consuming 
    let consumedTransports = [];
    // END OF VARIABLES //

    // FUNCTIONS SPECIFIC //
    function handleInitialize() {
        trackPromise(
            zeusService.getData({
                endpoint: process.env.REACT_APP_ZEUS_SERVICE,
                url: URL_GET_SERVER_INFO(`?storeId=${storeId}`),
            }).then((result) => {
                if (result.responseStatus === 200) {
                    setChannels(initialLeftPanelDatas);
                    setVisitors(initialVisitors);
                }
            }).catch((error) => {
                if (error.responseStatus === 500) handleError500();
                else handleErrorMessage(error, setErrorMessage, setModalToggle, modalToggle)
            })
        );
    }

    function handleInitializeWebsocket(selectedRoom) {

        // assign var joinedRoom inside the function
        let joinedRoom = selectedRoom;

        // CUSTOM MEDIASOUP FUNCTIONS //
        const streamSuccess = (stream) => {
            // the video/audio param will later be used to create the producer transport 
            console.log(`assigning stream recieved to the audio/video param`);
            audioParams = { track: stream.getAudioTracks()[0], ...audioParams };
            joinRoom();
        }

        const getLocalStream = () => {
            console.log(`getting the local stream...`);
            navigator.mediaDevices.getUserMedia({
                audio: true,
            })
                .then(streamSuccess)
                .catch(error => {
                    console.error(`error getting the local stream with error: ${error.message}`);
                })
        }

        const joinRoom = () => {
            console.log(`user is ready to join the room - emitting signal to the server...`);
            webRTCref.current.emit('join-room', {
                storeId,
                room: joinedRoom,
                user: login.user
            }, (data) => {
                console.log(`ROUTER RTP Capabilities... ${JSON.stringify(data.rtpCapabilities)}`);
                // we assign to local variable and will be used when
                // loading the client Device (see createDevice above)
                rtpCapabilities = data.rtpCapabilities;

                // once we have rtpCapabilities from the Router, create Device
                createDevice();
            })
        }

        // A device is an endpoint connecting to a Router on the
        // server side to send/recive media
        const createDevice = async () => {
            try {
                device = new Device();

                // https://mediasoup.org/documentation/v3/mediasoup-client/api/#device-load
                // Loads the device with RTP capabilities of the Router (server side)
                await device.load({
                    // see getRtpCapabilities() below
                    routerRtpCapabilities: rtpCapabilities
                });

                console.log('DEVICE RTP Capabilities - ', device.rtpCapabilities);

                // once the device loads, create transport
                createSendTransport();

            } catch (error) {
                if (error.name === 'UnsupportedError') console.warn('browser not supported');
                else console.log(`there is an error while creating the DEVICE, error: ${error}`);
            }
        }

        const createSendTransport = () => {
            // see server's socket.on('create-webrtc-transport', sender?, ...)
            // this is a call from Producer, so sender = true
            // The server sends back params needed 
            // to create Send Transport on the client side
            webRTCref.current.emit('create-webrtc-transport', {
                isConsumer: false,
                room: joinedRoom,
                user: login.user
            }, ({ params }) => {
                // if error the process will end here
                if (params.error) {
                    console.error(`there is an error while creating SEND TRANSPORT\n error: ${params.error}`);
                    return;
                }

                console.log(`server successfully create the new SEND TRANSPORT with param: ${JSON.stringify(params)}`);
                console.log(`proceed with creating the SEND PRODUCER TRANSPORT`);
                try {
                    producerTransport = device.createSendTransport(params);
                } catch (error) {
                    console.error(`there is an error while creating SEND PRODUCER TRANSPORT\n error: ${error}`);
                    return;
                }

                // assigning event listener on the newly created producer transport
                // transmit the dtls parameters to the server
                producerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
                    try {
                        await webRTCref.current.emit('transport-connect', {
                            dtlsParameters,
                            room: joinedRoom,
                            user: login.user,
                            producerTransportId: producerTransport.id
                        });
                        callback();
                    } catch (error) {
                        errback(error);
                    }
                });

                // tell the server to create a Producer
                // with the following parameters and produce
                // and expect back a server side producer id
                // see server's socket.on('transport-produce', ...)
                producerTransport.on('produce', async (parameters, callback, errback) => {
                    try {
                        console.log(`produce event on producer transport has been fired!`);
                        console.log(`produce parameters: ${JSON.stringify(parameters)}`);
                        console.log(`produce transport id: ${producerTransport.id}`);
                        await webRTCref.current.emit('transport-produce', {
                            user: login.user,
                            room: joinedRoom,
                            producerTransportId: producerTransport.id,
                            kind: parameters.kind,
                            rtpParameters: parameters.rtpParameters,
                            appData: parameters.appData,
                        }, ({ producerId, peersExist }) => {
                            // Tell the transport that parameters were transmitted and provide it with the
                            // server side producer's id.
                            // if producers exist, then join room
                            callback({ producerId });
                            console.log(peersExist)
                            if (peersExist) getProducers();
                        })
                    } catch (error) {
                        errback(error);
                    }
                });

                connectSendTransportForAudio();
            })
        }

        const connectSendTransportForAudio = async () => {
            // we now call produce() to instruct the producer transport
            // to send audio media to the Router
            // https://mediasoup.org/documentation/v3/mediasoup-client/api/#transport-produce
            // this action will trigger the 'connect' and 'produce' events above

            audioProducer = await producerTransport.produce(audioParams);
            audioProducer.on('trackended', () => console.log('audio track ended'));
            audioProducer.on('transportclose', () => console.log('audio transport ended'));
        }

        const getProducers = () => {
            console.log(`get all existing producer to signal: `);
            webRTCref.current.emit('get-producers', { room: joinedRoom }, producerIds => {
                // for each of the producer create a consumer
                // producerIds.forEach(id => signalNewConsumerTransport(id))
                console.log(`signal all existing peer : `);
                console.log(producerIds);
                producerIds.forEach(signalNewConsumerTransport);
            })
        }

        const signalNewConsumerTransport = async (remoteProducerId) => {
            // check if we are already consuming the remoteProducerId
            if (consumedTransports.includes(remoteProducerId)) return;
            consumedTransports.push(remoteProducerId);
            // emit the create webrtc transport, this time is to create consumer transport
            await webRTCref.current.emit('create-webrtc-transport', {
                isConsumer: true,
                room: joinedRoom,
                user: login.user
            }, ({ params }) => {
                // The server sends back params needed 
                // to create Send Transport on the client side
                if (params.error) {
                    console.error(`there is an error while creating RECV TRANSPORT\n error: ${params.error}`);
                    return
                }

                console.log(`server successfully create the new RECV TRANSPORT with param: ${JSON.stringify(params)}`);
                console.log(`proceed with creating the RECV CONSUMER TRANSPORT`);
                let consumerTransport;
                try {
                    consumerTransport = device.createRecvTransport(params);
                } catch (error) {
                    console.error(`there is an error while creating RECV CONSUMER TRANSPORT\n error: ${error}`);
                    return;
                }

                consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
                    try {
                        // Signal local DTLS parameters to the server side transport
                        // see server's socket.on('transport-recv-connect', ...)
                        await webRTCref.current.emit('transport-recv-connect', {
                            dtlsParameters,
                            room: joinedRoom,
                            user: login.user,
                            serverConsumerTransportId: params.id,
                        })
                        // Tell the transport that parameters were transmitted.
                        callback();
                    } catch (error) {
                        // Tell the transport that something was wrong
                        errback(error);
                    }
                });

                connectRecvTransport(consumerTransport, remoteProducerId, params.id);
            })
        }

        const connectRecvTransport = async (consumerTransport, remoteProducerId, serverConsumerTransportId) => {
            // for consumer, we need to tell the server first
            // to create a consumer based on the rtpCapabilities and consume
            // if the router can consume, it will send back a set of params as below
            await webRTCref.current.emit('transport-recv-consume', {
                user: login.user,
                room: joinedRoom,
                rtpCapabilities: device.rtpCapabilities,
                remoteProducerId,
                serverConsumerTransportId,
            }, async ({ params }) => {
                if (params.error) {
                    console.error(`there is an error while CONSUMING the producer,
                        with PRODUCER ID: ${remoteProducerId}\n error: ${params.error}`);
                    return;
                }

                // then consume with the local consumer transport
                // which creates a consumer
                console.log(`successfully consume the producer, PRODUCER ID: ${remoteProducerId} and get parameters: ${JSON.stringify(params)}`);
                console.log(`proceed with consuming the producer on the local consumer transport, with SERVER CONSUMER TRANSPORT ID: ${params.id}`);
                const consumer = await consumerTransport.consume({
                    id: params.id,
                    producerId: params.producerId,
                    kind: params.kind,
                    rtpParameters: params.rtpParameters
                })

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

                assignTrackFromConsumer(consumer, remoteProducerId, params.id, params.kind);
            })
        }

        const assignTrackFromConsumer = (
            consumer,
            remoteProducerId,
            serverConsumerId,
            serverConsumerKind,
            roomId = null
        ) => {
            // create a new div element for the new consumer media
            const newElem = document.createElement('div');
            newElem.setAttribute('id', `creative-store-consumer-${serverConsumerId}-remote-producer-${remoteProducerId}`);

            const isAudio = serverConsumerKind === 'audio';
            const newElementId =
                isAudio ?
                    `creative-store-consumer-${serverConsumerId}-remote-producer-${remoteProducerId}-audio` :
                    `creative-store-consumer-${serverConsumerId}-remote-producer-${remoteProducerId}-video`;
            if (isAudio) {
                //append to the audio container
                newElem.setAttribute('class', 'creative-store-remote-audio-subcontainer');
                newElem.innerHTML = `<audio id="${newElementId}" autoplay></audio>`
            } else {
                //append to the video container
                newElem.setAttribute('class', 'creative-store-remote-video-subcontainer');
                newElem.innerHTML = `<video 
                id="${newElementId}"
                playsInline 
                autoplay 
                class="creative-store-remote-video" ></video>`
            }

            // append the new consumer element
            const container = isAudio ?
                document.getElementsByClassName('creative-store-audio-media-container')[0] :
                document.getElementsByClassName(`creative-store-video-media-container-${roomId}`)[0];
            container.appendChild(newElem);

            // destructure and retrieve the video track from the producer
            const { track } = consumer;
            console.log(`playing track from CONSUMER WITH ID: ${consumer.id}`);
            document.getElementById(newElementId).srcObject = new MediaStream([track]);

            // the server consumer started with media paused
            // so we need to inform the server to resume
            webRTCref.current.emit('consumer-resume', {
                room: joinedRoom,
                user: login.user,
                serverConsumerId: serverConsumerId
            });
        }

        // SOCKET EVENTS LISTENER//
        // server informs the client of user joining the room
        webRTCref.current.on('connection-success', ({ socketId }) => {
            console.log(`peer connection success ${login.user.username} with socketId: ` + socketId);
            // get local stream after the connection success
            getLocalStream();
        });
        webRTCref.current.on('user-already-joined', ({ error }) => console.log(`already joined the room`));
        webRTCref.current.on('new-producer', ({ producerId }) => signalNewConsumerTransport(producerId));

        // CLEANUP EVENT
        webRTCref.current.on('producer-closed', ({
            serverConsumerId,
            serverConsumerKind,
            remoteProducerId
        }) => {
            // server notification is received when a producer is closed
            // we need to close the client-side consumer and associated transport
            const producerToClose = consumerTransports.find(data => data.producerId === remoteProducerId);
            producerToClose.consumerTransport.close();
            producerToClose.consumer.close();

            // remove the consumer transport from the list
            consumerTransports = consumerTransports.filter(data => data.producerId !== remoteProducerId)

            // remove the video div element
            const isAudio = serverConsumerKind === 'audio';
            const container = isAudio ?
                document.getElementsByClassName('creative-store-audio-media-container')[0] :
                document.getElementsByClassName(`creative-store-video-media-container-${joinedRoom.roomId}`)[0];

            let removingElem = document.getElementById(`creative-store-consumer-${serverConsumerId}-remote-producer-${remoteProducerId}`);
            container.removeChild(removingElem);
        });
    }

    function handleJoinTextRoom() {

    }

    function handleRoomSocketCleanUp(joinedRoom) {
        // set room with the new value

        if (!joinedRoom) return;
        setChannels((oldChannels) => {
            // // find the rooms in roomCategory
            let selectedRoomChannel = oldChannels[joinedRoom.channelId];
            let updateRooms = selectedRoomChannel.channelRooms;
            let updateRoom = updateRooms[joinedRoom.roomId];
            if (!updateRoom) throw new Error(ROOM_UNAVAILABLE);

            // filter the socket
            let filteredSockets = { ...oldChannels[joinedRoom.channelId].channelRooms[joinedRoom.roomId].roomSockets }
            delete filteredSockets[login.user.userId];

            return {
                ...oldChannels,
                [joinedRoom.channelId]: {
                    ...oldChannels[joinedRoom.channelId],
                    channelRooms: {
                        ...oldChannels[joinedRoom.channelId].channelRooms,
                        [joinedRoom.roomId]: {
                            ...oldChannels[joinedRoom.channelId].channelRooms[joinedRoom.roomId],
                            roomSockets: {
                                ...filteredSockets
                            }
                        }
                    }
                },
            };
        });

        // clear the joined room value
        setJoinedRoom(null);

        // // disconnect the peer from the socket
        webRTCref.current.disconnect();

        // // delete the previous webrtc ref
        delete webRTCref.current;
    }

    function handleJoinRoom(room, channel) {
        // // find the room that the socket join
        // // if the room is available then push the new socket user info
        setChannels((oldChannels) => {
            // find the rooms in roomCategory
            let selectedChannel = oldChannels[channel.channelId];
            let updateRooms = selectedChannel.channelRooms;

            // delete the user inside the room with the key
            let updateRoom = updateRooms[room.roomId];
            if (!updateRoom) throw new Error(ROOM_UNAVAILABLE);

            return {
                ...oldChannels,
                [channel.channelId]: {
                    ...oldChannels[channel.channelId],
                    channelRooms: {
                        ...oldChannels[channel.channelId].channelRooms,
                        [room.roomId]: {
                            ...oldChannels[channel.channelId].channelRooms[room.roomId],
                            roomSockets: {
                                ...oldChannels[channel.channelId].channelRooms[room.roomId].roomSockets,
                                [login.user.userId]: {
                                    ...login.user
                                }
                            }
                        }
                    }
                },
            };
        });

        // set room with the new value and new channel id
        let selectedRoom = {
            channelId: channel.channelId,
            ...room
        };

        // set the state
        setJoinedRoom(selectedRoom);

        // return the new selected room to be processed
        return selectedRoom;
    }

    const listenJoinRoom = useCallback((channel, room, joinedRoom) => {
        // handle WebRTC Socket connection to the signaler service,
        // and store it to webRTCref
        // once it connect it will process the ICE establishment

        // do some validation
        // check whether there is already a ref to the socket and if its connected then return
        if (room.roomType !== VOICE) return handleJoinTextRoom();
        if (!login) return window.handleOpenOverriding(LOGIN);
        if (!room.roomId) return;
        if (webRTCref.current &&
            webRTCref.current.connected &&
            joinedRoom.roomId === room.roomId
        ) return;
        if (webRTCref.current &&
            webRTCref.current.connected
        ) handleRoomSocketCleanUp(joinedRoom);

        // proceed altering room state
        let selectedRoom = handleJoinRoom(room, channel);

        // connecting to the websocket
        webRTCref.current = connectWebsocket(process.env.REACT_APP_WG_SIGNALER_SERVICE);
        // and then initialize the websocket to the webrtc server signaler service
        handleInitializeWebsocket(selectedRoom);
    }, [joinedRoom])

    function handleBottomSheet() {
        setToggle(!toggle);
    }

    function handleRedirectNoStoreFound() {
        // Placeholder message while redirecting to home page
        return <ErrorHandling errorMessage={NO_STORE_FOUND_IN_THE_CREATIVE_STORE} >
            <br />
            <br />
            <Button onClick={() => window.location.replace('/')}>
                Balik ke Home
            </Button>
        </ErrorHandling>
    }

    // COMPONENTS SPECIFIC //

    const ShowNewOrders = (props) => {
        return <Fragment>
            <div className='creative-store-scrollable-visitor-container'>
                {props.datas && props.datas.map((obj, index) => {
                    return <div
                        className='creative-store-visitor-user'
                        key={`creative-store-visitor-user-${index}`}>
                        <Avatar
                            style={{ cursor: "pointer" }}
                            size={40}
                            round={true}
                            title={obj.fullname}
                            name={obj.fullname} />
                        <div className='creative-store-visitor-user-text-container'>
                            <label className="light-color">
                                {obj.fullname}
                            </label>
                            <small>
                                {obj.userRank}
                            </small>
                        </div>
                    </div>
                })}
            </div>
        </Fragment>
    }

    const ShowVisitors = (props) => {
        return <Fragment>
            <div className='creative-store-scrollable-visitor-container'>
                {props.datas && props.datas.map((obj, index) => {
                    return <div
                        className='creative-store-visitor-user cursor-pointer'
                        key={`creative-store-visitor-user-${index}`}>
                        <Avatar
                            style={{ cursor: "pointer" }}
                            size={40}
                            round={true}
                            title={obj.fullname}
                            name={obj.fullname} />
                        <div className='creative-store-visitor-user-text-container'>
                            <label className="light-color cursor-pointer">
                                {obj.fullname}
                            </label>
                            <small>
                                {obj.userRank}
                            </small>
                        </div>
                    </div>
                })}
            </div>
        </Fragment>
    }

    const ShowChatTexts = (props) => {
        return props.datas.map((obj1, index1) => {
            return <div
                key={`creative-store-chattext-container-${index1}`}
                className="creative-store-chattext-container">
                <div className="creative-store-chattext-avatar">
                    <Avatar style={{ cursor: "pointer" }}
                        round={true} size={50}
                        src={obj1.user.profilePictureURI}
                        title={obj1.user.fullname}
                        name={obj1.user.fullname} />
                </div>
                <div className="creative-store-chattext-wrapper">
                    <div>
                        <h4 className='creative-store-chattext-username'>{obj1.user.fullname}</h4>
                        <small>{obj1.chats[obj1.chats.length - 1].createdAt}</small>
                    </div>
                    {obj1.chats.map((obj2, index2) => {
                        return <p
                            key={`creative-store-chattext-p-${index2}`}
                        >{obj2.content}</p>
                    })}
                </div>
            </div>
        })
    }

    // MEMOIZE COMPONENTS

    const showChats = useMemo(() => {
        return <ShowChatTexts datas={initialChatTexts} />
    }, [initialChatTexts]);

    const showRightSidePanel = useMemo(() => {
        if (selectedRightPanel === TRANSACTION_ORDERS) return <ShowNewOrders datas={visitor} />
        return <ShowVisitors datas={visitor} />
    }, [selectedRightPanel, visitor]);

    // INITIAL RENDER
    // AND WEBSOCKET INITIALIZATION
    useEffect(() => {
        smoothScrollTop();
        handleInitialize();

        return () => {
            if (webRTCref.current) webRTCref.current.disconnect();
        }
    }, []);

    if (!storeId) handleRedirectNoStoreFound();
    return (
        <Fragment>
            <div className='creative-store-audio-media-container'>
            </div>
            <div className="creative-store-container">
                <div className="creative-store-wrapper">
                    <div className="creative-store-flex-container">
                        <div className="creative-store-left-panel-container">
                            <div className="creative-store-sub-container creative-store-avatar">
                                <div className="creative-store-avatar-container">
                                    <div className="creative-store-identifier-img-wrapper">
                                        <Avatar
                                            style={{ cursor: "pointer" }}
                                            src={"https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g"}
                                            size={60}
                                            title={"test"}
                                            name={"test"} />
                                    </div>
                                </div>
                                <div className="creative-store-header">
                                    <h3 className='creative-store-store-title'>Bahari One Stop</h3>
                                    <label className='creative-store-store-label'>Kita adalah toko terbaik di muka bumi Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, dignissimos! Obcaecati, magni temporibus soluta atque nesciunt ipsam velit explicabo eligendi earum ullam nemo, voluptate nam totam iusto culpa optio repudiandae?</label>
                                </div>
                            </div>
                            <div className="creative-store-sub-container creative-store-add-menu">
                                <div className="creative-store-add-menu-wording">
                                    <h4 className='white-color'>Tambah Kategori</h4>
                                    <span className='creative-store-plus-button' />
                                </div>
                            </div>
                            <div className="creative-store-sub-container creative-store-scrollable-menu-header">
                                <Button className='creative-store-scrollable-menu-button'>Katalog</Button>
                            </div>
                            <div className="creative-store-sub-container creative-store-scrollable-menu-body">
                                <div className='creative-store-scrollable-menu-container'>
                                    <ShowChannels uniqueKey="desktop" channels={channels} joinedRoom={joinedRoom} listenJoinRoom={listenJoinRoom} />
                                </div>
                            </div>
                            <div className="creative-store-sub-container creative-store-user-avatar">
                                <div className="creative-store-user-avatar-container">
                                    <div className="creative-store-user-identifier-img-wrapper">
                                        <Avatar style={{ cursor: "pointer" }}
                                            round={true} size={50}
                                            title={"Freddy Sambo"}
                                            name={"Freddy Sambo"} />
                                    </div>
                                </div>
                                <div className="creative-store-user-avatar-side-container">
                                    <h4 className='creative-store-store-user-name'>Freddy Sambo</h4>
                                    <small>Newcomer</small>
                                    <div className='creative-store-store-user-tools'>
                                        <span className="creative-store-button-icon creative-store-button-icon-voice" />
                                        <span className="creative-store-button-icon creative-store-button-icon-audio" />
                                    </div>
                                </div>
                                <div className="creative-store-user-avatar-end-container">
                                    <span className="creative-store-button-icon creative-store-button-icon-setting" />
                                </div>
                            </div>
                        </div>
                        <div className="creative-store-body-container">
                            <div className="creative-store-body-header-container" >
                                <div className="creative-store-body-header-left">
                                    <FloatButton onClick={() => handleBottomSheet()} className="creative-store-filter-button" />
                                    <h4>📢︱announcement</h4>
                                </div>
                            </div>
                            <div className="creative-store-chatbody-container dark-bg-color">
                                <div className="creative-store-chatbody-wrapper">
                                    {showChats}
                                </div>
                            </div>
                            <div className="creative-store-chat-container dark-bg-color">
                                <FloatButton onClick={() => { }} className='creative-store-chat-leftside-textinput-button creative-store-chat-leftside-textinput-button-emoji' />
                                <FloatButton onClick={() => { }} className='creative-store-chat-leftside-textinput-button creative-store-chat-leftside-textinput-button-gif' />
                                <TextInput className="creative-store-chat-textinput light-color darker-bg-color"></TextInput>
                                <Button>Send</Button>
                            </div>
                        </div>
                        <div className="creative-store-right-panel-container">
                            <div className="creative-store-sub-container creative-store-right-panel-tools">
                                <div className="creative-store-right-panel-left-header">
                                    <FloatButton onClick={() => setSelectedRightPanel(VISITORS)} className='creative-store-rightside-menu-button-active creative-store-rightside-menu-people-button' />
                                    <FloatButton onClick={() => setSelectedRightPanel(TRANSACTION_ORDERS)} className='creative-store-rightside-menu-button creative-store-rightside-menu-pinned-button' />
                                </div>
                                <div className="creative-store-right-panel-right-header">
                                    <FloatButton onClick={() => window.handleOpenOverriding(MENU_MOBILE)} className='creative-store-hamburg-menu-button' />
                                </div>
                            </div>
                            <div className="creative-store-sub-container creative-store-scrollable-visitor-header">
                                <h3 className='creative-store-scrollable-visitor-title'>Visitor</h3>
                                <hr className='creative-store-linebreak'></hr>
                            </div>
                            <div className="creative-store-sub-container creative-store-scrollable-visitor-body">
                                {showRightSidePanel}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomSheet toggle={toggle} clicked={handleBottomSheet}>
                <div className="creative-store-mobile-tools-container">
                </div>
            </BottomSheet>
        </Fragment>
    )
}
