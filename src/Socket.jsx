import { io } from "socket.io-client";

const socket = io("https://b2bnodedev.salesdrive.app", {
  path: "/b2b-socket/",
  withCredentials: true,
  // reconnectionDelayMax: 10000,
  transports: ["websocket", "polling"],
});

export default socket;
