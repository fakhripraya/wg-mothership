import Button from "../../components/Button";
import {
    LOGIN,
    LOGIN_REQUIRED,
    ROOM_FULL,
    ROOM_UNAVAILABLE,
    RTC_PEER_CONNECTION_FAILED,
    RTC_PEER_UNTRUSTED_CONNECTION,
    USER_ALREADY_JOIN
} from "../../variables/global"

export const RDPFailMessage = (reason) => {
    if (!reason) return `There is an undefined error happening in the background, please report to us via chat`;
    if (reason === LOGIN_REQUIRED) return `User required to login to join the session`;
    if (reason === USER_ALREADY_JOIN) return `You already join the session, check your browser tab, if there isn't, refresh the browser and join the session again`;
    if (reason === ROOM_UNAVAILABLE) return `The room you tried to join is missing, perhaps the room code is invalid ?`;
    if (reason === ROOM_FULL) return `The room you tried to join is full, maybe you are not invited ? make sure the invitation code the host gave you is correct`;
    if (reason === RTC_PEER_CONNECTION_FAILED) return `The connection to the other peer is failed, please disable all the installed web browser extensions and all possible connected vpns, if this still occur please contact us via chat`;
    if (reason === RTC_PEER_UNTRUSTED_CONNECTION) return `We detect an untrusted connection and is not secure to proceed the connection, please report to us via chat`;
}

export const RDPFailButton = (reason) => {
    if (reason === LOGIN_REQUIRED) return <Button onClick={() => window.handleOpenOverriding(LOGIN)} className="rdp-room-error-button-back">Login</Button>;
}