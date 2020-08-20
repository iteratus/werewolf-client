import { createContext } from "react";

const SocketContext = createContext({
  connectedUsers: Array<string>()
});

export default SocketContext;
