import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import randomString from "random-string";

import Header from "./components/Header";
import User from "./pages/User";
import Welcome from "./pages/Welcome";
import GameContext from "./GameContext";

import styles from "./App.module.scss";

const App = (): JSX.Element => {
  let MainApp = Welcome;

  const storedUsername = localStorage.getItem("username");

  if (!storedUsername) {
    MainApp = User;
  }

  const [username, setUsername] = useState(storedUsername || "");

  return (
    <Router>
      <GameContext.Provider value={{ username, setUsername }}>
        <div className={styles.app}>
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
