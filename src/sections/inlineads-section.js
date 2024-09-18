import React from "react";
import { useContent } from "@ibrahimstudio/react";
import Image from "../components/media/image";
import styles from "./styles/inlineads-section.module.css";

export const InlineadsSection = ({ id, label, src }) => {
  const { toTitleCase, toPathname } = useContent();
  const compid = label ? `${id}-inline-ads-section-${toPathname(label)}` : `${id}-inline-ads-section`;
  const adslabel = label ? toTitleCase(label) : "";

  return (
    <section id={compid} className={styles.inlineadsSection}>
      <Image className={styles.inlineadsContent} alt={adslabel} src={src} />
    </section>
  );
};
