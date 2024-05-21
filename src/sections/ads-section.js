import React from "react";
import { useContent } from "@ibrahimstudio/react";
import styles from "./styles/ads-section.module.css";

export const AdsSection = ({ id, label, src }) => {
  const { toTitleCase, toPathname } = useContent();

  const compid = label ? `${id}-ads-section-${toPathname(label)}` : `${id}-ads-section`;
  const adslabel = label ? toTitleCase(label) : "";

  return (
    <section id={compid} className={styles.adsSection}>
      <img id={`${compid}-content`} className={styles.adsContent} loading="lazy" alt={adslabel} src={src} />
    </section>
  );
};
