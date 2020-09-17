export default interface User {
  userId: string;
  socketId: string;
  joined: Date;
  disconnected: Date | null;
}
