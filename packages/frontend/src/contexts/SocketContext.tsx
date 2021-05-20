import { createContext } from "react";

import { Room } from "werewolf-types";

const SocketContext = createContext({
  room: {
    connectedUsers: Array<string>()
  },
  setRoom: (room: Room) => {},
});

export default SocketContext;
