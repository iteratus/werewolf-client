export interface RoomUpdateResponse {
  connectedUsers: Array<string>;
  phase: string;
}

export interface EnterRoomResponse extends RoomUpdateResponse{
  userId: string;
}

export interface EnterRoomPayload {
  room: string;
  userId: string;
  username: string;
  message: string;
}


