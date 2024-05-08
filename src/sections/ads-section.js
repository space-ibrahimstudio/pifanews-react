import React from "react";
import styles from "./styles/ads-section.module.css";

export const AdsSection = ({ src }) => {
  return (
    <div className={styles.adsSection}>
      <img className={styles.adsContent} loading="lazy" alt="" src={src} />
    </div>
  );
};
