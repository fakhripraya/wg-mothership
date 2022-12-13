import { ROOM_FULL } from "../../variables/global"

export const RDPFailMessage = (reason) => {
    if (!reason) return `There is an undefined error happening in the background, please report to us via chat`;
    if (reason === ROOM_FULL) return `The room you tried to join is full, maybe you are not invited ? make sure the invitation code the host gave you is correct`;
}