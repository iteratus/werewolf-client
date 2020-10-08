import React from "react";
import { socket } from "./index";
import Room from "interfaces/Room";
import { EnterRoomResponse } from "interfaces/socket/EnterRoom";
import ErrorResponse from "interfaces/socket/ErrorResponse";

export const socketEvents = ({
  setRoom
}: {
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

    setRoom({ connectedUsers: response.connectedUsers });
  });

  socket.on("connectedUsers", (connectedUsers: Array<string>) => {
    console.log(connectedUsers);
    setRoom({ connectedUsers });
  });

  socket.on("enterRoomError", (response: ErrorResponse) => {
    switch (response.errorCode) {
      case 409:
        alert("HACKER-ALARM!");
        console.log(response.errorMessage);
        break;
    }
  });
};
