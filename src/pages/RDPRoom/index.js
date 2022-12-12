import React, { useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import io from "socket.io-client";
import { v4 as uuid } from 'uuid';
import { iceConfig } from '../../config/rtc/ice';
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
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();

    // VARIABLES //
    const roomCode = searchParams.get("code");

    useEffect(() => {
        if (!roomCode) navigate('/rdp');

        const userJoin = {
            id: userIDDummy, //test
            socketId: null,
        }

        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
            userVideo.current.srcObject = stream;
            userStream.current = stream;

            socketRef.current = io.connect(process.env.REACT_APP_SIGNALER_SERVICE, {
                withCredentials: true,
                extraHeaders: {
                    "user-agent": "Mozilla"
                }
            });
            socketRef.current.emit("join room", userJoin, roomCode);

            socketRef.current.on('user call', userID => {
                callUser(userID);
                otherUser.current = userID;
            });

            socketRef.current.on("user joined", otherID => {
                otherUser.current = otherID;
            });

            socketRef.current.on("offer", handleRecieveCall);
            socketRef.current.on("answer", handleAnswer);
            socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
        });

    }, []);

    function callUser(userID) {
        peerRef.current = createPeer(userID);
        userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
    }

    function createPeer(userID) {
        RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;
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
                <video autoPlay ref={userVideo} />
                <video autoPlay ref={partnerVideo} />
            </div>
        </div>
    );
}
