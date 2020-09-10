import React from "react";
import io from "socket.io-client";
import { socketEvents } from "./listen";

export const socket = io("http://localhost:8666");

export type Session = {
  connectedUsers: Array<string>
};

export const initSockets = ({
  setSession
}: {
  setSession: React.Dispatch<React.SetStateAction<Session>>;
}) => {
  socketEvents({ setSession });
};
