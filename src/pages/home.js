import React, { Fragment, useState, useEffect } from "react";
import { useWindow } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/document";
import { getFeaturedPosts, getTrendingTags, getLocalCategories, getInfographicPosts, getAdDatas } from "../libs/sources/local-data";
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
  const id = `${short}-home`;
  const [posts, setPosts] = useState([]);
  const [graphicPosts, setGraphicPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ads, setAds] = useState([]);

  const renderInfographic = (item) => <InfographicCard title={item.title} image={item.image} count={item.count} status={item.status} />;
  const renderLocalCat = (item) => <CatCard catname={item.name} image={item.image} />;
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
    const fetchCat = async () => {
      try {
        const cat = await getLocalCategories();
        setCategories(cat);
      } catch (error) {
        console.error("error getting local categories:", error);
      }
    };
    fetchCat();
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
          <News3Grid id={id} posts={posts} />
          <Aside>
            <NewsSummaryGroup id={id} isPortrait={width < 464 ? true : false} variant="primary" title="Trending" posts={posts.slice(3, 10)} />
          </Aside>
        </HeroSection>
        <NewsSliderSection prior="Infografis" content={graphicPosts} renderContent={renderInfographic} noSource />
        <NewsSliderSection content={ads} renderContent={renderAds} noHead contentStyle={{ minWidth: "100%" }} />
        <NewsHscrollSection title="Berita" prior="Terbaru">
          {posts.slice(0, 3).map((post, index) => (
            <NewsCard id={id} key={index} title={post.title} short={post.short} tag={post.tag} image={post.image} loc={post.location} date={post.date} />
          ))}
        </NewsHscrollSection>
        <NewsSection title="Berita" prior="Internasional" posts={posts} />
        <NewsSection title="Berita" prior="Nasional" posts={posts} />
        <NewsSliderSection title="Berita" prior="Kabar Daerah" content={categories} renderContent={renderLocalCat} />
        <NewsSliderSection content={ads} renderContent={renderAds} noHead contentStyle={{ minWidth: "100%" }} />
        <NewsHscrollSection title="Berita" prior="Populer">
          {posts.slice(0, 3).map((post, index) => (
            <NewsCard id={id} key={index} title={post.title} short={post.short} tag={post.tag} image={post.image} loc={post.location} date={post.date} />
          ))}
        </NewsHscrollSection>
        <NewsSection title="Berita" prior="PifaBiz" posts={posts} />
        <NewsSection title="Berita" prior="Politik" posts={posts} />
        <NewsSection title="Berita" prior="Bola dan Sports" posts={posts} />
        <NewsSliderSection content={ads} renderContent={renderAds} noHead contentStyle={{ minWidth: "100%" }} />
        <NewsSection title="Berita" prior="Bisnis" posts={posts} />
        <NewsSection title="Berita" prior="Teknologi" posts={posts} />
        <NewsSection title="Berita" prior="Food dan Travel" posts={posts} />
        <NewsSliderSection content={ads} renderContent={renderAds} noHead contentStyle={{ minWidth: "100%" }} />
        <NewsSection title="Berita" prior="Lifestyle" posts={posts} />
      </PageLayout>
    </Fragment>
  );
};

export default HomePage;
