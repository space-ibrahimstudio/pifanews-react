import React, { Fragment } from "react";
import { SectionHead } from "../contents/markers/section-head";
import { Div300 } from "./div300";
import { NewsDisplayCard } from "../contents/cards/news-display-card";
import { NewsGroup } from "../contents/groups/news-group";
import styles from "./styles/news-section.module.css";

export const NewsSection = ({ id, title, prior, to, posts }) => {
  const compid = `news-${id}`;
  const filteredposts = posts.filter((post) => post.tag === prior);

  return (
    <section id={compid} className={styles.newsSection}>
      <SectionHead id={compid} title={title} prior={prior} to={to} />
      <div className={styles.sectionBody}>
        {filteredposts.length > 0 && (
          <Fragment>
            <Div300>
              <NewsDisplayCard
                id={`${compid}-${filteredposts[0].id}`}
                title={filteredposts[0].title}
                short={filteredposts[0].short}
                tag={filteredposts[0].tag}
                image={filteredposts[0].image}
                loc={filteredposts[0].location}
                date={filteredposts[0].date}
                align="unset"
                height="var(--pixel-450)"
                flex="1"
              />
            </Div300>
            <Div300>
              <NewsGroup
                id={`${compid}-trending`}
                title="Trending"
                scope={prior}
                posts={filteredposts.slice(1, 10)}
              />
            </Div300>
            <Div300>
              <NewsGroup
                id={`${compid}-newest`}
                title="Terbaru"
                scope={prior}
                posts={filteredposts.slice(0, 10)}
              />
            </Div300>
          </Fragment>
        )}
      </div>
    </section>
  );
};
