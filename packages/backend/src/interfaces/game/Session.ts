import GameState from "./GameState";
import UserList from "./UserList";

export default interface Session {
  gameState: GameState;
  userList: UserList;
}
