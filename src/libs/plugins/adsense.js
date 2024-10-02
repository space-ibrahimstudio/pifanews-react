import React, { useEffect } from "react";

const capub = process.env.REACT_APP_CA_PUB_MAIN;

const AdSense = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${capub}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    const adsInitialized = document.querySelectorAll(".adsbygoogle[data-ad-status='done']").length === 0;
    if (adsInitialized) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <ins className="adsbygoogle" style={{ display: "block", width: "100%", height: "auto" }} data-ad-client={capub} data-ad-slot="1436038114" data-ad-format="auto" data-full-width-responsive="true"></ins>;
};

export default AdSense;
