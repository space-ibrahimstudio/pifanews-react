import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/document";
import { useFetch } from "../libs/plugins/fetch";
import { getTrendingTags, getInfographicPosts, getAdDatas } from "../libs/sources/local-data";
import { SEO } from "../libs/plugins/seo";
import { PageLayout } from "../components/layouts/pages";
import { News3Grid } from "../components/layouts/grids";
import { Aside } from "../components/layouts/containers";
import { AdBanner } from "../components/contents/image";
import NewsCard, { InfographicCard, CatCard } from "../components/contents/cards";
import { NewsSummaryGroup } from "../components/contents/groups";
import { HeroSection } from "../sections/hero-section";
import { TagsSection } from "../sections/tags-section";
import { NewsHscrollSection } from "../sections/news-hscroll-section";
import { NewsSliderSection } from "../sections/news-slider-section";
import { NewsSection } from "../sections/news-section";

const HomePage = () => {
  const { width } = useWindow();
  const { short } = useDocument();
  const navigate = useNavigate();
  const { categoryData, localCatData, trendingPostData, latestPostData, popularPostData } = useFetch();
  const id = `${short}-home`;
  const [graphicPosts, setGraphicPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [ads, setAds] = useState([]);

  const renderInfographic = (item) => <InfographicCard title={item.title} image={item.image} count={item.count} status={item.status} />;
  const renderLocalCat = (item) => <CatCard catname={item.nama_kategori_daerah} image={item.image} />;
  const renderAds = (item) => <AdBanner alt={item.label} src={item.image} />;

  const adSections = [
    { content: ads, renderContent: renderAds, style: { minWidth: "100%" } },
    { content: ads, renderContent: renderAds, style: { minWidth: "100%" } },
    { content: ads, renderContent: renderAds, style: { minWidth: "100%" } },
  ];

  const combinedSections = [];
  let adIndex = 0;
  for (let i = 0; i < categoryData.length; i++) {
    const section = categoryData[i];
    combinedSections.push({ type: "news", data: section });
    if ((i + 1) % 3 === 0 && adIndex < adSections.length) {
      combinedSections.push({ type: "ad", data: adSections[adIndex] });
      adIndex++;
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const post = await getInfographicPosts();
        setGraphicPosts(post);
      } catch (error) {
        console.error("error getting infographic posts:", error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tag = await getTrendingTags();
        setTags(tag);
      } catch (error) {
        console.error("error getting trending tags:", error);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const post = await getAdDatas();
        setAds(post);
      } catch (error) {
        console.error("error getting ads:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Fragment>
      <SEO title="Beranda" route="/" />
      <PageLayout pageid={id}>
        <NewsSliderSection noHead content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        <TagsSection tags={tags} />
        <HeroSection>
          <News3Grid id={id} posts={trendingPostData} />
          <Aside>
            <NewsSummaryGroup id={id} isPortrait={width < 464 ? true : false} variant="primary" title="Trending" posts={trendingPostData.slice(3, 10)} />
          </Aside>
        </HeroSection>
        <NewsSliderSection noSource title="Berita" scope="Infografis" content={graphicPosts} renderContent={renderInfographic} />
        <NewsSliderSection noHead content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        <NewsHscrollSection scope="Terbaru">
          {latestPostData.slice(0, 3).map((post, index) => (
            <NewsCard id={id} key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={post.img_berita} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
          ))}
        </NewsHscrollSection>
        <NewsSliderSection title="Berita" scope="Kabar Daerah" content={localCatData} renderContent={renderLocalCat} />
        <NewsSliderSection noHead content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        <NewsHscrollSection scope="Populer">
          {popularPostData.slice(0, 3).map((post, index) => (
            <NewsCard id={id} key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={post.img_berita} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
          ))}
        </NewsHscrollSection>
        <Fragment>
          {combinedSections.map((section, index) => (
            <Fragment key={index}>{section.type === "ad" ? <NewsSliderSection noHead content={section.data.content} renderContent={section.data.renderContent} contentStyle={section.data.style} /> : <NewsSection scope={section.data.nama_kategori_berita} catId={section.data.id} slug={section.data.slug} />}</Fragment>
          ))}
        </Fragment>
      </PageLayout>
    </Fragment>
  );
};

export default HomePage;
