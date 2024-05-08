import React, { useState, useEffect } from "react";
import { useDocument } from "../libs/plugins/document";
import {
  getFeaturedPosts,
  getTrendingTags,
  getLocalCategories,
} from "../libs/sources/local-data";
import { PageLayout } from "../components/layouts/pages";
import { Aside } from "../components/layouts/aside";
import { SEO } from "../libs/plugins/seo";
import { HeroSection } from "../components/layouts/hero-section";
import { News3grid } from "../components/layouts/news3grid";
import { NewsSummaryGroup } from "../components/contents/groups/news-summary-group";
import { TagsSection } from "../components/layouts/tags-section";
import { NewsHscrollSection } from "../components/layouts/news-hscroll-section";
import { NewsCard } from "../components/contents/cards/news-card";
import { CatSection } from "../components/layouts/cat-section";
import { NewsSection } from "../components/layouts/news-section";
import { PollingCard } from "../components/contents/cards/polling-card";
import { AdsSection } from "../sections/ads-section";

const HomePage = () => {
  const { short } = useDocument();
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const id = `${short}-home`;

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
    <PageLayout pageid={id}>
      <SEO
        title="Beranda"
        description="Platform Informasi Terkini dan Teraktual, Kanal Aspirasi Netizen, dan Digital Market"
        route="/"
      />
      <HeroSection id={id}>
        <News3grid id={id} posts={posts} />
        <Aside>
          <NewsSummaryGroup
            id={id}
            title="Trending"
            posts={posts.slice(3, 10)}
            to="/trending"
          />
        </Aside>
      </HeroSection>
      <TagsSection id={id} tags={tags} />
      <AdsSection src="/img/submit-banner.webp" />
      <NewsHscrollSection
        id={`${id}-newest`}
        title="Berita"
        prior="Terbaru"
        to="/update"
      >
        {posts.slice(0, 3).map((post, index) => (
          <NewsCard
            key={index}
            id={`${id}-newest-${index}`}
            title={post.title}
            short={post.short}
            tag={post.tag}
            image={post.image}
            loc={post.location}
            date={post.date}
          />
        ))}
      </NewsHscrollSection>
      <CatSection id={id} cats={categories} />
      <NewsSection
        id={`${id}-lokal`}
        title="Berita"
        prior="Lokal"
        to="/lokal"
        posts={posts}
      />
      <AdsSection src="/img/about-banner.webp" />
      <NewsHscrollSection
        id={`${id}-popular`}
        title="Berita"
        prior="Terpopuler"
        to="/popular"
      >
        {posts.slice(0, 3).map((post, index) => (
          <NewsCard
            key={index}
            id={`${id}-popular-${index}`}
            title={post.title}
            short={post.short}
            tag={post.tag}
            image={post.image}
            loc={post.location}
            date={post.date}
          />
        ))}
      </NewsHscrollSection>
      <NewsSection
        id={`${id}-pifabiz`}
        title="Berita"
        prior="PifaBiz"
        to="/pifabiz"
        posts={posts}
      />
      <NewsSection
        id={`${id}-business`}
        title="Berita"
        prior="Bisnis"
        to="/bisnis"
        posts={posts}
      />
      <NewsHscrollSection
        id={`${id}-review`}
        title="Pifa"
        prior="Review"
        to="/review"
      >
        {posts.slice(0, 3).map((post, index) => (
          <NewsCard
            key={index}
            id={`${id}-review-${index}`}
            title={post.title}
            short={post.short}
            tag={post.tag}
            image={post.image}
            loc={post.location}
            date={post.date}
          />
        ))}
      </NewsHscrollSection>
      <NewsHscrollSection
        id={`${id}-polling`}
        title="Pifa"
        prior="Polling"
        to="/polling"
      >
        {posts.slice(0, 3).map((post, index) => (
          <PollingCard
            key={index}
            id={`${id}-polling-${index}`}
            title={post.title}
            voters="50"
            count="5 Hari"
            tag={post.tag}
            image={post.image}
          />
        ))}
      </NewsHscrollSection>
      <AdsSection src="/img/report-banner.webp" />
    </PageLayout>
  );
};

export default HomePage;
