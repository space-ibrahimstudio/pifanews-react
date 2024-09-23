import React from "react";

const Form = ({ id, as = "submission", minW = "unset", maxW = "unset", onSubmit, children }) => {
  const compid = `${id}-${as}-form`;
  const subsstyles = { flex: "1", minWidth: minW, maxWidth: maxW, borderRadius: "var(--pixel-20)", backgroundColor: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "var(--pixel-20)", gap: "var(--pixel-15)" };
  const prtlstyles = { margin: "0", width: "100%", borderRadius: "var(--pixel-20)", backgroundColor: "var(--color-secondlight)", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "var(--pixel-30) var(--pixel-20)", boxSizing: "border-box", gap: "var(--pixel-30)", maxWidth: "var(--pixel-500)" };

  return (
    <form id={compid} style={as === "portal" ? prtlstyles : subsstyles} onSubmit={onSubmit}>
      {React.Children.map(children, (child) => {
        return React.isValidElement(child) ? React.cloneElement(child, { id: compid }) : child;
      })}
    </form>
  );
};

export default Form;
