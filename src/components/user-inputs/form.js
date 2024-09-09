import React from "react";
import styles from "./styles/form.module.css";

export const FormFieldset = ({ startContent, endContent, children }) => {
  return (
    <section className={styles.formFieldset}>
      {startContent && <span className={styles.fieldsetText}>{startContent}</span>}
      {children}
      {endContent && <span className={styles.fieldsetText}>{endContent}</span>}
    </section>
  );
};

export const FormHead = ({ title, desc }) => {
  return (
    <header className={styles.formHead}>
      <h1 className={styles.formTitle}>{title}</h1>
      <p className={styles.formDesc}>{desc}</p>
    </header>
  );
};

export const SubmitForm = ({ minW = "unset", maxW = "unset", onSubmit, children }) => {
  const editorstyles = { flex: "1", minWidth: minW, maxWidth: maxW, borderRadius: "var(--pixel-20)", backgroundColor: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "var(--pixel-20)", gap: "var(--pixel-15)" };
  return (
    <form style={editorstyles} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

const Form = ({ onSubmit, children }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
