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

export default interface RoomList {
  [key: string]: Room;
}
