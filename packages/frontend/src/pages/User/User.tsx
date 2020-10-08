import React, { createRef, FormEvent, useContext, useState } from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import GameContext from "contexts/GameContext";
import i18n from 'i18next';

import styles from "pages/User/User.module.scss";

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
      <form className={styles.userForm} onSubmit={saveChanges}>
      <div className={styles.userInfo}>{i18n.t('page.user.identify')}</div>
        <ul>
          <li>
            <label htmlFor="username">
              {i18n.t('page.user.label.username')}
              <input
                className={styles.userInput}
                id="username"
                ref={inputRef}
                type="text"
                placeholder={i18n.t('page.user.input.username')}
                value={username}
                onChange={() => {
                  setUsername(inputRef.current ? inputRef.current.value : "");
                }}
              />
            </label>
          </li>
          <li>
            <button className={styles.userButton} type="submit">{i18n.t('page.user.play')}</button>
          </li>
        </ul>
      </form>
    </main>
  );
};

export default withRouter(User);
