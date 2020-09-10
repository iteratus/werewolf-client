import React from "react";
import Logo from "../Logo";

import styles from "./Header.module.scss";

const Header = (): JSX.Element => (
  <div className={styles.header}>
    <Logo />
  </div>
);

export default Header;
