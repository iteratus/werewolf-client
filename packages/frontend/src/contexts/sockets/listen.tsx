import React from "react";
import { socket } from "./index";
import { Room } from "./index";

interface RoomJoinedResponse {
  userId: string,
  connectedUsers: Array<string>
}

interface ErrorResponse {
  errorCode: number,
  errorMessage: string
}

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

  socket.on("roomJoined", (response: RoomJoinedResponse) => {
    localStorage.setItem("userId", response.userId);

    setRoom({ connectedUsers: response.connectedUsers });
  });

  socket.on("connectedUsers", (connectedUsers: Array<string>) => {
    console.log(connectedUsers);
    setRoom({ connectedUsers });
  });

  socket.on("roomJoinedError", (response: ErrorResponse) => {
    switch (response.errorCode) {
      case 409:
        alert("HACKER-ALARM!");
        console.log(response.errorMessage);
        break;
    }
  });
};
