import React, { createRef, FormEvent, useContext, useState } from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import GameContext from "../../contexts/GameContext";
import i18n from 'i18next';

import styles from "./Henlo.module.scss";

interface HenloMatchParams {
  roomId?: string;
}

interface HenloProps extends RouteComponentProps<HenloMatchParams> { }

const Henlo = (props: HenloProps): JSX.Element => {
  const userInputRef = createRef<HTMLInputElement>();
  const roomInputRef = createRef<HTMLInputElement>();

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(props.match.params.roomId);
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
        <div>{i18n.t('page.henlo.identify')}</div>
        <ul>
          <li>
            <label htmlFor="username">
              {i18n.t('page.henlo.label.username')}
              <input
                id="username"
                ref={userInputRef}
                type="text"
                placeholder={i18n.t('page.henlo.input.username')}
                value={username}
                onChange={() => {
                  setUsername(userInputRef.current ? userInputRef.current.value : "");
                }}
              />
            </label>
          </li>
          <li>
            <label htmlFor="room">
              Room
              <input
                id="room"
                ref={roomInputRef}
                type="text"
                value={room}
                onChange={() => {
                  setRoom(roomInputRef.current ? roomInputRef.current.value : "");
                }}
              />
            </label>
          </li>
          <li>
            <button>{i18n.t('page.henlo.joinRoom')}</button>
          </li>
        </ul>
      </form>
    </main>
  );
};

export default withRouter(Henlo);
