import React, { useState, createRef, FormEvent } from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import styles from "./Lobby.module.scss";
import { henloServer } from "../../contexts/sockets/emit";

const Lobby = (props: RouteComponentProps): JSX.Element => {
  const inputRef = createRef<HTMLInputElement>();

  const [message, setMessage] = useState("");

  const sendMessage = (event: FormEvent) => {
    event.preventDefault();

    if (inputRef.current && inputRef.current.value !== "") {
      henloServer(message);
    }
  };

  return (
    <main>
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
