import React from "react";
import { SourceButton } from "../../userInputs/buttons/source-button";
import styles from "./styles/section-head.module.css";

export const SectionHead = ({ id, title, prior, to }) => {
  return (
    <header id={`section-head-${id}`} className={styles.sectionHead}>
      <div className={styles.sectionTitlewrap}>
        <h1 className={styles.sectionTitle}>
          <span>{`${title} `}</span>
          <span className={styles.textHint}>{prior}</span>
        </h1>
      </div>
      <SourceButton id={`section-head-${id}`} to={to} />
    </header>
  );
};
