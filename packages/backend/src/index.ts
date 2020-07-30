import express = require("express");
import WebSocket = require("ws");

const app: express.Application = express();

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(8666, function() {
  console.log("App is listening on port 8666!");
});

const wss = new WebSocket.Server({ port: 8668 });

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (message: string) => {
    ws.send(`received: ${message}`);
  });
});
