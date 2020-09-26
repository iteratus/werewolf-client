import React, { createRef, FormEvent, useContext, useState } from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import GameContext from "../../contexts/GameContext";
import Button from "../../components/Button";
import i18n from 'i18next';

import styles from "./User.module.scss";

const User = (props: RouteComponentProps): JSX.Element => {
  const inputRef = createRef<HTMLInputElement>();
  const buttonRef = createRef<HTMLInputElement>();

  const [username, setUsername] = useState("");
  const { setUsername: setContextUsername } = useContext(GameContext);

  const saveChanges = (event: FormEvent) => {
    event.preventDefault();

    if (inputRef.current && inputRef.current.value !== "") {
      localStorage.setItem("username", inputRef.current.value);
      setContextUsername(inputRef.current.value);
    }
  };

  const handleButtonClick = () => {
    if (buttonRef.current && buttonRef.current.type === 'submit')
      console.log('hier gehts weiter!');
  }

  return (
    <main className={styles.user}>
      <form onSubmit={saveChanges} className={styles.form}>
        <div>{i18n.t('page.user.identify')}</div>
        <ul>
          <li>
            <label htmlFor="username">
              {i18n.t('page.user.label.username')}
              <input
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
          <li className={styles.center}>
            <Button
              ariaLabel='submit'
              children={i18n.t('page.user.play')}
              onClick={handleButtonClick}
              ref={buttonRef}
              type="submit"
            />
          </li>
        </ul>
      </form>
    </main>
  );
};

export default withRouter(User);
