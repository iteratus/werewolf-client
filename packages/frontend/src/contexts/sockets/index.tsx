import React from "react";
import io from "socket.io-client";
import { socketEvents } from "./listen";

export const socket = io("http://localhost:8666");

export type Room = {
  connectedUsers: Array<string>
};

export const initSockets = ({
  setRoom
}: {
  setRoom: React.Dispatch<React.SetStateAction<Room>>;
}) => {
  socketEvents({ setRoom });
};
