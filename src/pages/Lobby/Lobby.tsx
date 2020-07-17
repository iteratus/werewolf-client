import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";

import styles from "./Lobby.module.scss";

const Lobby = (props: RouteComponentProps): JSX.Element => {
  const ws = new WebSocket("ws://localhost:8668/ws");

  useEffect(() => {
    ws.onopen = () => {
      console.log("connected");
      ws.send("henlo pommes");
    };

    ws.onmessage = event => {
      console.log(event.data);
    };

    ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
    };
  });

  return (
    <>
      <div className={styles.choose}>Hello werewolves</div>
    </>
  );
};

export default withRouter(Lobby);
