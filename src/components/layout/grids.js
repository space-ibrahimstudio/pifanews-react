import React from "react";

const Grid = ({ id, gridTemplateRows = "unset", gridTemplateColumns = "unset", flex = "unset", cwidth = "unset", maxWidth = "unset", minWidth = "unset", padding = "unset", gap = "var(--pixel-25)", backgroundColor = "transparent", children }) => {
  const sectionid = `${id}-grid`;
  const sectionstyles = { alignSelf: "stretch", display: "grid", gridTemplateRows, gridTemplateColumns, flex, width: cwidth, minWidth, maxWidth, padding, gap, backgroundColor };

  return (
    <section id={sectionid} style={sectionstyles}>
      {React.Children.map(children, (child) => {
        return React.isValidElement(child) ? React.cloneElement(child, { id: sectionid }) : child;
      })}
    </section>
  );
};

export default Grid;
