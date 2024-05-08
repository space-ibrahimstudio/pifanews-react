import React from "react";
import styles from "./styles/tags-button.module.css";

export const TagsButton = ({ id, text, onClick }) => {
  const compid = `tag-${id}`;

  return (
    <button id={compid} className={styles.tagsButton} onClick={onClick}>
      <b className={styles.tagsButtonText}>{text}</b>
    </button>
  );
};
