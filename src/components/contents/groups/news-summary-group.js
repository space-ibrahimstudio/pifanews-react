import React from "react";
import { SourceButton } from "../../userInputs/buttons/source-button";
import { NewsSummaryCard } from "../cards/news-summary-card";
import styles from "./styles/news-summary-group.module.css";

export const NewsSummaryGroup = ({ id, title, posts, to }) => {
  const compid = `summary-group-${id}`;

  return (
    <section id={compid} className={styles.newsSummaryGroup}>
      <header className={styles.groupHead}>
        <div className={styles.groupHeadwrap}>
          <div className={styles.groupTitlewrap}>
            <h1 className={styles.groupTitle}>{title}</h1>
          </div>
          <SourceButton id={compid} to={to} />
        </div>
      </header>
      <div className={styles.groupBodyVscroll}>
        <div className={styles.groupBody}>
          {posts.map((post, index) => (
            <NewsSummaryCard
              key={index}
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
