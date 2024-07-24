import React from "react";
import aside from "./styles/aside.module.css";

const Container300 = ({ children }) => {
  const divstyle = { flex: "1", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center", minWidth: "var(--pixel-300)" };
  return <div style={divstyle}>{children}</div>;
};

export const Aside = ({ children }) => {
  return <div className={aside.aside}>{children}</div>;
};

export default Container300;
