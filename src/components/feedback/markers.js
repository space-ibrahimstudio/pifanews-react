import React from "react";
import { toPathname } from "../../libs/plugins/helpers";
import { SourceButton } from "../formel/buttons";
import heacss from "./styles/section-head.module.css";

export const NewsTag = ({ id, name }) => {
  const compid = (name && `${id}-news-tag-${toPathname(name)}`) || `${id}-news-tag`;
  const lablstyles = { zIndex: "1", borderRadius: "9999px", backgroundColor: "var(--color-primary)", overflow: "hidden", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "var(--pixel-5) var(--pixel-10)", textAlign: "center", fontSize: "var(--font-tiny)", color: "var(--color-secondlight)", fontFamily: "var(--font-inter)" };
  const textstyles = { position: "relative", fontWeight: "600" };

  return (
    <section id={compid} style={lablstyles}>
      <p style={textstyles}>{name}</p>
    </section>
  );
};

const SectionHead = ({ id, noSource = false, to, children }) => {
  const compid = `${id}-section-head`;
  const headto = to ? `/${to}` : "/";

  return (
    <section id={compid} className={heacss.sectionHead}>
      <header className={heacss.sectionTitlewrap}>
        {React.Children.map(children, (child) => {
          return React.isValidElement(child) ? React.cloneElement(child, { id: compid }) : child;
        })}
      </header>
      {!noSource && <SourceButton id={compid} to={headto} />}
    </section>
  );
};

export default SectionHead;
