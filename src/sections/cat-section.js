import React from "react";
import { SectionHead } from "../components/contents/markers";
import { CatCard } from "../components/contents/cards";
import styles from "./styles/cat-section.module.css";

export const CatSection = ({ id, cats }) => {
  const compid = `${id}-category-section`;
  const slicedcats = cats.slice(0);

  return (
    <section id={compid} className={styles.newsSection}>
      <SectionHead id={compid} title="Kategori Berita" prior="Kabar Daerah" noSource={true} />
      <div className={styles.sectionBody}>
        {slicedcats.map((category, index) => (
          <CatCard id={compid} key={index} catname={category.name} image={category.image} />
        ))}
      </div>
    </section>
  );
};
