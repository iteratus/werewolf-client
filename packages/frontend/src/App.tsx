import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import randomString from "random-string";

import Header from "./components/Header";
import User from "./pages/User";
import Lobby from "./pages/Lobby";
import SocketContext from "./contexts/SocketContext";
import GameContext from "./contexts/GameContext";

import styles from "./App.module.scss";
import {initSockets} from "./contexts/sockets";

const App = (): JSX.Element => {
  let MainApp = Lobby;

  const storedUsername = localStorage.getItem("username");

  if (!storedUsername) {
    MainApp = User;
  }

  const [username, setUsername] = useState(storedUsername || "");
  const [session, setSession] = useState({ connectedUsers: Array<string>() });

  useEffect(() => initSockets({ setSession }), []);

  return (
    <Router>
      <SocketContext.Provider value={{ session, setSession }}>
        <GameContext.Provider value={{ username, setUsername, session, setSession }}>
          <div className={styles.app}>
            <Header />
            <Switch>
              <Route exact path="/:sessionId" component={MainApp} />
              <Redirect to={`/${randomString()}`} />
            </Switch>
          </div>
        </GameContext.Provider>
      </SocketContext.Provider>
    </Router>
  );
};

export default App;
