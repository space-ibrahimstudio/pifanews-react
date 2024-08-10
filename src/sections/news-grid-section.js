import React, { Fragment, useRef, useEffect } from "react";
import { SectionHead, TextHint } from "../components/contents/markers";
import { LoadingContent } from "../components/contents/loader";
import styles from "./styles/news-grid-section.module.css";

export const NewsGridSection = ({ id, title, scope, children, setLimit, loading = false }) => {
  const ref = useRef(null);
  const compid = `${id}-grid-news-section`;

  const handleScroll = () => {
    if (ref.current) {
      const { scrollTop, clientHeight } = document.documentElement;
      const sectionBottom = ref.current.offsetTop + ref.current.clientHeight;
      if (scrollTop + clientHeight >= sectionBottom - 5 && !loading) {
        setLimit((prevLimit) => prevLimit + 12);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <section ref={ref} id={compid} className={styles.newsHscrollSection}>
      {/* prettier-ignore */}
      <SectionHead id={compid} title={<Fragment>{`${title} `}<TextHint>{scope}</TextHint></Fragment>} noSource />
      <div className={styles.sectionBody}>{children}</div>
      {loading && <LoadingContent />}
    </section>
  );
};
