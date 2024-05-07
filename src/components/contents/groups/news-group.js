import React from "react";
import { NewsSummaryCard } from "../cards/news-summary-card";
import styles from "./styles/news-group.module.css";

export const NewsGroup = ({ id, title, scope, posts }) => {
  return (
    <section id={`news-group-${id}`} className={styles.newsGroup}>
      <header className={styles.groupHead}>
        <div className={styles.groupHeadwrap}>
          <div className={styles.groupTitlewrap}>
            <h1 className={styles.groupTitle}>
              <span>{`${title} di `}</span>
              <span className={styles.textHint}>{scope}</span>
            </h1>
          </div>
        </div>
      </header>
      <div className={styles.groupBodyVscroll}>
        <div className={styles.groupBody}>
          {posts.map((post, index) => (
            <NewsSummaryCard
              key={index}
              id={`news-group-${id}-${index}`}
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
