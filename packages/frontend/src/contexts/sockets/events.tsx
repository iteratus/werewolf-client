import React, { Dispatch } from "react";
import { socket } from "./index";
import { ValueState } from "./index";

export const socketEvents = ({
  setValue
}: {
  setValue: React.Dispatch<React.SetStateAction<ValueState>>;
}) => {
  socket.on("queueLength", ({ queueLength }: { queueLength: number }) => {
    setValue(state => {
      return { ...state, queueLength };
    });
  });
  socket.on(
    "positionInLine",
    ({ positionInLine }: { positionInLine: number }) => {
      setValue(state => {
        return { ...state, positionInLine };
      });
    }
  );
};
