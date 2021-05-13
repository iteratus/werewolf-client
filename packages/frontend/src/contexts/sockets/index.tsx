import React from "react";
import io from "socket.io-client";
import { socketEvents } from "./listen";
import Room from "interfaces/Room";

export const socket = io("http://localhost:8666");

export const initSockets = ({
  room,
  setRoom
}: {
  room: Room,
  setRoom: React.Dispatch<React.SetStateAction<Room>>;
}) => {
  socketEvents({ room, setRoom });
};
