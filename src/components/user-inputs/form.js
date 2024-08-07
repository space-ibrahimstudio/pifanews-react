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

const Form = ({ onSubmit, children }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
