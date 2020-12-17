import React, {useState, createRef, FormEvent, useEffect, useContext} from "react";
import {withRouter} from "react-router";
import {RouteComponentProps} from "react-router-dom";
import styles from "./Room.module.scss";
import {henloServer, enterRoom} from "contexts/sockets/emit";
import GameContext from "contexts/GameContext";
import i18n from 'i18next';
import sequence from 'werewolf-ruleset/sequence.json';

interface RoomMatchParams {
  roomId: string;
}

interface RoomProps extends RouteComponentProps<RoomMatchParams> {
}

const Room = (props: RoomProps): JSX.Element => {
  const inputRef = createRef<HTMLInputElement>();

  const [message, setMessage] = useState("");
  const {username, room} = useContext(GameContext);
  const [sequenceStep, setSequenceStep] = useState(0);

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();

    if (inputRef.current && inputRef.current.value !== "") {
      henloServer(message);
    }
  };

  const avatarBaseUrl = 'http://localhost:8666/avatar'

  useEffect(() => {
    const currentRoomId = props.match.params.roomId;
    const storedRoomId = localStorage.getItem("roomId");

    if (currentRoomId !== storedRoomId) {
      localStorage.setItem("roomId", currentRoomId);
    }

    username && enterRoom();
  }, [props.match.params.roomId, username]);

  const sequenceLooper = () => {
    console.log(`Current phase: ${Object.keys(sequence[sequenceStep % sequence.length])[0]}`)
    setSequenceStep(sequenceStep + 1);
  }

    return (
      <main>
        <div className={styles.welcome}>
          Henlo {localStorage.getItem("username")}
        </div>
        {
          room.connectedUsers && room.connectedUsers.length > 0 && (
            <div className={styles.userList}>
            <p>{i18n.t('page.room.userList')}</p>
              <ul>
                {room.connectedUsers.map((user: string) =>  <li className={styles.singleUser}>
                  <img alt='adorable user avatar' className={styles.userImage} src={`${avatarBaseUrl}/${user}`} />
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
                placeholder={"Write something..."}
                value={message}
                onChange={() => {
                  setMessage(inputRef.current ? inputRef.current.value : "");
                }}
              />
            </li>
            <li>
              <button className={styles.messageButton} type="submit">Send</button>
              <button className={styles.sequenceButton} onClick={sequenceLooper}>Next sequence</button>
            </li>
          </ul>
        </form>
      </main>
    );
};

export default withRouter(Room);
