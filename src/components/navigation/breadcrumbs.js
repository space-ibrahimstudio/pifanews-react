import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const BreadCrumbs = ({ id, paths = [] }) => {
  const compid = `${id}-breadcrumbs`;
  const parestyles = { alignSelf: "stretch", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: "var(--pixel-10)", textAlign: "left", fontSize: "var(--font-xsm)", fontFamily: "var(--font-inter)" };
  const nvgtstyles = { position: "relative", maxWidth: "var(--pixel-150)", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", fontWeight: "500", color: "var(--color-secondary)" };
  const actvstyles = { position: "relative", maxWidth: "var(--pixel-150)", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", fontWeight: "500", color: "var(--color-primary)" };
  const iconstyles = { width: "auto", position: "relative", height: "var(--pixel-10)" };

  return (
    <section id={compid} style={parestyles}>
      {paths.map((path, index) => (
        <Fragment key={index}>
          {index < paths.length - 1 ? (
            <Fragment>
              <Link style={nvgtstyles} to={path.url}>
                {path.label}
              </Link>
              <img style={iconstyles} alt={`scoped-by-${path.label}`} src="/svg/chevron-right.svg" />
            </Fragment>
          ) : (
            <Link style={actvstyles} to={path.url}>
              {path.label}
            </Link>
          )}
        </Fragment>
      ))}
    </section>
  );
};

export default BreadCrumbs;
