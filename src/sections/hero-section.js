import React from "react";
import styles from "./styles/hero-section.module.css";

export const HeroSection = ({ id, children }) => {
  const compid = `${id}-hero-section`;

  return (
    <section id={compid} className={styles.heroSection}>
      <div className={styles.heroContent}>{children}</div>
    </section>
  );
};
