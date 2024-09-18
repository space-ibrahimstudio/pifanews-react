import React from "react";
import { Helmet } from "react-helmet-async";
import { useContent } from "@ibrahimstudio/react";
import { useDocument, formatToISO8601 } from "./helpers";

export function SEO({ title, description, route, thumbSrc, extThumbSrc, thumbAlt = "", isPost = false, author = "Admin", datecreate = "2021-07-01 12:06:53", dateupdate = "2021-07-01 12:06:53", category, isNoIndex = false }) {
  const { company, domain } = useDocument();
  const { stripContent } = useContent();

  const metatitle = `${title} | ${company}`;
  const stripdesc = (description && stripContent(description).substring(0, 160)) || "Platform Informasi Terkini dan Teraktual, Kanal Aspirasi Netizen, dan Digital Market";
  const thumbnail = extThumbSrc ? extThumbSrc : thumbSrc ? `${domain}${thumbSrc}` : `${domain}/capture-wide.png`;
  const markers = process.env.REACT_APP_MARKERS;
  const pubdate = formatToISO8601(datecreate);
  const moddate = formatToISO8601(dateupdate);

  const blogLD = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: metatitle,
    description: stripdesc,
    image: [thumbnail],
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: company,
    },
    datePublished: pubdate,
    dateModified: moddate,
  };

  const orgzLD = {
    "@context": "http://schema.org",
    "@type": "NewsMediaOrganization",
    name: company,
    logo: `${domain}/logo192.png`,
    url: domain,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pontianak",
      addressRegion: "Kalimantan Barat",
      addressCountry: "Indonesia",
    },
  };

  return (
    <Helmet>
      <title>{metatitle}</title>
      <meta property="og:title" content={metatitle} />
      <meta property="og:description" content={stripdesc} />
      <meta property="og:image" content={thumbnail} />
      <meta property="og:image:alt" content={thumbAlt === "" ? stripdesc : thumbAlt} />
      <meta property="og:url" content={`${domain}${route}`} />
      <meta property="og:type" content={isPost ? "article" : "website"} />
      {isPost && <meta property="article:author" content={author} />}
      {isPost && <meta property="article:published_time" content={pubdate} />}
      {isPost && <meta property="article:modified_time" content={moddate} />}
      {isPost && <meta property="article:section" content={category} />}
      <meta name="description" content={stripdesc} />
      <meta name="twitter:title" content={metatitle} />
      <meta name="twitter:description" content={stripdesc} />
      <meta name="twitter:image" content={thumbnail} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="author" content={markers} />
      <meta name="robots" content={isNoIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <link rel="canonical" href={`${domain}${route}`} />
      <script type="application/ld+json">{isPost ? JSON.stringify(blogLD) : JSON.stringify(orgzLD)}</script>
    </Helmet>
  );
}
