import React, { useEffect } from "react";

const capub = process.env.REACT_APP_CA_PUB_MAIN;

const AdSense = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return <ins className="adsbygoogle" style={{ display: "block", width: "100%", height: "auto" }} data-ad-client="ca-pub-9744736888740959" data-ad-slot="5581971140" data-ad-format="auto" data-full-width-responsive="true"></ins>;
};

export default AdSense;
