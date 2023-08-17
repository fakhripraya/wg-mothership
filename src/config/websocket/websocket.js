import io from "socket.io-client";

export const connectWebsocket = (endpoint) => {
  return io.connect(endpoint, {
    withCredentials: true,
    extraHeaders: {
      "user-agent": "Mozilla",
    },
  });
};
