import React from "react";
import Logo from "components/Logo/Logo";

import styles from "components/Header/Header.module.scss";

const Header = (): JSX.Element => (
  <div className={styles.header}>
    <Logo />
  </div>
);

export default Header;
