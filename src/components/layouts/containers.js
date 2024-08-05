import React from "react";
import { useWindow } from "@ibrahimstudio/react";

const Container300 = ({ children }) => {
  const divstyle = { flex: "1", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center", minWidth: "var(--pixel-300)" };
  return <div style={divstyle}>{children}</div>;
};

export const Aside = ({ children }) => {
  const { width } = useWindow();
  const asicss = { flex: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: "var(--pixel-300)", maxWidth: width >= 464 ? "var(--pixel-400)" : "unset", gap: "var(--pixel-10)" };
  return <div style={asicss}>{children}</div>;
};

export default Container300;
