import React from "react";
import ReactDOM from "react-dom";
import SocketProvider from "./contexts";
import "./index.module.scss";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
