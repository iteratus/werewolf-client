import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import randomString from "random-string";

import Header from "./components/Header";
import Welcome from "./pages/Welcome";

import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Switch>
          <Route exact path="/:session" component={Welcome} />
          <Redirect to={`/${randomString()}`} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
