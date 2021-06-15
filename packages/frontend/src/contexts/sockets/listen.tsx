import { socket } from "./index";
import Room from "interfaces/Room";
import { EnterRoomResponse, RoomUpdateResponse } from "interfaces/socket/EnterRoom";
import ErrorResponse from "interfaces/socket/ErrorResponse";



export const socketEvents = (socketCallback: (SocketRoom: Room) => void) => {
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

    socketCallback({ connectedUsers: response.connectedUsers, phase: response.phase });
  });

  socket.on("connectedUsers", (response: RoomUpdateResponse) => {
    console.log(response);
    socketCallback(response);
  });

  socket.on("enterRoomError", (response: ErrorResponse) => {
    switch (response.errorCode) {
      case 409:
        alert("HACKER-ALARM!");
        console.log(response.errorMessage);
        break;
    }
  });

  socket.on("currentPhase", (response: RoomUpdateResponse) => {
    socketCallback(response)
    console.log(`Current phase: ${response.phase}`);

  });
};

