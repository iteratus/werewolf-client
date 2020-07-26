import React, {
  useState,
  useEffect,
  createRef,
  FormEvent,
  useRef,
  MutableRefObject
} from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";

import styles from "./Lobby.module.scss";

const Lobby = (props: RouteComponentProps): JSX.Element => {
  const ws: MutableRefObject<WebSocket | undefined> = useRef();
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8668/ws");
    ws.current.onopen = () => {
      console.log("connected");
      ws.current && ws.current.send("henlo werewolves");
    };

    ws.current.onmessage = event => {
      console.log(event.data);
    };

    ws.current.onclose = () => {
      console.log("disconnected");
    };
  }, []);

  const inputRef = createRef<HTMLInputElement>();

  const [message, setMessage] = useState("");

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();

    if (inputRef.current && inputRef.current.value !== "") {
      ws.current && ws.current.send(inputRef.current.value);
    }
  };

  return (
    <main className={styles.lobby}>
      <form onSubmit={sendMessage}>
        <div className={styles.choose}>Henlo werewolves</div>
        <ul>
          <li>
            <label htmlFor="message">
              Username
              <input
                id="message"
                ref={inputRef}
                type="text"
                value={message}
                onChange={() => {
                  setMessage(inputRef.current ? inputRef.current.value : "");
                }}
              />
            </label>
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
