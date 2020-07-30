import { createContext } from "react";

const GameContext = createContext({
  username: "",
  setUsername: (value: string) => {}
});

export default GameContext;
