import React from "react";
import { TagsButton } from "../userInputs/buttons/tags-button";
import styles from "./styles/tags-section.module.css";

export const TagsSection = ({ id, tags }) => {
  return (
    <section id={`tags-${id}`} className={styles.tagsSection}>
      <div className={styles.tagsContent}>
        {tags.map((tag, index) => (
          <TagsButton
            key={index}
            id={`tags-${id}-${tag.value}`}
            text={tag.label}
          />
        ))}
      </div>
    </section>
  );
};
