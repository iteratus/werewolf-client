import React, {useState, createRef, FormEvent, useEffect, useContext} from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import styles from "./Room.module.scss";
import { henloServer, enterRoom } from "../../contexts/sockets/emit";
import GameContext from "../../contexts/GameContext";
import i18n from 'i18next';

interface RoomMatchParams {
  roomId: string;
}

interface RoomProps extends RouteComponentProps<RoomMatchParams> { }

const Room = (props: RoomProps): JSX.Element => {
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
      {
        room.connectedUsers && room.connectedUsers.length > 0 && (
          <>
            <p>{i18n.t('page.room.userList')}</p>
            <ul>
              {room.connectedUsers.map((user:string) => <li>{user}</li> )}
            </ul>
          </>
        )
      }
      <form onSubmit={sendMessage}>
        <div className={styles.choose}>
          Henlo {localStorage.getItem("username")}
        </div>
        <ul>
          <li>
            <label htmlFor="message">Message</label>
            <input
              id="message"
              ref={inputRef}
              type="text"
              value={message}
              onChange={() => {
                setMessage(inputRef.current ? inputRef.current.value : "");
              }}
            />
          </li>
          <li>
            <button type="submit">Send</button>
          </li>
        </ul>
      </form>
    </main>
  );
};

export default withRouter(Room);
