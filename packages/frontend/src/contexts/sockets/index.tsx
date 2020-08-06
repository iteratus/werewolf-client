import React from "react";
import io from "socket.io-client";
import { socketEvents } from "./listen";

export const socket = io("http://localhost:8666");
export type ValueState = {
  queueLength: number;
  positionInLine: number;
};
export const initSockets = ({
  //example only; do not use
  setValue
}: {
  setValue: React.Dispatch<React.SetStateAction<ValueState>>;
}) => {
  socketEvents({ setValue });
  // setValue    ^ is passed on to be used by socketEvents
};
