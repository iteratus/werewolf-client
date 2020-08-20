import React, { useState, useEffect } from "react";
import SocketContext from "./SocketContext";
import { initSockets, Session } from "./sockets";

const SocketProvider = (props: { children: JSX.Element }) => {
  const [session, setSession] = useState<Session>({
    connectedUsers: Array<string>()
  });

  useEffect(() => initSockets({ setSession }), []);

  return (
    <SocketContext.Provider value={session}>
      {props.children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
