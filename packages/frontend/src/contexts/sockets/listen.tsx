import React from "react";
import { socket } from "./index";
import { Session } from "./index";

interface SessionJoinedResponse {
  userId: string,
  connectedUsers: Array<string>
}

interface ErrorResponse {
  errorCode: number,
  errorMessage: string
}

export const socketEvents = ({
  setSession
}: {
  setSession: React.Dispatch<React.SetStateAction<Session>>;
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

  socket.on("sessionJoined", (response: SessionJoinedResponse) => {
    localStorage.setItem("userId", response.userId);

    setSession({ connectedUsers: response.connectedUsers });
  });

  socket.on("connectedUsers", (connectedUsers: Array<string>) => {
    console.log(connectedUsers);
    setSession({ connectedUsers });
  });

  socket.on("sessionJoinedError", (response: ErrorResponse) => {
    switch (response.errorCode) {
      case 409:
        alert("HACKER-ALARM!");
        console.log(response.errorMessage);
        break;
    }
  });
};
