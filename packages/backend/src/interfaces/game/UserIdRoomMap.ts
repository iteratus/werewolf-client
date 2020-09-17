interface UserIdRoomMapData {
  room: string;
  username: string;
}

export default interface UserIdRoomMap {
  [key: string]: UserIdRoomMapData;
}
