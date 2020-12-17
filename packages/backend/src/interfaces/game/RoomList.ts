import { Interface } from "readline";

interface User {
  userId: string;
  socketId: string;
  joined: Date;
  disconnected: Date | null;
}

interface UserList {
  [key: string]: User;
}

interface Phase {
  [key: string]: Array<String>;
}

interface PhaseList {
  phases: Array<Phase>;
}

interface GameState {
  started: Date | null;
  phases: PhaseList | null;
}

interface Room {
  gameState: GameState;
  userList: UserList;
}

export default interface RoomList {
  [key: string]: Room;
}
