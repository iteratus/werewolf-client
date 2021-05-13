import express from "express";
import socketIo from "socket.io";
import http from "http";
import randomString from "random-string";
import avatarsMiddleware from 'adorable-avatars';

import ErrorResponse from "./interfaces/socket/ErrorResponse";
import {
  EnterRoomPayload,
  EnterRoomResponse
} from "./interfaces/socket/EnterRoom";
import RoomList from "./interfaces/game/RoomList";
import UserIdRoomMap from "./interfaces/game/UserIdRoomMap";

const app: express.Application = express();
const httpServer: http.Server = http.createServer(app);

const io: socketIo.Server = socketIo(httpServer, {
  origins: ["http://localhost:3000"]
});

app.get("/", function(req, res) {
  res.send("HENLO World!");
});

app.use('/avatar', avatarsMiddleware);

const roomList: RoomList = {};

const userIdRoomMap: UserIdRoomMap = {};

io.on("connection", socket => {
  console.log("you are.");

  socket.on("enterRoom", (payload: EnterRoomPayload) => {
    console.log(roomList, payload);

    if (!roomList[payload.room]) {
      roomList[payload.room] = {
        gameState: { started: null },
        userList: {}
      };

      console.log("HENLO room");
    }

    if (!roomList[payload.room].userList[payload.username]) {
      roomList[payload.room].userList[payload.username] = {
        userId: randomString(),
        socketId: socket.id,
        joined: new Date(),
        disconnected: null
      };
    } else {
      const user = roomList[payload.room].userList[payload.username];

      if (user.userId !== payload.userId) {
        const response: ErrorResponse = {
          errorCode: 409,
          errorMessage: "Conflict: User already in use"
        };

        socket.emit("enterRoomError", response);

        return;
      }
    }

    userIdRoomMap[socket.id] = {
      room: payload.room,
      username: payload.username
    };

    socket.join(payload.room);

    const connectedUsers = Object.keys(roomList[payload.room].userList);

    const response: EnterRoomResponse = {
      userId: roomList[payload.room].userList[payload.username].userId,
      connectedUsers
    };

    socket.emit("roomEntered", response);

    socket.to(payload.room).emit("connectedUsers", connectedUsers);
  });

  socket.on("henloServer", message => {
    console.log(`client sent: ${message.message}`);
    socket.emit("henloClient", `you said: ${message.message}`);
  });

  socket.on("disconnect", () => {
    if (userIdRoomMap[socket.id]) {
      const { room, username } = userIdRoomMap[socket.id];

      delete userIdRoomMap[socket.id];
      delete roomList[room].userList[username];

      if (Object.keys(roomList[room].userList).length < 1) {
        delete roomList[room];

        console.log("OLNEH room");
      }
    }

    console.log("you are not.");
  });
});

httpServer.listen(8666, () => {
  console.log("app listening on 8666");
});
