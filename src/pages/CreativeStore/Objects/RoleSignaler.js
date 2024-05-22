export default class RoleSignaler {
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

    // ERROR EVENTS
    this.peerRef.on("connect_error", (error) => {
      console.error(
        `connection error due to ${error.message}`
      );
      this.peerRef.connect();
    });

    // CLEANUP EVENTS
    // this will trigger when the local producer(user) leave the room
    this.peerRef.on("disconnect", () => {});
  }
}
