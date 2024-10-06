import React from "react";

const A = ({ type = "int", slug = "/", link = "https://pifa.co.id" }) => {
  const isCrawl = typeof window !== "undefined" && window.navigator.userAgent === "IbrahimStudio";
  const compid = `open-${type === "int" ? `https://pifa.co.id${slug}` : link}`;
  const compcss = { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 100, backgroundColor: "transparent" };

  if (isCrawl) {
    return null;
  }

  return <a id={compid} href={type === "int" ? slug : link} style={compcss} />;
};

export default A;
