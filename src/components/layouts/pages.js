import React from "react";
import { Navbar } from "../navigators/navbar";

export const PageLayout = ({ pageid, children }) => {
  const styles = {
    width: "100%",
    position: "relative",
    paddingTop: "140px",
    backgroundColor: "var(--color-foreground)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  };

  return (
    <main id={pageid} style={styles}>
      <Navbar id={pageid} />
      {children}
    </main>
  );
};
