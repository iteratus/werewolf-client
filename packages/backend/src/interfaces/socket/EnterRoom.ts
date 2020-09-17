export interface EnterRoomResponse {
  userId: string;
  connectedUsers: Array<string>;
}

export interface EnterRoomPayload {
  room: string;
  userId: string;
  username: string;
  message: string;
}
