import React, { useEffect } from "react";

const capub = process.env.REACT_APP_CA_PUB_MAIN;

const AdSense = () => {
  const isCrawl = typeof window !== "undefined" && window.navigator.userAgent === "IbrahimStudio";
  const isProd = process.env.NODE_ENV === "production";

  useEffect(() => {
    if (!isProd || !isCrawl) {
      const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${capub}`;
        script.async = true;
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);
        script.onload = () => {
          const adsbygoogle = window.adsbygoogle || [];
          adsbygoogle.push({});
        };
      } else {
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
      }
    }
  }, [isProd, isCrawl]);

  return <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={capub} data-ad-slot="5581971140" data-ad-format="auto" data-full-width-responsive="true"></ins>;
};

export default AdSense;
