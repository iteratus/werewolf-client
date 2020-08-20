import { createContext } from "react";

interface Session {
  connectedUsers: Array<string>
};

const GameContext = createContext({
  username: "",
  setUsername: (value: string) => {},
  session: {
    connectedUsers: Array<string>()
  },
  setSession: (session: Session) => {},
});

export default GameContext;
