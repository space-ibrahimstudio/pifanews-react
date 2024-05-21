import React from "react";
import { useContent } from "@ibrahimstudio/react";
import { SourceButton } from "../user-inputs/buttons";
import { NewsSummaryCard } from "./cards";
import styles from "./styles/news-group.module.css";
import summary from "./styles/news-summary-group.module.css";

const NewsGroup = ({ id, isPortrait, title, scope, posts }) => {
  const { toTitleCase, toPathname } = useContent();

  const compid = title && scope ? `${id}-news-group-${toPathname(title)}-${toPathname(scope)}` : `${id}-news-group`;
  const grouptitle = title ? toTitleCase(title) : "";
  const groupscope = scope ? toTitleCase(scope) : "";

  return (
    <section id={compid} className={`${styles.newsGroup} ${isPortrait ? "" : styles.landscape}`}>
      <header className={styles.groupHead}>
        <div className={styles.groupHeadwrap}>
          <div className={styles.groupTitlewrap}>
            <h1 className={styles.groupTitle}>
              <span>{`${grouptitle} di `}</span>
              <span className={styles.textHint}>{groupscope}</span>
            </h1>
          </div>
        </div>
      </header>
      <div className={`${styles.groupBodyVscroll} ${isPortrait ? styles.portrait : styles.landscape}`}>
        <div className={`${styles.groupBody} ${isPortrait ? styles.portrait : styles.landscape}`}>
          {posts.map((post, index) => (
            <NewsSummaryCard
              key={index}
              isPortrait={isPortrait}
              id={`${compid}-${index}`}
              title={post.title}
              tag={post.tag}
              image={post.image}
              loc={post.location}
              date={post.date}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const NewsSummaryGroup = ({ id, variant, isPortrait, title, posts }) => {
  const { toTitleCase, toPathname } = useContent();

  const compid = title ? `${id}-summary-group-${toPathname(title)}` : `${id}-summary-group`;
  const grouptitle = title ? toTitleCase(title) : "";
  const groupto = title ? `/${toPathname(title)}` : "/";

  return (
    <section
      id={compid}
      className={`${summary.newsSummaryGroup} ${isPortrait ? "" : summary.landscape} ${variant === "primary" ? summary.primary : ""}`}
    >
      <header className={summary.groupHead}>
        <div className={summary.groupHeadwrap}>
          <div className={summary.groupTitlewrap}>
            <h1 className={summary.groupTitle}>{grouptitle}</h1>
          </div>
          <SourceButton id={compid} to={groupto} />
        </div>
      </header>
      <div className={`${summary.groupBodyVscroll} ${isPortrait ? summary.portrait : summary.landscape}`}>
        <div className={`${summary.groupBody} ${isPortrait ? summary.portrait : summary.landscape}`}>
          {posts.map((post, index) => (
            <NewsSummaryCard
              key={index}
              isPortrait={isPortrait}
              id={`${compid}-${index}`}
              title={post.title}
              tag={post.tag}
              image={post.image}
              loc={post.location}
              date={post.date}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsGroup;
