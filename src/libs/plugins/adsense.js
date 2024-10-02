import React from "react";
import { Adsense } from "@ctrl/react-adsense";

const capub = process.env.REACT_APP_CA_PUB_MAIN;

const AdSense = () => {
  return <Adsense className="pifaNetAd" client={capub} slot="1436038114" adTest="on" />;
};

export default AdSense;
