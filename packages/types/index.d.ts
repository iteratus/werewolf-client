declare namespace Werewolf {
  interface ErrorResponse {
    errorCode: number;
    errorMessage: string;
  }

  interface EnterRoomResponse {
    userId: string;
    connectedUsers: Array<string>;
  }

  interface EnterRoomPayload {
    room: string;
    userId: string;
    username: string;
    message: string;
  }

  interface User {
    userId: string;
    socketId: string;
    joined: Date;
    disconnected: Date | null;
  }

  interface UserList {
    [key: string]: User;
  }

  interface GameState {
    started: Date | null;
  }

  interface Room {
    gameState: GameState;
    userList: UserList;
  }

  interface RoomList {
    [key: string]: Room;
  }

  interface UserIdRoomMapData {
    room: string;
    username: string;
  }

  interface UserIdRoomMap {
    [key: string]: UserIdRoomMapData;
  }
}

export = Werewolf;
export as namespace Werewolf;
