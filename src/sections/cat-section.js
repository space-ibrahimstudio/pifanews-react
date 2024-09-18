import React, { Fragment } from "react";
import { SectionHead, TextHint } from "../components/contents/markers";
import { CatCard } from "../components/layout/cards";
import styles from "./styles/cat-section.module.css";

export const CatSection = ({ id, cats }) => {
  const compid = `${id}-category-section`;
  const slicedcats = cats.slice(0);

  return (
    <section id={compid} className={styles.newsSection}>
      {/* prettier-ignore */}
      <SectionHead id={compid} noSource title={<Fragment>{`Kategori Berita `}<TextHint>Kabar Daerah</TextHint></Fragment>} />
      <div className={styles.sectionBody}>
        {slicedcats.map((category, index) => (
          <CatCard id={compid} key={index} catname={category.name} image={category.image} />
        ))}
      </div>
    </section>
  );
};
