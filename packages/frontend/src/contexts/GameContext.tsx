import { createContext } from "react";

interface Room {
  connectedUsers: Array<string>
};

const GameContext = createContext({
  username: "",
  setUsername: (value: string) => {},
  room: {
    connectedUsers: Array<string>()
  },
  setRoom: (room: Room) => {},
});

export default GameContext;
