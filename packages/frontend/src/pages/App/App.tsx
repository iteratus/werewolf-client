import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import randomString from "random-string";

import SocketContext from "contexts/SocketContext";
import GameContext from "contexts/GameContext";
import {initSockets} from "contexts/sockets";
import "translations/i18nInit";

import Header from "components/Header";
import User from "pages/User";
import Lobby from "pages/Lobby";

import styles from "pages/App/App.module.scss";

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
            <div className={styles.contentWrapper}>
              <Header />
              <Switch>
                <Route exact path="/:roomId" component={MainApp} />
                <Redirect to={`/${randomString()}`} />
              </Switch>
            </div>
          </div>
        </GameContext.Provider>
      </SocketContext.Provider>
    </Router>
  );
};

export default App;
