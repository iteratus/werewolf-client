import React from "react";
import io from "socket.io-client";
import { socketEvents } from "./events";
import { getQueueLength } from "./emit";

export const socket = io();

export type ValueState = {
  queueLength: number;
  positionInLine: number;
};

export const initSockets = ({
  setValue
}: {
  setValue: React.Dispatch<React.SetStateAction<ValueState>>;
}) => {
  socketEvents({ setValue });
  // setValue    ^ is passed on to be used by socketEvents
  getQueueLength();
};
