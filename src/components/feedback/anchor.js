import React from "react";

const A = ({ type = "int", slug = "/", link = "https://pifa.co.id", onClick = () => {} }) => {
  const compid = `open-${type === "int" ? `https://pifa.co.id${slug}` : link}`;
  const compcss = { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, backgroundColor: "transparent" };

  return <a id={compid} href={type === "int" ? slug : link} onClick={onClick} onAuxClick={(e) => e.button === 1 && window.open(type === "int" ? slug : link, "_blank`")} style={compcss} />;
};

export default A;
