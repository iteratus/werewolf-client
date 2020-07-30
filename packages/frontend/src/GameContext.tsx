import { createContext } from "react";

const DataContext = createContext({
  username: "",
  setUsername: (value: string) => {}
});

export default DataContext;
