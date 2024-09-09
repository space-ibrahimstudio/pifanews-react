import React from "react";

export const CatGridSection = ({ id, isSingle = false, children }) => {
  const compid = `${id}-grid-cat-section`;
  const compcss = { alignSelf: "stretch", flex: "1", display: "grid", gridTemplateRows: isSingle ? "1fr" : "repeat(2, auto)", gridTemplateColumns: isSingle ? "1fr" : "repeat(auto-fill, minmax(var(--pixel-350), 1fr))", gap: "var(--pixel-10)" };

  return (
    <section id={compid} style={compcss}>
      {children}
    </section>
  );
};
