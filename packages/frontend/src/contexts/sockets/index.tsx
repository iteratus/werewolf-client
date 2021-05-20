import React from "react";
import io from "socket.io-client";
import { socketEvents } from "./listen";
import { Room } from "werewolf-types";

export const socket = io("http://localhost:8666");

export const initSockets = ({
  setRoom
}: {
  setRoom: React.Dispatch<React.SetStateAction<Room>>;
}) => {
  socketEvents({ setRoom });
};
