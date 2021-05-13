import { createContext } from "react";

import Room from "interfaces/Room";

const GameContext = createContext({
  username: "",
  setUsername: (value: string) => {},
  room: {
    connectedUsers: Array<string>(),
    phase: "",
  },
  setRoom: (room: Room) => {},
});

export default GameContext;
