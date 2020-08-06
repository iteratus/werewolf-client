import React, { useState, useEffect } from "react";
import SocketContext from "./SocketContext";
import { initSockets, ValueState } from "./sockets";

const SocketProvider = (props: { children: JSX.Element }) => {
  const [value, setValue] = useState<ValueState>({
    //examples only
    queueLength: 0,
    positionInLine: 0
  });
  useEffect(() => initSockets({ setValue }), []);
  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
