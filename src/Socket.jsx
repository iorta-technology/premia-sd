import { io } from "socket.io-client";

const socket = io("https://abinsurancenode.salesdrive.app", {
  path: "/ab-insurance/",
  withCredentials: true,
  // reconnectionDelayMax: 10000,
  transports: ["websocket", "polling"],
});

export default socket;
