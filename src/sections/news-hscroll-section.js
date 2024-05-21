import React from "react";
import { useContent } from "@ibrahimstudio/react";
import { SectionHead } from "../components/contents/markers";
import styles from "./styles/news-hscroll-section.module.css";

export const NewsHscrollSection = ({ id, title, prior, children }) => {
  const { toPathname } = useContent();
  const compid = title && prior ? `${id}-hscroll-news-section-${toPathname(title)}-${toPathname(prior)}` : `${id}-hscroll-news-section`;

  return (
    <section id={compid} className={styles.newsHscrollSection}>
      <SectionHead id={compid} title={title} prior={prior} />
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
};
