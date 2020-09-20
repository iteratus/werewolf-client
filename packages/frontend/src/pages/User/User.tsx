import React, { createRef, FormEvent, useContext, useState } from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import GameContext from "../../contexts/GameContext";

import styles from "./User.module.scss";

const User = (props: RouteComponentProps): JSX.Element => {
  const userInputRef = createRef<HTMLInputElement>();
  const LobbyInputRef = createRef<HTMLInputElement>();

  const [username, setUsername] = useState("");
  const [lobby, setLobby] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const { setUsername: setContextUsername} = useContext(GameContext);

  const saveChanges = (event: FormEvent) => {
    event.preventDefault();

    if (userInputRef.current && userInputRef.current.value !== "") {
      localStorage.setItem("username", userInputRef.current.value);
      setContextUsername(userInputRef.current.value);
    }
  };

  return (
    <main className={styles.user}>
      <form onSubmit={saveChanges}>
        <div>
          We would like to know who we will kill soon. So please identify
          yourself.
        </div>
        <ul>
          <li>
            <label htmlFor="username">
              Username
              <input
                id="username"
                ref={userInputRef}
                type="text"
                value={username}
                onChange={() => {
                  setUsername(userInputRef.current ? userInputRef.current.value : "");
                }}
              />
            </label>
          </li>
          <li>
            <button type="submit">Create new Lobby</button>
          </li>
          <li>
            <button onClick={() => {setIsHidden(false)}}>Join existing Lobby</button>
          </li>
          <li className={isHidden ? styles.isHidden : styles.isVisible}>
            <label htmlFor="lobby">
              Lobby
              <input
                id="lobby"
                ref={LobbyInputRef}
                type="text"
                value={lobby}
                onChange={() => {
                  setLobby(LobbyInputRef.current ? LobbyInputRef.current.value : "");
                }}
              />
            </label>
          </li>
        </ul>
      </form>
    </main>
  );
};

export default withRouter(User);
