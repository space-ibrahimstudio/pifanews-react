import React from "react";
import { SectionHead } from "../contents/markers/section-head";
import { CatCard } from "../contents/cards/cat-card";
import styles from "./styles/cat-section.module.css";

export const CatSection = ({ id, cats }) => {
  const slicedcats = cats.slice(0, 8);

  return (
    <section id={`category-${id}`} className={styles.newsSection}>
      <SectionHead
        id={`category-${id}`}
        title="Kategori Berita"
        prior="Lokal"
        to="/lokal"
      />
      <div className={styles.sectionBody}>
        {slicedcats.map((category, index) => (
          <CatCard
            key={index}
            id={`category-${id}-${index}`}
            catname={category.name}
            image={category.image}
          />
        ))}
      </div>
    </section>
  );
};
