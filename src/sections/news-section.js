import React, { Fragment } from "react";
import { useContent } from "@ibrahimstudio/react";
import { SectionHead } from "../components/contents/markers";
import Container300 from "../components/layouts/containers";
import { NewsDisplayCard } from "../components/contents/cards";
import NewsGroup from "../components/contents/groups";
import styles from "./styles/news-section.module.css";

export const NewsSection = ({ id, title, prior, posts }) => {
  const { toPathname } = useContent();
  const compid = title && prior ? `${id}-news-section-${toPathname(title)}-${toPathname(prior)}` : `${id}-news-section`;
  const filteredposts = posts.filter((post) => post.tag === prior);
  const slicedposts = filteredposts.slice(1, 10);

  return (
    <section id={compid} className={styles.newsSection}>
      <SectionHead id={compid} title={title} prior={prior} />
      <div className={styles.sectionBody}>
        {filteredposts.length > 0 && (
          <Fragment>
            <Container300>
              <NewsDisplayCard
                id={`${compid}-${filteredposts[0].id}`}
                title={filteredposts[0].title}
                short={filteredposts[0].short}
                tag={filteredposts[0].tag}
                image={filteredposts[0].image}
                loc={filteredposts[0].location}
                date={filteredposts[0].date}
                height="var(--pixel-450)"
                flex="1"
              />
            </Container300>
            <Container300>
              <NewsGroup id={`${compid}-trending`} title="Trending" scope={prior} posts={slicedposts} />
            </Container300>
            <Container300>
              <NewsGroup id={`${compid}-newest`} title="Terbaru" scope={prior} posts={slicedposts} />
            </Container300>
          </Fragment>
        )}
      </div>
    </section>
  );
};
