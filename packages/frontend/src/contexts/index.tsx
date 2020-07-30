import React, { useState, useEffect } from "react";
import SocketContext from "./SocketContext";
import { initSockets, ValueState } from "./sockets";
//       ^ initSockets is shown later on

const SocketProvider = (props: { children: JSX.Element }) => {
  const [value, setValue] = useState<ValueState>({
    queueLength: 0,
    positionInLine: 0
  });
  useEffect(() => initSockets({ setValue }), [initSockets]);
  // Note, we are passing setValue ^ to initSockets
  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
