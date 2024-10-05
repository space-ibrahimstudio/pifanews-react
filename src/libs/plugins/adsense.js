import React, { useEffect } from "react";

const capub = process.env.REACT_APP_CA_PUB_MAIN;

const AdSense = () => {
  const isCrawl = typeof window !== "undefined" && window.navigator.userAgent === "IbrahimStudio";
  useEffect(() => {
    if (!isCrawl) {
      const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9744736888740959";
        script.async = true;
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);
      }
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch (e) {
        console.error("Adsbygoogle error:", e);
      }
    }
  }, [isCrawl]);

  return <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client="ca-pub-9744736888740959" data-ad-slot="5581971140" data-ad-format="auto" data-full-width-responsive="true"></ins>;
};

export default AdSense;
