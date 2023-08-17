import React, { useRef, useEffect, useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { iceConfig } from "../../config/rtc/ice";
import { connectWebsocket } from "../../config/websocket/websocket";
import { useAxios } from "../../utils/hooks/useAxios";
import {
  HOST,
  LOGIN_REQUIRED,
  NO_STRING,
  PEER,
  ROOM_AVAILABLE,
  ROOM_FULL,
  ROOM_UNAVAILABLE,
  RTC_PEER_CONNECTION_FAILED,
  RTC_PEER_UNTRUSTED_CONNECTION,
  URL_ROOM_CHECK,
  USER_ALREADY_JOIN,
} from "../../variables/global";
import "./style.scss";

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
  const getCheckRoomReq = useAxios();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  // eslint-disable-next-line no-unused-vars
  const [onlineStatus, setOnlineStatus] =
    useState(NO_STRING);
  const [user, setUser] = useState(null);

  // VARIABLES //
  const roomCode = searchParams.get("roomCode");
  const userJoin =
    JSON.parse(localStorage.getItem("user")) || null; //TODO: currently using dummy, change to dynamic data

  useEffect(() => {
    // navigate back to /rdp if room code is undefined
    if (!userJoin)
      navigate(`/rdp/error?reason=${LOGIN_REQUIRED}`);
    if (!roomCode)
      navigate(`/rdp/error?reason=${ROOM_UNAVAILABLE}`);

    // SOCKET CONNECT //
    socketRef.current = connectWebsocket(
      process.env.REACT_APP_SIGNALER_SERVICE
    );

    // SOCKET ON //
    socketRef.current.on("rdp error", (reason) =>
      navigate(`/rdp/error?reason=${reason}`)
    );
    socketRef.current.on("user call", (userSocketID) => {
      callUser(userSocketID);
      otherUser.current = userSocketID;
    });
    socketRef.current.on(
      "user joined",
      (otherID) => (otherUser.current = otherID)
    );
    socketRef.current.on("offer", handleRecieveCall);
    socketRef.current.on("answer", handleAnswer);
    socketRef.current.on(
      "ice-candidate",
      handleNewICECandidateMsg
    );

    async function proceedCheckRoom() {
      await getCheckRoomReq.getData({
        endpoint: process.env.REACT_APP_SIGNALER_SERVICE,
        url: `${URL_ROOM_CHECK}?userId=${userJoin.id}&roomCode=${roomCode}`,
      });
    }

    // Check if room is full or not
    proceedCheckRoom().catch(console.error);

    return () => {
      if (userStream.current)
        userStream.current
          .getTracks()
          .forEach((tracks) => tracks.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // function to check the response data from the api
    function getDisplayMediaCheck() {
      if (!getCheckRoomReq.responseData.code) return;
      if (
        getCheckRoomReq.responseData.code ===
        ROOM_UNAVAILABLE
      )
        navigate(`/rdp/error?reason=${ROOM_UNAVAILABLE}`);
      if (
        getCheckRoomReq.responseData.code ===
        USER_ALREADY_JOIN
      )
        navigate(`/rdp/error?reason=${USER_ALREADY_JOIN}`);
      if (getCheckRoomReq.responseData.code === ROOM_FULL)
        navigate(`/rdp/error?reason=${ROOM_FULL}`);
      if (
        getCheckRoomReq.responseData.code === ROOM_AVAILABLE
      ) {
        const userRDPRole =
          getCheckRoomReq.responseData.created_by ===
          userJoin.id
            ? HOST
            : PEER;
        setUser({
          ...userJoin,
          rdp_role: userRDPRole,
        });

        // GET USER DISPLAY FOR THE HOST
        if (userRDPRole) {
          navigator.mediaDevices
            .getDisplayMedia({ cursor: false })
            .then((stream) => {
              if (userVideo.current)
                userVideo.current.srcObject = stream;
              userStream.current = stream;
              //  SIGNAL RTC CALL
              socketRef.current.emit(
                "join room",
                userJoin,
                roomCode
              );
            });
        }
      }
    }

    if (
      getCheckRoomReq.responseStatus &&
      getCheckRoomReq.responseData
    )
      getDisplayMediaCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getCheckRoomReq.responseData,
    getCheckRoomReq.responseError,
    getCheckRoomReq.responseStatus,
    getCheckRoomReq.errorContent,
  ]);

  // FUNCTION SPECIFIC //

  function hasRTCPeerConnection() {
    let RTCPeerConnectionConstructor =
      window.RTCPeerConnection ||
      window.webkitRTCPeerConnection ||
      window.mozRTCPeerConnection;
    return !!RTCPeerConnectionConstructor;
  }

  function callUser(userSocketID) {
    peerRef.current = createPeer(userSocketID);
    userStream.current.getTracks().forEach((track) => {
      peerRef.current.addTrack(track, userStream.current);
    });
  }

  function createPeer(userSocketID) {
    if (!hasRTCPeerConnection())
      navigate(
        `/rdp/error?reason=${RTC_PEER_CONNECTION_FAILED}`
      );

    let RTCPeerConnection =
      window.RTCPeerConnection ||
      window.webkitRTCPeerConnection;
    const peer = new RTCPeerConnection(iceConfig);

    peer.onconnectionstatechange =
      handleOnConnectionStateChange;
    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () =>
      handleNegotiationNeededEvent(userSocketID);

    return peer;
  }

  function handleOnConnectionStateChange(e) {
    const isTrusted = e.isTrusted;
    const connectionState = e.currentTarget.connectionState;
    if (!isTrusted)
      navigate(
        `/rdp/error?reason=${RTC_PEER_UNTRUSTED_CONNECTION}`
      );

    switch (connectionState) {
      //TODO: Create pop up label to identify connection
      case "new":
      case "checking":
        setOnlineStatus("Connecting…");
        break;
      case "connected":
        setOnlineStatus("Online");
        break;
      case "disconnected":
        setOnlineStatus("Disconnecting…");
        break;
      case "closed":
        setOnlineStatus("Offline");
        break;
      case "failed":
        navigate(
          `/rdp/error?reason=${RTC_PEER_CONNECTION_FAILED}`
        );
        break;
      default:
        setOnlineStatus("Unknown");
        break;
    }
  }

  function handleNegotiationNeededEvent(userSocketID) {
    peerRef.current
      .createOffer()
      .then((offer) => {
        return peerRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userSocketID,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("offer", payload);
      })
      .catch((e) =>
        navigate(
          `/rdp/error?reason=${RTC_PEER_CONNECTION_FAILED}`
        )
      );
  }

  function handleRecieveCall(incoming) {
    peerRef.current = createPeer();
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current
      .setRemoteDescription(desc)
      .then(() => {
        userStream.current
          .getTracks()
          .forEach((track) =>
            peerRef.current.addTrack(
              track,
              userStream.current
            )
          );
      })
      .then(() => {
        return peerRef.current.createAnswer();
      })
      .then((answer) => {
        return peerRef.current.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("answer", payload);
      })
      .catch((e) =>
        navigate(
          `/rdp/error?reason=${RTC_PEER_CONNECTION_FAILED}`
        )
      );
  }

  function handleAnswer(message) {
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current
      .setRemoteDescription(desc)
      .catch((e) =>
        navigate(
          `/rdp/error?reason=${RTC_PEER_CONNECTION_FAILED}`
        )
      );
  }

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      };
      socketRef.current.emit("ice-candidate", payload);
    }
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);
    peerRef.current
      .addIceCandidate(candidate)
      .catch((e) =>
        navigate(
          `/rdp/error?reason=${RTC_PEER_CONNECTION_FAILED}`
        )
      );
  }

  function handleTrackEvent(e) {
    if (!user) return;
    if (user.rdp_role !== HOST)
      partnerVideo.current.srcObject = e.streams[0];
  }

  // COMPONENT SPECIFIC //

  const ShowRDPVideoDisplay = () => {
    if (!user) return;

    // if the user is HOST return host video as own video
    if (user.rdp_role === HOST)
      return (
        <video
          className="rdp-room-user-video"
          autoPlay
          ref={userVideo}
        />
      );
    // if the user is not the HOST return host video as partner video
    return (
      <video
        className="rdp-room-partner-video"
        autoPlay
        ref={partnerVideo}
      />
    );
  };

  return (
    <div className="rdp-room-container">
      <div className="rdp-room-wrapper">
        <ShowRDPVideoDisplay />
      </div>
    </div>
  );
}
