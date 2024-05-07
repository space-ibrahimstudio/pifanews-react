import React from "react";
import styles from "./styles/hero-section.module.css";

export const HeroSection = ({ id, children }) => {
  return (
    <section id={`hero-${id}`} className={styles.heroSection}>
      <div className={styles.heroContent}>{children}</div>
    </section>
  );
};
