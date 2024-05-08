import React from "react";
import { Navbar } from "../navigators/navbar";
import { Footer } from "../navigators/footer";

export const PageLayout = ({ pageid, children }) => {
  const styles = {
    width: "100%",
    position: "relative",
    paddingTop: "var(--pixel-140)",
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
      <Footer id={pageid} />
    </main>
  );
};
