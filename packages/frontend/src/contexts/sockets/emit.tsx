import { socket } from "./index";

export const henloServer = (message: string) => {
  socket.emit("henloServer", message);
};
