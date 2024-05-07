import React from "react";
import { Helmet } from "react-helmet-async";
import { useContent } from "@ibrahimstudio/react";
import { useDocument } from "./document";

export function SEO({ title, description, route, thumbSrc }) {
  const { company } = useDocument();
  const { stripContent } = useContent();
  const domainurl = process.env.REACT_APP_DOMAIN_URL;
  const markers = process.env.REACT_APP_MARKERS;
  const thumbnail = thumbSrc ? thumbSrc : "/img/img-01.jpg";
  const strippedDesc = description
    ? stripContent(description).substring(0, 160)
    : "";

  return (
    <Helmet>
      <title>{`${title} | ${company}`}</title>
      <link rel="canonical" href={`${domainurl}${route}`} />
      <meta property="og:title" content={`${title} | ${company}`} />
      <meta property="og:description" content={strippedDesc} />
      <meta property="og:image" content={`${domainurl}${thumbnail}`} />
      <meta property="og:url" content={`${domainurl}${route}`} />
      <meta name="description" content={strippedDesc} />
      <meta name="twitter:title" content={`${title} | ${company}`} />
      <meta name="twitter:description" content={strippedDesc} />
      <meta name="twitter:image" content={`${domainurl}${thumbnail}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="author" content={markers} />
    </Helmet>
  );
}
