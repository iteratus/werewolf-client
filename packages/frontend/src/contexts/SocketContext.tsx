import { createContext } from "react";

const SocketContext = createContext({
  queueLength: 0,
  positionInLine: 0
});

export default SocketContext;
