import React, { useEffect, useState } from "react";
import { toPathname } from "../../libs/plugins/helpers";
import poscss from "./styles/image.module.css";

export const AdBanner = ({ style, alt, src, onClick }) => {
  const compid = alt ? toPathname(alt) : "";
  const imgcss = { overflow: "hidden", borderRadius: "var(--pixel-5)", objectFit: "cover", width: "100%", height: "auto", flexShrink: "0" };
  return <img id={compid} style={{ ...imgcss, ...style }} alt={alt} loading="lazy" src={src} onClick={onClick} />;
};

export const PostImage = ({ alt = "", src }) => {
  const compid = alt ? toPathname(alt) : "";
  const prncss = { position: "relative", display: "inline-flex", width: "100%", borderRadius: "var(--pixel-20)", overflow: "hidden" };
  const crdcss = { position: "relative", width: "100%", height: "auto", objectFit: "cover", objectPosition: "center", borderRadius: "var(--pixel-20)", overflow: "hidden", zIndex: "0" };
  const [imageSrc, setImageSrc] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(img.src);
      setIsLoaded(true);
    };
    img.onerror = () => setImageSrc("/img/fallback.jpg");
  }, [src]);

  return (
    <section style={prncss}>
      {!isLoaded && <div id={`${compid}-placeholder`} className={poscss.skeleton} />}
      <img id={compid} style={{ ...crdcss, opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s" }} alt={alt} loading="lazy" src={imageSrc} onLoad={() => setIsLoaded(true)} />
    </section>
  );
};

const Img = ({ className, style, alt = "", src = "/img/fallback.jpg", onClick }) => {
  const compid = alt ? toPathname(alt) : "";
  return <img id={compid} className={className} style={style} alt={alt} loading="lazy" src={src} onClick={onClick} />;
};

export default Img;
