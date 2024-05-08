import React from "react";
import { SourceButton } from "../../userInputs/buttons/source-button";
import styles from "./styles/section-head.module.css";

export const SectionHead = ({ id, title, prior, to }) => {
  const compid = `section-head-${id}`;

  return (
    <header id={compid} className={styles.sectionHead}>
      <div className={styles.sectionTitlewrap}>
        <h1 className={styles.sectionTitle}>
          <span>{`${title} `}</span>
          <span className={styles.textHint}>{prior}</span>
        </h1>
      </div>
      <SourceButton id={compid} to={to} />
    </header>
  );
};
