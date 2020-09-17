import express from "express";
import socketIo from "socket.io";
import http from "http";
import randomString from "random-string";

import ErrorResponse from "./interfaces/socket/ErrorResponse";
import JoinPayload from "./interfaces/socket/JoinPayload";
import JoinResponse from "./interfaces/socket/JoinResponse";
import SessionList from "./interfaces/game/SessionList";
import UserIdSessionMap from "./interfaces/game/UserIdSessionMap";

const app: express.Application = express();
const httpServer: http.Server = http.createServer(app);

const io: socketIo.Server = socketIo(httpServer);

app.get("/", function(req, res) {
  res.send("Henlo World!");
});

const sessionList: SessionList = {};

const userIdSessionMap: UserIdSessionMap = {};

io.on("connection", socket => {
  console.log("you are.");

  socket.on("joinSession", (payload: JoinPayload) => {
    console.log(sessionList, payload);

    if (!sessionList[payload.session]) {
      sessionList[payload.session] = {
        gameState: { started: null },
        userList: {}
      };

      console.log("henlo session");
    }

    if (!sessionList[payload.session].userList[payload.username]) {
      sessionList[payload.session].userList[payload.username] = {
        userId: randomString(),
        socketId: socket.id,
        joined: new Date(),
        disconnected: null
      };
    } else {
      const user = sessionList[payload.session].userList[payload.username];

      if (user.userId !== payload.userId) {
        const response: ErrorResponse = {
          errorCode: 409,
          errorMessage: "Conflict: User already in use"
        };

        socket.emit("sessionJoinedError", response);

        return;
      }
    }

    userIdSessionMap[socket.id] = {
      session: payload.session,
      username: payload.username
    };

    socket.join(payload.session);

    const connectedUsers = Object.keys(sessionList[payload.session].userList);

    const response: JoinResponse = {
      userId: sessionList[payload.session].userList[payload.username].userId,
      connectedUsers
    };

    socket.emit("sessionJoined", response);

    socket.to(payload.session).emit("connectedUsers", connectedUsers);
  });

  socket.on("henloServer", message => {
    console.log(`client sent: ${message}`);
    socket.emit("henloClient", `you said: ${message}`);
  });

  socket.on("disconnect", () => {
    const { session, username } = userIdSessionMap[socket.id];

    delete userIdSessionMap[socket.id];
    delete sessionList[session].userList[username];

    console.log("you are not.");

    if (Object.keys(sessionList[session].userList).length < 1) {
      delete sessionList[session];

      console.log("olneh session");
    }
  });
});

httpServer.listen(8666, () => {
  console.log("app listening on 8666");
});
