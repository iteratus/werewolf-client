import { socket } from "./index";

export const joinRoom = () => {
  const payload = {
    room: localStorage.getItem("roomId"),
    userId: localStorage.getItem("userId"),
    username: localStorage.getItem("username"),
  };

  socket.emit("joinRoom", payload);
};

export const henloServer = (message: string) => {
  const payload = {
    message
  };

  socket.emit("henloServer", payload);
};
