import React, { Fragment } from "react";
import { useContent } from "@ibrahimstudio/react";
import { SectionHead, TextHint } from "../components/feedback/markers";
import styles from "./styles/news-hscroll-section.module.css";

export const NewsHscrollSection = ({ id, scope, children }) => {
  const { toPathname } = useContent();
  const compid = (scope && `${id}-hscroll-news-section-${toPathname(scope)}`) || `${id}-hscroll-news-section`;

  return (
    <section id={compid} className={styles.newsHscrollSection}>
      {/* prettier-ignore */}
      <SectionHead id={compid} title={<Fragment>{`Berita `}<TextHint>{scope}</TextHint></Fragment>} />
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
};
