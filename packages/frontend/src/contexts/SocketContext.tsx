import { createContext } from "react";

const SocketContext = createContext({
  //examples only
  queueLength: 0,
  positionInLine: 0
});

export default SocketContext;
