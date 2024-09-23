import React from "react";

const Fieldset = ({ id, gap = "var(--pixel-10)", children }) => {
  const compid = `${id}-fieldset`;
  const basestyles = { display: "flex", flexDirection: "row", alignItems: "flex-start", gap };
  const wrapstyles = { alignSelf: "stretch", justifyContent: "center", textAlign: "left", fontSize: "var(--font-sm)", color: "var(--color-hint)", fontFamily: "var(--font-inter)" };
  const bodystyles = { flex: "1", flexWrap: "wrap", justifyContent: "flex-start" };

  return (
    <section id={compid} style={{ ...basestyles, ...wrapstyles }}>
      <div style={{ ...basestyles, ...bodystyles }}>
        {React.Children.map(children, (child) => {
          return React.isValidElement(child) ? React.cloneElement(child, { id: compid }) : child;
        })}
      </div>
    </section>
  );
};

export default Fieldset;
