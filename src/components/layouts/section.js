import React from "react";
import styles from "./styles/section.module.css";

const Section = ({ id, children }) => {
  const compid = `${id}-section`;

  return (
    <section id={compid} className={styles.section}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { id: compid });
      })}
    </section>
  );
};

export default Section;
