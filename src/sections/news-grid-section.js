import React, { Fragment } from "react";
import { SectionHead, TextHint } from "../components/contents/markers";
import styles from "./styles/news-grid-section.module.css";

export const NewsGridSection = ({ id, scope, children }) => {
  const compid = `${id}-grid-news-section`;

  return (
    <section id={compid} className={styles.newsHscrollSection}>
      {/* prettier-ignore */}
      <SectionHead id={compid} title={<Fragment>{`Berita `}<TextHint>{scope}</TextHint></Fragment>} noSource />
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
};
