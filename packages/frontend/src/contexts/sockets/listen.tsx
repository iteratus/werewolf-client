import React from "react";
import { socket } from "./index";
import Room from "interfaces/Room";
import { EnterRoomResponse } from "interfaces/socket/EnterRoom";
import ErrorResponse from "interfaces/socket/ErrorResponse";

export const socketEvents = ({
  room,
  setRoom
}: {
  room: Room,
  setRoom: React.Dispatch<React.SetStateAction<Room>>;
}) => {
  // //example only; do not use
  // socket.on("queueLength", ({ queueLength }: { queueLength: number }) => {
  //   setValue(state => {
  //     return { ...state, queueLength };
  //   });
  // });
  //
  // //example only; do not use
  // socket.on(
  //   "positionInLine",
  //   ({ positionInLine }: { positionInLine: number }) => {
  //     setValue(state => {
  //       return { ...state, positionInLine };
  //     });
  //   }
  // );

  socket.on("henloClient", (message: string) => {
    console.log(`server said: "${message}"`);
  });

  socket.on("roomEntered", (response: EnterRoomResponse) => {
    localStorage.setItem("userId", response.userId);

    setRoom({ connectedUsers: response.connectedUsers, phase: response.phase });
  });

  socket.on("connectedUsers", (connectedUsers: Array<string>) => {
    console.log(connectedUsers);
    setRoom({ connectedUsers, phase: room.phase });
  });

  socket.on("enterRoomError", (response: ErrorResponse) => {
    switch (response.errorCode) {
      case 409:
        alert("HACKER-ALARM!");
        console.log(response.errorMessage);
        break;
    }
  });

  socket.on("currentPhase", (phase: string) => {
    setRoom({connectedUsers: room.connectedUsers, phase: phase})
    console.log(`Current phase: ${phase}`);

  });
};

