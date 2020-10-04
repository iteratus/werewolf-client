import React, {useState, createRef, FormEvent, useEffect, useContext} from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { henloServer, enterRoom } from "contexts/sockets/emit";
import GameContext from "contexts/GameContext";
import i18n from 'i18next';

import styles from "pages/Lobby/Lobby.module.scss";

interface LobbyMatchParams {
  roomId: string;
}

interface LobbyProps extends RouteComponentProps<LobbyMatchParams> { }

const Lobby = (props: LobbyProps): JSX.Element => {
  const inputRef = createRef<HTMLInputElement>();

  const [message, setMessage] = useState("");
  const { room } = useContext(GameContext);

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();

    if (inputRef.current && inputRef.current.value !== "") {
      henloServer(message);
    }
  };

  useEffect(() => {
    const currentRoomId = props.match.params.roomId;
    const storedRoomId = localStorage.getItem("roomId");

    if (currentRoomId !== storedRoomId) {
      localStorage.setItem("roomId", currentRoomId);
    }

    enterRoom();
  }, [props.match.params.roomId]);

  return (
    <main>
      <div className={styles.welcome}>
        Henlo {localStorage.getItem("username")}
      </div>
      {
        room.connectedUsers && room.connectedUsers.length > 0 && (
          <div className={styles.userList}>
            <p>{i18n.t('page.lobby.userList')}</p>
            <ul>
              {room.connectedUsers.map((user:string) =>
                <li className={styles.singleUser}>
                  <img alt='adorable user avatar' className={styles.userImage} src={`https://api.adorable.io/avatars/${user}`} />
                  {user}
                </li> )}
            </ul>
          </div>
        )
      }
      <form className={styles.messageForm} onSubmit={sendMessage}>
        <ul>
          <li>
            <label htmlFor="message">Message</label>
            <input
              className={styles.messageInput}
              id="message"
              ref={inputRef}
              type="text"
              value={message}
              placeholder={"Write something..."}
              onChange={() => {
                setMessage(inputRef.current ? inputRef.current.value : "");
              }}
            />
          </li>
          <li>
            <button className={styles.messageButton} type="submit">Send</button>
          </li>
        </ul>
      </form>
    </main>
  );
};

export default withRouter(Lobby);
