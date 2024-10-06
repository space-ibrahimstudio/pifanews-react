import React from "react";
import { useContent } from "@ibrahimstudio/react";
import useGraph from "./graph";
import { Header } from "../layout/frames";
import BreadCrumbs from "../navigation/breadcrumbs";
import styles from "./styles/article.module.css";

const Article = ({ id, paths = [], title, loc, date, content }) => {
  const { toTitleCase } = useContent();
  const { H1, P } = useGraph();
  const compid = `${id}-article-board`;
  const postloc = loc ? toTitleCase(loc) : "N/A";
  const basestyles = { flex: "1", borderRadius: "var(--pixel-20)", backgroundColor: "var(--color-secondlight)", overflow: "hidden", padding: "var(--pixel-20)", gap: "var(--pixel-20)", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", width: "100%" };

  return (
    <article id={compid} style={basestyles}>
      <BreadCrumbs id={compid} paths={paths} />
      <Header id={compid} isasChild gap="var(--pixel-20)">
        <H1 id="title" size="lg" weight="600">
          {title}
        </H1>
        <P id="location-date" align="justify" opacity="0.5">{`${postloc} | ${date}`}</P>
      </Header>
      <div className={styles.articleBoard} dangerouslySetInnerHTML={{ __html: content }}></div>
    </article>
  );
};

export default Article;
