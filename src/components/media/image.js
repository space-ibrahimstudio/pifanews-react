import React from "react";
import { useContent } from "@ibrahimstudio/react";

export const AdBanner = ({ style, alt, src, onClick }) => {
  const { toPathname } = useContent();
  const compid = alt ? toPathname(alt) : "";
  const imgcss = { overflow: "hidden", borderRadius: "var(--pixel-5)", objectFit: "cover", width: "100%", height: "auto", flexShrink: "0" };
  return <img id={compid} style={{ ...imgcss, ...style }} alt={alt} loading="lazy" src={src} onClick={onClick} />;
};

const Image = ({ className, style, alt, src, onClick }) => {
  const { toPathname } = useContent();
  const compid = alt ? toPathname(alt) : "";
  return <img id={compid} className={className} style={style} alt={alt} loading="lazy" src={src} onClick={onClick} />;
};

export default Image;
