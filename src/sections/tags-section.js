import React from "react";
import { TagsButton } from "../components/user-inputs/buttons";
import styles from "./styles/tags-section.module.css";

export const TagsSection = ({ id, tags }) => {
  const compid = `${id}-tags-section`;
  return (
    <section id={compid} className={styles.tagsSection}>
      <div className={styles.tagsContent}>
        {tags.map((tag, index) => (
          <TagsButton key={index} id={`${compid}-${tag.value}`} text={tag.label} />
        ))}
      </div>
    </section>
  );
};
