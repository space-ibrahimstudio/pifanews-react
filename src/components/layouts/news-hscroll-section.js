import React from "react";
import { SectionHead } from "../contents/markers/section-head";
import styles from "./styles/news-hscroll-section.module.css";

export const NewsHscrollSection = ({ id, title, prior, to, children }) => {
  return (
    <section id={`hscroll-news-${id}`} className={styles.newsHscrollSection}>
      <SectionHead
        id={`hscroll-news-${id}`}
        title={title}
        prior={prior}
        to={to}
      />
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
};
