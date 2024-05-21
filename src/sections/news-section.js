import React, { Fragment } from "react";
import { useContent, useWindow } from "@ibrahimstudio/react";
import { SectionHead } from "../components/contents/markers";
import Container300 from "../components/layouts/containers";
import { NewsDisplayCard } from "../components/contents/cards";
import NewsGroup from "../components/contents/groups";
import styles from "./styles/news-section.module.css";

export const NewsSection = ({ id, title, prior, posts }) => {
  const { toPathname } = useContent();
  const { width } = useWindow();

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
                height={width < 464 ? "var(--pixel-270)" : "var(--pixel-450)"}
                flex="1"
              />
            </Container300>
            <Container300>
              <NewsGroup id={`${compid}-trending`} isPortrait={width < 464 ? true : false} title="Trending" scope={prior} posts={slicedposts} />
            </Container300>
            <Container300>
              <NewsGroup
                id={`${compid}-newest`}
                isPortrait={width > 700 && width < 840 ? true : width < 686 ? true : false}
                title="Terbaru"
                scope={prior}
                posts={slicedposts}
              />
            </Container300>
          </Fragment>
        )}
      </div>
    </section>
  );
};
