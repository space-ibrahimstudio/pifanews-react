import React from "react";
import { useContent } from "@ibrahimstudio/react";

export const Image = ({ className, style, alt, src, onClick }) => {
  const { toPathname } = useContent();
  const compid = alt ? toPathname(alt) : "";

  return <img id={compid} className={className} style={style} alt={alt} loading="lazy" src={src} onClick={onClick} />;
};
