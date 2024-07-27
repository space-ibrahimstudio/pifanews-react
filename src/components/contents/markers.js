import React from "react";
import { useContent } from "@ibrahimstudio/react";
import { SourceButton } from "../user-inputs/buttons";
import tag from "./styles/news-tag.module.css";
import head from "./styles/section-head.module.css";

export const NewsTag = ({ id, name }) => {
  const { toPathname } = useContent();
  const compid = name ? `${id}-news-tag-${toPathname(name)}` : `${id}-news-tag`;

  return (
    <div id={compid} className={tag.cardLabel}>
      <p className={tag.cardLabelText}>{name}</p>
    </div>
  );
};

export const SectionHead = ({ id, title, noSource, prior, to }) => {
  const { toPathname } = useContent();
  const compid = title && prior ? `${id}-section-head-${toPathname(title)}-${toPathname(prior)}` : `${id}-section-head`;
  const headto = to ? `/${to}` : "/";

  return (
    <header id={compid} className={head.sectionHead}>
      <div className={head.sectionTitlewrap}>
        <h1 className={head.sectionTitle}>
          <span>{`${title} `}</span>
          <span className={head.textHint}>{prior}</span>
        </h1>
      </div>
      {!noSource && <SourceButton id={compid} to={headto} />}
    </header>
  );
};
