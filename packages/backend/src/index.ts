import express from "express";
import socketIo from "socket.io";
import http from "http";

const app: express.Application = express();
const httpServer: http.Server = http.createServer(app);
const io = socketIo(httpServer);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

io.on("connection", socket => {
  console.log("you are.");
  socket.on("henloServer", message => {
    console.log(`client sent: ${message}`);
    socket.emit("henloClient", `you said: ${message}`);
  });
  socket.on("disconnect", () => {
    console.log("you are not.");
  });
});

httpServer.listen(8666, () => {
  console.log("app listening on 8666");
});
