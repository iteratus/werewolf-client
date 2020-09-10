import React from "react";
import logoImg from "./img/logo.svg";

import styles from "./Logo.module.scss";

const Logo = (): JSX.Element => (
  <a href="/">
    <img className={styles.logo} alt="Logo" src={logoImg} />
  </a>
);

export default Logo;
