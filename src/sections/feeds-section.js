import React from "react";
import styles from "./styles/feeds-section.module.css";

export const FeedsSection = ({ id, children }) => {
  const compid = `${id}-feeds-section`;
  return (
    <section id={compid} className={styles.feedsSection}>
      <div className={styles.feedsContent}>{children}</div>
    </section>
  );
};
