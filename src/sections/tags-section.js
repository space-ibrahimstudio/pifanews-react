import React from "react";
import { useNavigate } from "react-router-dom";
import { TagsButton } from "../components/user-inputs/buttons";
import styles from "./styles/tags-section.module.css";

export const TagsSection = ({ id, tags }) => {
  const compid = `${id}-tags-section`;
  const navigate = useNavigate();

  return (
    <section id={compid} className={styles.tagsSection}>
      <div className={styles.tagsContent}>
        {tags.map((tag, index) => (
          <TagsButton key={index} id={`${compid}-${tag.slug}`} text={tag.nama_kategori_tag} onClick={() => navigate(`/topic/${tag.slug}`)} />
        ))}
      </div>
    </section>
  );
};
