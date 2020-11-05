import React, { createRef, useContext, useState } from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import GameContext from "contexts/GameContext";
import i18n from 'i18next';

import styles from "./Welcome.module.scss";

interface WelcomeMatchParams {
  roomId?: string;
}

interface WelcomeProps extends RouteComponentProps<WelcomeMatchParams> { }

const Welcome = (props: WelcomeProps): JSX.Element => {
  const userInputRef = createRef<HTMLInputElement>();

  const [username, setUsername] = useState("");

  const { setUsername: setContextUsername} = useContext(GameContext);

  const handleJoin = () => {
    if (userInputRef.current && userInputRef.current.value !== "") {
      localStorage.setItem("username", userInputRef.current.value);
      setContextUsername(userInputRef.current.value);
    }
  }

    return (
      <main className={styles.user}>
        <form  className={styles.userForm} onSubmit={handleJoin}>
          <div className={styles.userInfo}>{i18n.t('page.welcome.identify')}</div>
          <ul>
            <li>
              <label htmlFor="username">
                {i18n.t('page.welcome.label.username')}
                <input
                  id="username"
                  className={styles.userInput}
                  ref={userInputRef}
                  type="text"
                  placeholder={i18n.t('page.welcome.input.username')}
                  value={username}
                  onChange={() => {
                    setUsername(userInputRef.current ? userInputRef.current.value : "");
                  }}
                />
              </label>
            </li>
            <li>
              <button className={styles.userButton} onClick={() => { handleJoin(); }}>{i18n.t('page.welcome.joinRoom')}</button>
            </li>
          </ul>
        </form>
      </main>
    );
};

export default withRouter(Welcome);
