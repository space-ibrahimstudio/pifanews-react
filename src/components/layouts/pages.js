import React from "react";
import { Navbar } from "../navigators/navbar";
import { Footer } from "../navigators/footer";

export const PageLayout = ({ pageid, type = "public", children }) => {
  const pagestyles = { width: "100%", position: "relative", paddingTop: "var(--pixel-140)", backgroundColor: "var(--color-foreground)", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" };
  return (
    <main id={pageid} style={pagestyles}>
      <Navbar id={pageid} parentType={type} />
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { id: pageid });
      })}
      <Footer id={pageid} />
    </main>
  );
};
