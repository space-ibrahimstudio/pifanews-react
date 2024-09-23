import React, { useState, useEffect, createContext, useContext } from "react";
import { toPathname } from "../../libs/plugins/helpers";
import styles from "./styles/loader.module.css";

const LoadingContext = createContext();

export const BlurUpImg = ({ className, style, alt, src }) => {
  const compid = (alt && toPathname(alt)) || "";
  const [loaded, setLoaded] = useState(false);
  const [blurredSrc, setBlurredSrc] = useState("");
  const [actualSrc, setActualSrc] = useState("");
  const compstyle = { position: "relative", objectFit: "cover", objectPosition: "center", overflow: "hidden" };

  const handleImageLoad = () => setLoaded(true);
  const generateBlurredImage = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = objectUrl;
      console.log("checkpoint:", objectUrl);
      return new Promise((resolve, reject) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0, img.width, img.height);
          context.filter = "blur(10px)";
          context.drawImage(img, 0, 0, img.width, img.height);
          const blurredImageUrl = canvas.toDataURL("image/jpeg");
          URL.revokeObjectURL(objectUrl);
          resolve(blurredImageUrl);
        };
        img.onerror = () => {
          reject(new Error("Failed to load image"));
        };
      });
    } catch (error) {
      console.error("Error generating blurred image:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadBlurredImage = async () => {
      const blurredImage = await generateBlurredImage(src);
      setBlurredSrc(blurredImage);
    };
    loadBlurredImage();
    setActualSrc(src);
  }, [src]);

  return (
    <div id={compid} style={{ ...compstyle, ...style }}>
      <img className={className} style={{ width: "100%", height: "100%", filter: loaded ? "none" : "blur(10px)", transition: "filter 0.3s ease", position: "absolute", top: 0, left: 0 }} alt={alt} src={blurredSrc} />
      <img className={className} style={{ width: "100%", height: "100%", visibility: loaded ? "visible" : "hidden", position: "absolute", top: 0, left: 0 }} alt={alt} src={actualSrc} onLoad={handleImageLoad} />
    </div>
  );
};

export const LoadingScreen = () => {
  return (
    <section className={styles.loadingScreen}>
      <div className={styles.loadingContent}>
        <span className={`${styles.loadingCircle} ${styles.sp1}`}>
          <span className={`${styles.loadingCircle} ${styles.sp2}`}>
            <span className={`${styles.loadingCircle} ${styles.sp3}`}></span>
          </span>
        </span>
      </div>
    </section>
  );
};

export const LoadingContent = () => {
  return (
    <div style={{ transform: "scale(0.4)", transformOrigin: "center", transition: "transform 0.2s" }}>
      <span className={`${styles.loadingCircle} ${styles.sp1}`}>
        <span className={`${styles.loadingCircle} ${styles.sp2}`}>
          <span className={`${styles.loadingCircle} ${styles.sp3}`}></span>
        </span>
      </span>
    </div>
  );
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (status) => {
    setIsLoading(status);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      {isLoading && <LoadingScreen />}
    </LoadingContext.Provider>
  );
};

const useLoading = () => useContext(LoadingContext);

export default useLoading;
