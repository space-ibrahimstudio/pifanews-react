import React from "react";

export const Div300 = ({ children }) => {
  const divstyle = {
    flex: "1",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    minWidth: "var(--pixel-300)",
  };

  return <div style={divstyle}>{children}</div>;
};
