import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import randomString from "random-string";

import Fog from "../../components/Fog";
import Header from "../../components/Header";
import User from "../User";
import Lobby from "../Lobby";
import GameContext from "../../GameContext";

import styles from "./App.module.scss";

const App = (): JSX.Element => {
  let MainApp = Lobby;

  const storedUsername = localStorage.getItem("username");

  if (!storedUsername) {
    MainApp = User;
  }

  const [username, setUsername] = useState(storedUsername || "");

  return (
    <Router>
      <GameContext.Provider value={{ username, setUsername }}>
        <div className={styles.app}>
          <Fog />
          <Header />
          <Switch>
            <Route exact path="/:session" component={MainApp} />
            <Redirect to={`/${randomString()}`} />
          </Switch>
        </div>
      </GameContext.Provider>
    </Router>
  );
};

export default App;
