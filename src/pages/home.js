import React, { Fragment, useState, useEffect } from "react";
import { useDocument } from "../libs/plugins/document";
import { getFeaturedPosts, getTrendingTags, getLocalCategories } from "../libs/sources/local-data";
import { SEO } from "../libs/plugins/seo";
import { PageLayout } from "../components/layouts/pages";
import { News3Grid } from "../components/layouts/grids";
import { Aside } from "../components/layouts/containers";
import NewsCard from "../components/contents/cards";
import { NewsSummaryGroup } from "../components/contents/groups";
import { AdsSection } from "../sections/ads-section";
import { HeroSection } from "../sections/hero-section";
import { TagsSection } from "../sections/tags-section";
import { NewsHscrollSection } from "../sections/news-hscroll-section";
import { CatSection } from "../sections/cat-section";
import { NewsSection } from "../sections/news-section";

const HomePage = () => {
  const { short } = useDocument();
  const id = `${short}-home`;

  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

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

  return (
    <Fragment>
      <SEO title="Beranda" route="/" />
      <PageLayout pageid={id}>
        <AdsSection label="" src="/img/top-ads.jpg" />
        <HeroSection>
          <News3Grid id={id} posts={posts} />
          <Aside>
            <NewsSummaryGroup id={id} variant="primary" title="Trending" posts={posts.slice(3, 10)} />
          </Aside>
        </HeroSection>
        <TagsSection tags={tags} />
        <AdsSection label="" src="/img/submit-banner.webp" />
        <NewsHscrollSection title="Berita" prior="Terbaru">
          {posts.slice(0, 3).map((post, index) => (
            <NewsCard
              id={id}
              key={index}
              title={post.title}
              short={post.short}
              tag={post.tag}
              image={post.image}
              loc={post.location}
              date={post.date}
            />
          ))}
        </NewsHscrollSection>
        <CatSection cats={categories} />
        <NewsSection title="Berita" prior="Lokal" posts={posts} />
        <AdsSection label="" src="/img/about-banner.webp" />
        <NewsHscrollSection title="Berita" prior="Terpopuler">
          {posts.slice(0, 3).map((post, index) => (
            <NewsCard
              id={id}
              key={index}
              title={post.title}
              short={post.short}
              tag={post.tag}
              image={post.image}
              loc={post.location}
              date={post.date}
            />
          ))}
        </NewsHscrollSection>
        <NewsSection title="Berita" prior="PifaBiz" posts={posts} />
        <NewsSection title="Berita" prior="Bisnis" posts={posts} />
        <AdsSection label="" src="/img/report-banner.webp" />
      </PageLayout>
    </Fragment>
  );
};

export default HomePage;
