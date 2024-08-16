import React from "react";
import { useContent, useWindow } from "@ibrahimstudio/react";
import { SourceButton } from "../user-inputs/buttons";
import tagcss from "./styles/news-tag.module.css";
import heacss from "./styles/section-head.module.css";

export const TextHint = ({ children }) => {
  return <span style={{ color: "var(--color-primary)" }}>{children}</span>;
};

export const NewsCount = ({ id, value }) => {
  const compid = `${id}-news-count}`;
  return (
    <div id={compid} className={tagcss.cardLabel}>
      <p className={tagcss.cardLabelText}>{value}</p>
    </div>
  );
};

export const NewsTag = ({ id, name }) => {
  const { toPathname } = useContent();
  const compid = (name && `${id}-news-tag-${toPathname(name)}`) || `${id}-news-tag`;
  return (
    <div id={compid} className={tagcss.cardLabel}>
      <p className={tagcss.cardLabelText}>{name}</p>
    </div>
  );
};

export const SectionHead = ({ id, title, noSource = false, to }) => {
  const compid = `${id}-section-head`;
  const headto = to ? `/${to}` : "/";
  return (
    <header id={compid} className={heacss.sectionHead}>
      <div className={heacss.sectionTitlewrap}>
        <h1 className={heacss.sectionTitle}>{title}</h1>
      </div>
      {!noSource && <SourceButton id={compid} to={headto} />}
    </header>
  );
};

export const PageTitle = ({ children }) => {
  const { width } = useWindow();
  const headcss = { display: "flex", flexDirection: "row", alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", textAlign: "center", fontSize: "var(--font-md)", color: "var(--color-secondary)", fontFamily: "var(--font-jakarta)", fontWeight: "700", padding: width > 1120 ? "var(--pixel-20) var(--pixel-70)" : width > 700 ? "var(--pixel-20) var(--pixel-30)" : "var(--pixel-20)" };
  const h1css = { flex: "1", position: "relative", margin: "0", fontSize: "inherit" };
  return (
    <header style={headcss}>
      <h1 style={h1css}>{children}</h1>
    </header>
  );
};
