import { socket } from "./index";

export const joinSession = () => {
  const payload = {
    session: localStorage.getItem("sessionHash"),
    userId: localStorage.getItem("userId"),
    username: localStorage.getItem("username"),
  };

  socket.emit("joinSession", payload);
};

export const henloServer = (message: string) => {
  const payload = {
    message
  };

  socket.emit("henloServer", payload);
};
