import React, { Dispatch } from "react";
import { socket } from "./index";
import { ValueState } from "./index";

export const socketEvents = ({
  setValue
}: {
  setValue: React.Dispatch<React.SetStateAction<ValueState>>;
}) => {
  //example only; do not use
  socket.on("queueLength", ({ queueLength }: { queueLength: number }) => {
    setValue(state => {
      return { ...state, queueLength };
    });
  });
  //example only; do not use
  socket.on(
    "positionInLine",
    ({ positionInLine }: { positionInLine: number }) => {
      setValue(state => {
        return { ...state, positionInLine };
      });
    }
  );

  socket.on("henloClient", (message: string) => {
    console.log(`server said: "${message}"`);
  });
};
