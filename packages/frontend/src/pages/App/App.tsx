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
import Welcome from "pages/Welcome";
import RoomPage from "pages/Room";

import styles from "pages/App/App.module.scss";
import Room from "interfaces/Room";

const App = (): JSX.Element => {
  const storedUsername = localStorage.getItem("username");

  const [username, setUsername] = useState(storedUsername || "");
  const [room, setRoom] = useState({ connectedUsers: Array<string>(), phase: "" });

  const socketCallback = (socketRoom: Room) => {
    if (socketRoom.phase === "") {
      socketRoom.phase = room.phase
    }
    setRoom(socketRoom)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => initSockets(socketCallback), []);


  return (
    <Router>
      <SocketContext.Provider value={{ room, setRoom }}>
        <GameContext.Provider value={{ username, setUsername, room, setRoom }}>
          <div className={styles.app}>
            <div className={styles.contentWrapper}>
              <Header />
                { username === "" ? <Welcome /> : (
                  <Switch>
                    <Route exact path="/:roomId" component={RoomPage} />
                    <Redirect to={`/${randomString()}`} />
                  </Switch>
                ) }
            </div>
          </div>
        </GameContext.Provider>
      </SocketContext.Provider>
    </Router>
  );
};

export default App;
