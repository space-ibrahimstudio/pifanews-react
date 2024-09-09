import React from "react";
import { useWindow } from "@ibrahimstudio/react";

const Container = ({ id, isasChild = false, display = "flex", flex = "unset", cwidth = "unset", maxWidth = "unset", minWidth = "unset", alignSelf = "stretch", overflow = "hidden", padding = "unset", gap = "var(--pixel-25)", direction = "column", alignItems = "flex-start", justifyContent = "flex-start", isWrap = false, isWrapReverse = false, backgroundColor = "transparent", children }) => {
  const { width } = useWindow();
  const sectionid = `${id}-section`;
  const sectionstyles = { alignSelf, overflow, display, flex, width: cwidth, minWidth, maxWidth, flexDirection: isWrap ? "row" : direction, flexWrap: isWrap ? (isWrapReverse ? "wrap-reverse" : "wrap") : "unset", alignItems, justifyContent, padding: isasChild ? padding : width <= 910 ? (width > 700 ? "var(--pixel-20) var(--pixel-30)" : "var(--pixel-20)") : "var(--pixel-20) var(--pixel-70)", gap, backgroundColor };

  return (
    <section id={sectionid} style={sectionstyles}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { id: sectionid });
      })}
    </section>
  );
};

export default Container;
