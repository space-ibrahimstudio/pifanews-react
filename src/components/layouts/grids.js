import React from "react";
import { NewsDisplayCard } from "../contents/cards";
import styles from "./styles/news3grid.module.css";

export const News3Grid = ({ id, posts }) => {
  const compid = `${id}-3-grid`;
  const slicedposts = posts.slice(0, 3);

  return (
    <div id={compid} className={styles.news3grid}>
      {slicedposts.length > 0 && (
        <NewsDisplayCard
          id={`${compid}-${slicedposts[0].id}`}
          title={slicedposts[0].title}
          short={slicedposts[0].short}
          tag={slicedposts[0].tag}
          image={slicedposts[0].image}
          loc={slicedposts[0].location}
          date={slicedposts[0].date}
          align="stretch"
          height="var(--pixel-270)"
        />
      )}
      <div className={styles.news3gridSmall}>
        {slicedposts.slice(1).map((post, index) => (
          <div key={index} className={styles.news3grid200}>
            <NewsDisplayCard
              id={`${compid}-${post.id}`}
              title={post.title}
              short={post.short}
              tag={post.tag}
              image={post.image}
              loc={post.location}
              date={post.date}
              align="stretch"
              height="var(--pixel-270)"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
