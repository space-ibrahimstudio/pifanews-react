import React, { Fragment } from "react";
import { SectionHead } from "../contents/markers/section-head";
import { Div300 } from "./div300";
import { NewsDisplayCard } from "../contents/cards/news-display-card";
import { NewsGroup } from "../contents/groups/news-group";
import styles from "./styles/news-section.module.css";

export const NewsSection = ({ id, title, prior, to, posts }) => {
  return (
    <section id={`news-${id}`} className={styles.newsSection}>
      <SectionHead id={`news-${id}`} title={title} prior={prior} to={to} />
      <div className={styles.sectionBody}>
        {posts.length > 0 && (
          <Fragment>
            <Div300>
              <NewsDisplayCard
                id={`3-grid-${id}-${posts[0].id}`}
                title={posts[0].title}
                short={posts[0].short}
                tag={posts[0].tag}
                image={posts[0].image}
                loc={posts[0].location}
                date={posts[0].date}
                align="unset"
                height="450px"
                flex="1"
              />
            </Div300>
            <Div300>
              <NewsGroup
                id={`news-${id}-trending`}
                title="Trending"
                scope={prior}
                posts={posts.slice(1)}
              />
            </Div300>
            <Div300>
              <NewsGroup
                id={`news-${id}-newest`}
                title="Terbaru"
                scope={prior}
                posts={posts.slice(1)}
              />
            </Div300>
          </Fragment>
        )}
      </div>
    </section>
  );
};
