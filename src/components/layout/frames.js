import React from "react";
import { useWindow } from "@ibrahimstudio/react";
import Navbar from "../navigation/navbar";
import Footer from "../navigation/footer";

export const Container = ({ id, isasChild = false, display = "flex", flex = "unset", cwidth = "unset", maxWidth = "unset", minWidth = "unset", alignSelf = "stretch", overflow = "hidden", padding = "unset", gap = "var(--pixel-25)", direction = "column", alignItems = "flex-start", justifyContent = "flex-start", isWrap = false, isWrapReverse = false, backgroundColor = "transparent", children }) => {
  const { width } = useWindow();
  const sectionid = `${id}-section`;
  const sectionstyles = { alignSelf, overflow, display, flex, width: cwidth, minWidth, maxWidth, flexDirection: isWrap ? "row" : direction, flexWrap: isWrap ? (isWrapReverse ? "wrap-reverse" : "wrap") : "unset", alignItems, justifyContent, padding: isasChild ? padding : width <= 910 ? (width > 700 ? "var(--pixel-20) var(--pixel-30)" : "var(--pixel-20)") : "var(--pixel-20) var(--pixel-70)", gap, backgroundColor };

  return (
    <section id={sectionid} style={sectionstyles}>
      {React.Children.map(children, (child) => {
        return React.isValidElement(child) ? React.cloneElement(child, { id: sectionid }) : child;
      })}
    </section>
  );
};

const Page = ({ pageid, type = "public", children }) => {
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

export default Page;
