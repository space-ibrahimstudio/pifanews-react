import React, { Fragment } from "react";
import { useContent, useWindow } from "@ibrahimstudio/react";
import { Link } from "react-router-dom";
import { Image } from "../contents/image";
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
            <Link className={styles.cardTitle} style={{ color: "var(--color-primary)" }} to={path.url}>
              {path.label}
            </Link>
          )}
        </Fragment>
      ))}
    </section>
  );
};

export const PostdetAside = ({ children }) => {
  const { width } = useWindow();
  const asidestyle = { width: "100%", overflow: "hidden", display: "flex", flexDirection: width > 930 ? "column" : width <= 450 ? "column" : "row", alignItems: "flex-start", justifyContent: "center", maxWidth: width <= 930 ? "100%" : "var(--pixel-400)", gap: "var(--pixel-10)" };
  return <div style={asidestyle}>{children}</div>;
};

export const PostdetArticle = ({ id, title, loc, date, thumbnail, image, content, paths = [] }) => {
  const { width } = useWindow();
  const { toTitleCase } = useContent();
  const compid = `${id}-article-board`;
  const postloc = loc ? toTitleCase(loc) : "";

  return (
    <section style={{ flex: "1", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", gap: "var(--pixel-10)" }}>
      <Image style={{ width: "100%", height: width <= 700 ? "var(--pixel-250)" : "var(--pixel-400)", position: "relative", borderRadius: "var(--pixel-20)", overflow: "hidden" }} alt={thumbnail} src={`https://pifa.co.id/img_berita/${image}`} />
      <i style={{ position: "relative", color: "var(--color-secondary)", opacity: "0.5", fontFamily: "var(--font-inter)", fontSize: "var(--font-tiny)", fontWeight: "500", textAlign: "left", alignSelf: "stretch", marginLeft: "var(--pixel-20)" }}>{thumbnail}</i>
      <article id={compid} className={styles.postdetArticle}>
        <BreadCrumbs paths={paths} />
        <header className={styles.postdetHead}>
          <h1 className={styles.postdetTitle}>{title}</h1>
          <span className={styles.postdetDetail}>{`${postloc} | ${date}`}</span>
        </header>
        <div className={styles.postdetBody} dangerouslySetInnerHTML={{ __html: content }}></div>
      </article>
    </section>
  );
};

export const PostdetContent = ({ id, children }) => {
  const { width } = useWindow();
  const compid = `${id}-post-detail-content`;
  const contentstyle = { alignSelf: "stretch", overflow: "hidden", display: "flex", flexDirection: width > 930 ? "row" : "column", alignItems: "flex-start", justifyContent: "center", gap: "var(--pixel-10)", textAlign: "left" };
  return (
    <section id={compid} style={contentstyle}>
      {children}
    </section>
  );
};

const PostdetSection = ({ id, children }) => {
  const { width } = useWindow();
  const compid = `${id}-post-detail-section`;
  const sectionstyle = { alignSelf: "stretch", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: width > 910 ? "var(--pixel-20) var(--pixel-70)" : width > 700 ? "var(--pixel-20) var(--pixel-30)" : "var(--pixel-20)", gap: "var(--pixel-10)" };
  return (
    <section id={compid} style={sectionstyle}>
      {children}
    </section>
  );
};

export default PostdetSection;
