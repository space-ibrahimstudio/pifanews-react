import React from "react";
import styles from "./styles/aside.module.css";

export const Aside = ({ children }) => {
  return <div className={styles.aside}>{children}</div>;
};
