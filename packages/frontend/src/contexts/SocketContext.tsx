import { createContext } from "react";

interface Session {
  connectedUsers: Array<string>
};

const SocketContext = createContext({
  session: {
    connectedUsers: Array<string>()
  },
  setSession: (session: Session) => {},
});

export default SocketContext;
