import React from "react";
import styles from "./styles/news-tag.module.css";

export const NewsTag = ({ id, name }) => {
  return (
    <div id={`news-tag-${id}`} className={styles.cardLabel}>
      <div className={styles.cardLabelText}>{name}</div>
    </div>
  );
};
