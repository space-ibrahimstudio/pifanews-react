import React from "react";

export const Aside = ({ children }) => {
  const layoutstyle = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "300px",
    maxWidth: "400px",
  };

  return <div style={layoutstyle}>{children}</div>;
};
