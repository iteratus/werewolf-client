import { createContext } from "react";

import Room from "interfaces/Room";

const SocketContext = createContext({
  room: {
    connectedUsers: Array<string>()
  },
  setRoom: (room: Room) => {},
});

export default SocketContext;
