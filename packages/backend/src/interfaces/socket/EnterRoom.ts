export interface EnterRoomResponse {
  userId: string;
  connectedUsers: Array<string>;
  phase: string;
}

export interface EnterRoomPayload {
  room: string;
  userId: string;
  username: string;
  message: string;
}
