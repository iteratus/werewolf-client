import { createContext } from "react";

interface Room {
  connectedUsers: Array<string>
};

const SocketContext = createContext({
  room: {
    connectedUsers: Array<string>()
  },
  setRoom: (room: Room) => {},
});

export default SocketContext;
