import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import randomString from "random-string";

import Fog from "../../components/Fog";
import Header from "../../components/Header";
import User from "../User";
import Lobby from "../Lobby";
import SocketContext from "../../contexts/SocketContext";
import GameContext from "../../contexts/GameContext";

import styles from "./App.module.scss";
import {initSockets} from "../../contexts/sockets";
import "../../translations/i18nInit";

const App = (): JSX.Element => {
  let MainApp = Lobby;

  const storedUsername = localStorage.getItem("username");

  if (!storedUsername) {
    MainApp = User;
  }

  const [username, setUsername] = useState(storedUsername || "");
  const [room, setRoom] = useState({ connectedUsers: Array<string>() });

  useEffect(() => initSockets({ setRoom }), []);

  return (
    <Router>
      <SocketContext.Provider value={{ room, setRoom }}>
        <GameContext.Provider value={{ username, setUsername, room, setRoom }}>
          <div className={styles.app}>
            <Fog />
            <Header />
            <Switch>
              <Route exact path="/:roomId" component={MainApp} />
              <Redirect to={`/${randomString()}`} />
            </Switch>
          </div>
        </GameContext.Provider>
      </SocketContext.Provider>
    </Router>
  );
};

export default App;
