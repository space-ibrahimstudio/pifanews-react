import React, { Fragment, useState, useEffect } from "react";
import { useWindow } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/document";
import { useFetch } from "../libs/plugins/fetch";
import { getFeaturedPosts, getTrendingTags, getInfographicPosts, getAdDatas } from "../libs/sources/local-data";
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
  const { localCatData, trendingPostData, latestPostData } = useFetch();
  const id = `${short}-home`;
  const [posts, setPosts] = useState([]);
  const [graphicPosts, setGraphicPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [ads, setAds] = useState([]);

  const renderInfographic = (item) => <InfographicCard title={item.title} image={item.image} count={item.count} status={item.status} />;
  const renderLocalCat = (item) => <CatCard catname={item.nama_kategori_daerah} image={item.image} />;
  const renderAds = (item) => <AdBanner alt={item.label} src={item.image} />;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const post = await getFeaturedPosts();
        setPosts(post);
      } catch (error) {
        console.error("error getting featured posts:", error);
      }
    };
    fetchPosts();
  }, []);

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
        <NewsSliderSection content={ads} renderContent={renderAds} noHead contentStyle={{ minWidth: "100%" }} />
        <TagsSection tags={tags} />
        <HeroSection>
          <News3Grid id={id} posts={trendingPostData} />
          <Aside>
            <NewsSummaryGroup id={id} isPortrait={width < 464 ? true : false} variant="primary" title="Trending" posts={trendingPostData.slice(3, 10)} />
          </Aside>
        </HeroSection>
        <NewsSliderSection prior="Infografis" content={graphicPosts} renderContent={renderInfographic} noSource />
        <NewsSliderSection content={ads} renderContent={renderAds} noHead contentStyle={{ minWidth: "100%" }} />
        <NewsHscrollSection title="Berita" prior="Terbaru">
          {latestPostData.slice(0, 3).map((post, index) => (
            <NewsCard id={id} key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={`https://pifa.co.id/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} />
          ))}
        </NewsHscrollSection>
        <NewsSection title="Berita" prior="Internasional" catId="3" />
        <NewsSection title="Berita" prior="Nasional" catId="2" />
        <NewsSliderSection title="Berita" prior="Kabar Daerah" content={localCatData} renderContent={renderLocalCat} />
        <NewsSliderSection content={ads} renderContent={renderAds} noHead contentStyle={{ minWidth: "100%" }} />
        <NewsHscrollSection title="Berita" prior="Populer">
          {trendingPostData.slice(0, 3).map((post, index) => (
            <NewsCard id={id} key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={`https://pifa.co.id/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} />
          ))}
        </NewsHscrollSection>
        <NewsSection title="Berita" prior="PifaBiz" catId="7" />
        <NewsSection title="Berita" prior="Politik" catId="8" />
        <NewsSection title="Berita" prior="Bola dan Sports" catId="6" />
        <NewsSliderSection content={ads} renderContent={renderAds} noHead contentStyle={{ minWidth: "100%" }} />
        {/* <NewsSection title="Berita" prior="Bisnis" posts={posts} /> */}
        <NewsSection title="Berita" prior="Teknologi" catId="4" />
        {/* <NewsSection title="Berita" prior="Food dan Travel" posts={posts} /> */}
        <NewsSliderSection content={ads} renderContent={renderAds} noHead contentStyle={{ minWidth: "100%" }} />
        <NewsSection title="Berita" prior="Lifestyle" catId="5" />
      </PageLayout>
    </Fragment>
  );
};

export default HomePage;
