import React from "react";
import classNames from "classnames";

import styles from "./Fog.module.scss";

const Fog = (): JSX.Element => {
  const fogContent = <div className={styles.fog_graphic} />;

  const createFog = () => {
    const arrayOfFog = [];
    for (let step = 0; step <= 200; step += 1) {
      arrayOfFog.push(
        React.createElement(
          "div",
          { className: classNames(styles.fog) },
          fogContent
        )
      );
    }
    return arrayOfFog;
  };

  return <div className={styles.fog_wrapper}>{createFog()}</div>;
};

export default Fog;
