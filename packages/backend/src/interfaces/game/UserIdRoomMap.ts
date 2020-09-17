interface UserIdRoomMapData {
  session: string;
  username: string;
}

export default interface UserIdRoomMap {
  [key: string]: UserIdRoomMapData;
}
