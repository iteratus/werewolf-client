import React, {
  useState,
  useEffect,
  createRef,
  FormEvent,
  useRef,
  useContext,
  MutableRefObject
} from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import SocketContext from "../../contexts/SocketContext";
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
    <main>
      <form onSubmit={sendMessage}>
        <div className={styles.choose}>Henlo werewolves</div>
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
