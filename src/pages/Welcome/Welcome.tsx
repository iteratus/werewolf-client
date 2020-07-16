import React from "react";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";

import styles from "./Welcome.module.scss";

const Welcome: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <div className={styles.choose}>Hello werewolves</div>
    </>
  );
};

export default withRouter(Welcome);
