import express from "express";
import socketIo from "socket.io";
import http from "http";
import randomString from "random-string";

const app: express.Application = express();
const httpServer: http.Server = http.createServer(app);
const io = socketIo(httpServer);

app.get("/", function(req, res) {
  res.send("Henlo World!");
});

interface User {
  userId: string,
  joined: Date
}

interface Session {
  [ key: string ]: User
}

interface SessionPool {
  [ key: string ]: Session
}

interface ErrorResponse {
  errorCode: number,
  errorMessage: string
}

interface JoinPayload {
  session: string,
  userId: string,
  username: string,
  message: string,
}

interface JoinResponse {
  userId: string,
  connectedUsers: Array<string>,
}

const sessionPool: SessionPool = {};

io.on("connection", socket => {
  console.log("you are.");

  socket.on("joinSession", (payload: JoinPayload) => {
    console.log(sessionPool, payload);

    if (!sessionPool[payload.session]) {
      sessionPool[payload.session] = {};
    }

    if (!sessionPool[payload.session][payload.username]) {
      sessionPool[payload.session][payload.username] = {
        userId: randomString(),
        joined: new Date()
      };
    } else {
      const user = sessionPool[payload.session][payload.username];

      if (user.userId !== payload.userId) {
        const response: ErrorResponse = {
          errorCode: 409,
          errorMessage: "Conflict: User already in use",
        };

        socket.emit("sessionJoinedError", response);

        return;
      }
    }

    socket.join(payload.session);

    const connectedUsers = Object.keys(sessionPool[payload.session]);

    const response: JoinResponse = {
      userId: sessionPool[payload.session][payload.username].userId,
      connectedUsers,
    };

    socket.emit("sessionJoined", response);

    socket.to(payload.session).emit("connectedUsers", connectedUsers);
  });

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
