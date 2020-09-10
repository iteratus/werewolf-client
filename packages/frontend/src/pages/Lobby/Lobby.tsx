import React, {useState, createRef, FormEvent, useEffect, useContext} from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import styles from "./Lobby.module.scss";
import { henloServer, joinSession } from "../../contexts/sockets/emit";
import GameContext from "../../contexts/GameContext";

interface LobbyMatchParams {
  sessionId: string;
}

interface LobbyProps extends RouteComponentProps<LobbyMatchParams> { }

const Lobby = (props: LobbyProps): JSX.Element => {
  const inputRef = createRef<HTMLInputElement>();

  const [message, setMessage] = useState("");
  const { session } = useContext(GameContext);

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();

    if (inputRef.current && inputRef.current.value !== "") {
      henloServer(message);
    }
  };

  useEffect(() => {
    const currentSessionId = props.match.params.sessionId;
    const storedSessionId = localStorage.getItem("sessionId");

    if (currentSessionId !== storedSessionId) {
      localStorage.setItem("sessionId", currentSessionId);
    }

    joinSession();
  }, [props.match.params.sessionId]);

  return (
    <main>
      {
        session.connectedUsers && session.connectedUsers.length > 0 && (
          <>
            <p>Current connected users</p>
            <ul>
              {session.connectedUsers.map((user:string) => <li>{user}</li> )}
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

export default withRouter(Lobby);
