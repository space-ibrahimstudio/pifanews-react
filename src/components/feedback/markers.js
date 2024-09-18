import React from "react";
import { useContent, useWindow } from "@ibrahimstudio/react";
import { SourceButton } from "../formel/buttons";
import heacss from "./styles/section-head.module.css";

export const TextHint = ({ children }) => {
  return <span style={{ color: "var(--color-primary)" }}>{children}</span>;
};

export const NewsTag = ({ id, name }) => {
  const { toPathname } = useContent();
  const compid = (name && `${id}-news-tag-${toPathname(name)}`) || `${id}-news-tag`;
  const lablstyles = { zIndex: "1", borderRadius: "9999px", backgroundColor: "var(--color-primary)", overflow: "hidden", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "var(--pixel-5) var(--pixel-10)", textAlign: "center", fontSize: "var(--font-tiny)", color: "var(--color-secondlight)", fontFamily: "var(--font-inter)" };
  const textstyles = { position: "relative", fontWeight: "600" };

  return (
    <div id={compid} style={lablstyles}>
      <p style={textstyles}>{name}</p>
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

export const PageTitle = ({ id, children }) => {
  const { width } = useWindow();
  const compid = `${id}-page-title`;
  const headcss = { display: "flex", flexDirection: "row", alignSelf: "stretch", justifyContent: "flex-start", alignItems: "center", textAlign: "center", fontSize: "var(--font-md)", color: "var(--color-secondary)", fontFamily: "var(--font-jakarta)", fontWeight: "700", padding: width > 1120 ? "var(--pixel-20) var(--pixel-70)" : width > 700 ? "var(--pixel-20) var(--pixel-30)" : "var(--pixel-20)" };
  const h1css = { flex: "1", position: "relative", margin: "0", fontSize: "inherit" };

  return (
    <header id={compid} style={headcss}>
      <h1 style={h1css}>{children}</h1>
    </header>
  );
};
