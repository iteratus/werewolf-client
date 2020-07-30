import React, { createRef, FormEvent, useContext, useState } from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import GameContext from "../../GameContext";

import styles from "./User.module.scss";

const User = (props: RouteComponentProps): JSX.Element => {
  const inputRef = createRef<HTMLInputElement>();

  const [username, setUsername] = useState("");
  const { setUsername: setContextUsername } = useContext(GameContext);

  const saveChanges = (event: FormEvent) => {
    event.preventDefault();

    if (inputRef.current && inputRef.current.value !== "") {
      localStorage.setItem("username", inputRef.current.value);
      setContextUsername(inputRef.current.value);
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
                ref={inputRef}
                type="text"
                value={username}
                onChange={() => {
                  setUsername(inputRef.current ? inputRef.current.value : "");
                }}
              />
            </label>
          </li>
          <li>
            <button type="submit">Play!</button>
          </li>
        </ul>
      </form>
    </main>
  );
};

export default withRouter(User);
