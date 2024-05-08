import React from "react";
import { TagsButton } from "../userInputs/buttons/tags-button";
import styles from "./styles/tags-section.module.css";

export const TagsSection = ({ id, tags }) => {
  const compid = `tags-${id}`;

  return (
    <section id={compid} className={styles.tagsSection}>
      <div className={styles.tagsContent}>
        {tags.map((tag, index) => (
          <TagsButton
            key={index}
            id={`${compid}-${tag.value}`}
            text={tag.label}
          />
        ))}
      </div>
    </section>
  );
};
