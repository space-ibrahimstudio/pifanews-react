import React from "react";
import { useContent } from "@ibrahimstudio/react";
import styles from "./styles/form.module.css";

export const FormFieldset = ({ id, startContent, endContent, children }) => {
  const compid = `${id}-fieldset`;

  return (
    <section id={compid} className={styles.formFieldset}>
      {startContent && <span className={styles.fieldsetText}>{startContent}</span>}
      {children}
      {endContent && <span className={styles.fieldsetText}>{endContent}</span>}
    </section>
  );
};

export const FormHead = ({ id, title, desc }) => {
  const { toPathname } = useContent();
  const compid = `${id}-${toPathname(title)}`;

  return (
    <header id={compid} className={styles.formHead}>
      <h1 className={styles.formTitle}>{title}</h1>
      <p className={styles.formDesc}>{desc}</p>
    </header>
  );
};

const Form = ({ id, as = "submission", minW = "unset", maxW = "unset", onSubmit, children }) => {
  const compid = `${id}-${as}-form`;
  const subsstyles = { flex: "1", minWidth: minW, maxWidth: maxW, borderRadius: "var(--pixel-20)", backgroundColor: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "var(--pixel-20)", gap: "var(--pixel-15)" };
  const prtlstyles = { margin: "0", width: "100%", borderRadius: "var(--pixel-20)", backgroundColor: "var(--color-secondlight)", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "var(--pixel-30) var(--pixel-20)", boxSizing: "border-box", gap: "var(--pixel-30)", maxWidth: "var(--pixel-500)" };

  return (
    <form id={compid} style={as === "portal" ? prtlstyles : subsstyles} onSubmit={onSubmit}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { id: compid });
      })}
    </form>
  );
};

export default Form;
