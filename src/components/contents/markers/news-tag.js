import React from "react";
import styles from "./styles/news-tag.module.css";

export const NewsTag = ({ id, name }) => {
  const compid = `news-tag-${id}`;

  return (
    <div id={compid} className={styles.cardLabel}>
      <div className={styles.cardLabelText}>{name}</div>
    </div>
  );
};
