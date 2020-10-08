import React from "react";

import logoImg from "components/Logo/img/logo.svg";

import styles from "components/Logo/Logo.module.scss";

const Logo = (): JSX.Element => (
  <a href="/" className={styles.logo}>
    <img alt="Logo" src={logoImg} />
  </a>
);

export default Logo;
