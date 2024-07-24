import React from "react";
import { useContent } from "@ibrahimstudio/react";
import { Image } from "../components/contents/image";
import styles from "./styles/ads-section.module.css";

export const AdsSection = ({ id, label, src }) => {
  const { toTitleCase, toPathname } = useContent();
  const compid = label ? `${id}-ads-section-${toPathname(label)}` : `${id}-ads-section`;
  const adslabel = label ? toTitleCase(label) : "";

  return (
    <section id={compid} className={styles.adsSection}>
      <Image className={styles.adsContent} alt={adslabel} src={src} />
    </section>
  );
};
