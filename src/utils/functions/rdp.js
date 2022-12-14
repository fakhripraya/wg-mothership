import {
    ROOM_FULL,
    ROOM_UNAVAILABLE,
    RTC_PEER_CONNECTION_FAILED,
    RTC_PEER_UNTRUSTED_CONNECTION
} from "../../variables/global"

export const RDPFailMessage = (reason) => {
    if (!reason) return `There is an undefined error happening in the background, please report to us via chat`;
    if (reason === ROOM_UNAVAILABLE) return `The room you tried to join is missing, perhaps the room code is invalid ?`;
    if (reason === ROOM_FULL) return `The room you tried to join is full, maybe you are not invited ? make sure the invitation code the host gave you is correct`;
    if (reason === RTC_PEER_CONNECTION_FAILED) return `The connection to the other peer is failed, please disable all the installed web browser extensions and all possible connected vpns, if this still occur please contact us via chat`;
    if (reason === RTC_PEER_UNTRUSTED_CONNECTION) return `We detect an untrusted connection and is not secure to proceed the connection, please report to us via chat`;
}