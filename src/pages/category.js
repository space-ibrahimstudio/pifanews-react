import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContent, useWindow } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/document";
import { getFeaturedPosts, getTrendingTags } from "../libs/sources/local-data";
import { SEO } from "../libs/plugins/seo";
import { PageLayout } from "../components/layouts/pages";
import Container300, { Aside } from "../components/layouts/containers";
import NewsCard, { NewsDisplayCard } from "../components/contents/cards";
import { NewsSummaryGroup } from "../components/contents/groups";
import { AdsSection } from "../sections/ads-section";
import { HeroSection } from "../sections/hero-section";
import { TagsSection } from "../sections/tags-section";
import { NewsHscrollSection } from "../sections/news-hscroll-section";

const CategoryPage = () => {
  const { category } = useParams();
  const { short } = useDocument();
  const { width } = useWindow();
  const { toPathname, toTitleCase } = useContent();

  const id = category ? `${short}-${toPathname(category)}` : `${short}-category`;
  const pagetitle = category ? toTitleCase(category) : "";
  const pagepath = category ? `/${toPathname(category)}` : "/";

  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);

  const filteredposts = posts.filter((post) => toPathname(post.tag) === category);

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

  return (
    <Fragment>
      <SEO title={pagetitle} description="" route={pagepath} />
      <PageLayout pageid={id}>
        <AdsSection label="" src="/img/top-ads.jpg" />
        <HeroSection>
          {filteredposts.length > 0 && (
            <Container300>
              <NewsDisplayCard
                id={`${id}-${filteredposts[0].id}`}
                title={filteredposts[0].title}
                short={filteredposts[0].short}
                tag={filteredposts[0].tag}
                image={filteredposts[0].image}
                loc={filteredposts[0].location}
                date={filteredposts[0].date}
                height="var(--pixel-550)"
                flex="1"
              />
            </Container300>
          )}
          <Aside>
            <NewsSummaryGroup id={id} isPortrait={width < 464 ? true : false} title="Trending" posts={filteredposts.slice(1, 10)} />
          </Aside>
        </HeroSection>
        <TagsSection tags={tags} />
        <AdsSection label="" src="/img/submit-banner.webp" />
        <NewsHscrollSection title="Berita" prior="Terbaru">
          {filteredposts.slice(0, 3).map((post, index) => (
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
        <NewsHscrollSection title="Berita" prior="Terpopuler">
          {filteredposts.slice(0, 3).map((post, index) => (
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
        <AdsSection label="" src="/img/report-banner.webp" />
      </PageLayout>
    </Fragment>
  );
};

export default CategoryPage;
