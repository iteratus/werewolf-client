import React from "react";
import classNames from "classnames";

import styles from "./Fog.module.scss";

const Fog = (): JSX.Element => {
  const fogContent = <div className={styles.fog_graphic} />;

  const createFog = () => {
    return React.createElement(
      "div",
      { className: classNames(styles.fog) },
      fogContent
    );
  };

  return <div className={styles.fog_wrapper}>{createFog()}</div>;
};

export default Fog;
