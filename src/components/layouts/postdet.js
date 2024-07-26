import React, { Fragment } from "react";
import { useContent, useWindow } from "@ibrahimstudio/react";
import { Link } from "react-router-dom";
import styles from "./styles/postdet-article.module.css";

export const BreadCrumbs = ({ paths = [] }) => {
  return (
    <section className={styles.postdetNav}>
      {paths.map((path, index) => (
        <Fragment key={index}>
          {index < paths.length - 1 ? (
            <Fragment>
              <Link className={styles.cardTitle} to={path.url}>
                {path.label}
              </Link>
              <img className={styles.unionIcon} alt="" src="/svg/chevron-right.svg" />
            </Fragment>
          ) : (
            <Link className={styles.cardTitle} to={path.url}>
              {path.label}
            </Link>
          )}
        </Fragment>
      ))}
    </section>
  );
};

export const PostdetArticle = ({ id, title, loc, date, content, paths = [] }) => {
  const { toTitleCase } = useContent();
  const compid = `${id}-article-board`;
  const postloc = loc ? toTitleCase(loc) : "";

  return (
    <article id={compid} className={styles.postdetArticle}>
      <BreadCrumbs paths={paths} />
      <header className={styles.postdetHead}>
        <h1 className={styles.postdetTitle}>{title}</h1>
        <span className={styles.postdetDetail}>{`${postloc} | ${date}`}</span>
      </header>
      <div className={styles.postdetBody} dangerouslySetInnerHTML={{ __html: content }}></div>
    </article>
  );
};

export const PostdetContent = ({ id, children }) => {
  const compid = `${id}-post-detail-content`;
  const contentstyle = { alignSelf: "stretch", overflow: "hidden", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "center", gap: "var(--pixel-10)", textAlign: "left" };
  return (
    <section id={compid} style={contentstyle}>
      {children}
    </section>
  );
};

const PostdetSection = ({ id, children }) => {
  const { width } = useWindow();
  const compid = `${id}-post-detail-section`;
  const sectionstyle = { alignSelf: "stretch", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: width <= 910 > 700 ? "var(--pixel-20) var(--pixel-30)" : width <= 700 ? "var(--pixel-20)" : "var(--pixel-20) var(--pixel-70)", gap: "var(--pixel-10)" };
  return (
    <section id={compid} style={sectionstyle}>
      {children}
    </section>
  );
};

export default PostdetSection;
