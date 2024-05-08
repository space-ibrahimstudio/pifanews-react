import React from "react";
import { SectionHead } from "../contents/markers/section-head";
import styles from "./styles/news-hscroll-section.module.css";

export const NewsHscrollSection = ({ id, title, prior, to, children }) => {
  const compid = `hscroll-news-${id}`;

  return (
    <section id={compid} className={styles.newsHscrollSection}>
      <SectionHead id={compid} title={title} prior={prior} to={to} />
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
};
