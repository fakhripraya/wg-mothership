import React, { useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { iceConfig } from '../../config/rtc/ice';
import { connectWebsocket } from '../../config/websocket/websocket';
import { useAxiosGet } from '../../utils/hooks/useAxios';
import { ROOM_AVAILABLE, ROOM_FULL, URL_ROOM_CHECK, USER_ALREADY_JOIN } from '../../variables/global';
import './style.scss';

const userIDDummy = uuid();

export default function RDPRoom() {

    // REFS //
    const userVideo = useRef();
    const partnerVideo = useRef();
    const peerRef = useRef();
    const socketRef = useRef();
    const otherUser = useRef();
    const userStream = useRef();

    // HOOKS //
    const navigate = useNavigate();
    const getCheckRoom = useAxiosGet();
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    // VARIABLES //
    const roomCode = searchParams.get("code");
    const userJoin = {
        id: userIDDummy, //TODO: currently using dummy, change to dynamic data
    }

    useEffect(() => {
        // navigate back to /rdp if room code is undefined 
        if (!roomCode) navigate('/rdp');

        // SOCKET CONNECT //
        socketRef.current = connectWebsocket(process.env.REACT_APP_SIGNALER_SERVICE);

        // SOCKET ON //
        socketRef.current.on("rdp error", (reason) => navigate(`/rdp/error?reason=${reason}`));
        socketRef.current.on('user call', userID => {
            callUser(userID);
            otherUser.current = userID;
        });
        socketRef.current.on("user joined", otherID => otherUser.current = otherID);
        socketRef.current.on("offer", handleRecieveCall);
        socketRef.current.on("answer", handleAnswer);
        socketRef.current.on("ice-candidate", handleNewICECandidateMsg);

        async function proceedCheckRoom() {
            await getCheckRoom.getData({
                endpoint: process.env.REACT_APP_SIGNALER_SERVICE,
                url: `${URL_ROOM_CHECK}?userId=${userJoin.id}&roomCode=${roomCode}`,
            });
        };

        // Check if room is full or not
        proceedCheckRoom()
            .catch(console.error);

        return () => {
            if (userStream.current) userStream.current.getTracks().forEach((tracks) => tracks.stop());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (getCheckRoom.responseStatus && getCheckRoom.responseData.code) {
            if (getCheckRoom.responseData.code === USER_ALREADY_JOIN) navigate(`/rdp/error?reason=${USER_ALREADY_JOIN}`);
            if (getCheckRoom.responseData.code === ROOM_FULL) navigate(`/rdp/error?reason=${ROOM_FULL}`);
            if (getCheckRoom.responseData.code === ROOM_AVAILABLE) {
                // GET USER DISPLAY AND SIGNAL RTC CALL
                navigator.mediaDevices.getDisplayMedia({ cursor: false }).then(stream => {
                    userVideo.current.srcObject = stream;
                    userStream.current = stream;
                    socketRef.current.emit("join room", userJoin, roomCode);
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getCheckRoom.responseData, getCheckRoom.responseError, getCheckRoom.responseStatus, getCheckRoom.errorContent]);

    function hasRTCPeerConnection() {
        let RTCPeerConnectionConstructor = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
        return !!RTCPeerConnectionConstructor;
    }

    function callUser(userID) {
        peerRef.current = createPeer(userID);
        userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
    }

    function createPeer(userID) {
        //TODO: Create some warning message to the user to disable website extension that interfere the RTCPeerConnection constructor
        let RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;
        const peer = new RTCPeerConnection(iceConfig);

        peer.onicecandidate = handleICECandidateEvent;
        peer.ontrack = handleTrackEvent;
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

        return peer;
    }

    function handleNegotiationNeededEvent(userID) {
        peerRef.current.createOffer().then(offer => {
            return peerRef.current.setLocalDescription(offer);
        }).then(() => {
            const payload = {
                target: userID,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            };
            socketRef.current.emit("offer", payload);
        }).catch(e => console.log(e));
    }

    function handleRecieveCall(incoming) {
        peerRef.current = createPeer();
        const desc = new RTCSessionDescription(incoming.sdp);
        peerRef.current.setRemoteDescription(desc).then(() => {
            userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
        }).then(() => {
            return peerRef.current.createAnswer();
        }).then(answer => {
            return peerRef.current.setLocalDescription(answer);
        }).then(() => {
            const payload = {
                target: incoming.caller,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            }
            socketRef.current.emit("answer", payload);
        })
    }

    function handleAnswer(message) {
        const desc = new RTCSessionDescription(message.sdp);
        peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
    }

    function handleICECandidateEvent(e) {
        if (e.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: e.candidate,
            }
            socketRef.current.emit("ice-candidate", payload);
        }
    }

    function handleNewICECandidateMsg(incoming) {
        const candidate = new RTCIceCandidate(incoming);

        peerRef.current.addIceCandidate(candidate)
            .catch(e => console.log(e));
    }

    function handleTrackEvent(e) {
        partnerVideo.current.srcObject = e.streams[0];
    };

    return (
        <div className="rdp-room-container">
            <div className="rdp-room-wrapper">
                <video className="rdp-room-user-video" autoPlay ref={userVideo} />
                <video className="rdp-room-partner-video" autoPlay ref={partnerVideo} />
            </div>
        </div>
    );
}
