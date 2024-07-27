import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/document";
import { useLoading } from "../components/contents/loader";
import { useFetch } from "../libs/plugins/fetch";
import { useApi } from "../libs/plugins/api";
import { getTrendingTags, getAdDatas } from "../libs/sources/local-data";
import { SEO } from "../libs/plugins/seo";
import { PageLayout } from "../components/layouts/pages";
import Container300, { Aside } from "../components/layouts/containers";
import { AdBanner } from "../components/contents/image";
import NewsCard, { NewsDisplayCard } from "../components/contents/cards";
import { NewsSummaryGroup, FeedsGroup } from "../components/contents/groups";
import { HeroSection } from "../sections/hero-section";
import { TagsSection } from "../sections/tags-section";
import { NewsHscrollSection } from "../sections/news-hscroll-section";
import { NewsSliderSection } from "../sections/news-slider-section";
import { FeedsSection } from "../sections/feeds-section";
import { InlineadsSection } from "../sections/inlineads-section";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { short } = useDocument();
  const { width } = useWindow();
  const { apiRead } = useApi();
  const { setLoading } = useLoading();
  const { categoryData } = useFetch();
  const formData = new FormData();
  const [latestPostData, setLatestPostData] = useState([]);
  const [trendingPostData, setTrendingPostData] = useState([]);
  const [tags, setTags] = useState([]);
  const [ads, setAds] = useState([]);

  const id = category ? `${short}-${category}` : `${short}-category`;
  const pagepath = category ? `/${category}` : "/";

  const fetchLatestPosts = async () => {
    const idcat = categoryData.find((cat) => cat.slug === category)?.id;
    setLoading(true);
    try {
      formData.append("idcat", idcat);
      formData.append("limit", "11");
      formData.append("hal", "0");
      const postsdata = await apiRead(formData, "main", "categorynew");
      if (postsdata && postsdata.length > 0) {
        setLatestPostData(postsdata);
      } else {
        setLatestPostData([]);
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingPosts = async () => {
    const idcat = categoryData.find((cat) => cat.slug === category)?.id;
    setLoading(true);
    try {
      formData.append("idcat", idcat);
      formData.append("limit", "10");
      formData.append("hal", "0");
      const postsdata = await apiRead(formData, "main", "cattrendingnew");
      if (postsdata && postsdata.length > 0) {
        setTrendingPostData(postsdata);
      } else {
        setTrendingPostData([]);
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderAds = (item) => <AdBanner alt={item.label} src={item.image} />;

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

  useEffect(() => {
    fetchLatestPosts();
    fetchTrendingPosts();
  }, [category]);

  return (
    <Fragment>
      <SEO title={category} route={pagepath} />
      <PageLayout pageid={id}>
        <NewsSliderSection content={ads} renderContent={renderAds} noHead contentStyle={{ minWidth: "100%" }} />
        <TagsSection tags={tags} />
        <HeroSection>
          {trendingPostData.length > 0 && (
            <Container300>
              <NewsDisplayCard id={`${id}-${trendingPostData[0].id}`} title={trendingPostData[0].judul_berita} short={trendingPostData[0].isi_berita} tag={trendingPostData[0].nama_kategori_berita} image={`https://pifa.co.id/img_berita/${trendingPostData[0].img_berita}`} loc={trendingPostData[0].penulis_berita} date={trendingPostData[0].tanggal_berita} height={width < 464 ? "var(--pixel-350)" : "var(--pixel-550)"} flex="1" onClick={() => navigate(`/berita/${trendingPostData[0].slug}`)} />
            </Container300>
          )}
          <Aside>
            <NewsSummaryGroup id={id} isPortrait={width < 464 ? true : false} title="Trending" posts={trendingPostData.slice(1, 10)} />
          </Aside>
        </HeroSection>
        <NewsSliderSection content={ads} renderContent={renderAds} noHead contentStyle={{ minWidth: "100%" }} />
        <NewsHscrollSection title="Berita" prior="Terbaru">
          {latestPostData.slice(0, 3).map((post, index) => (
            <NewsCard id={id} key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={`https://pifa.co.id/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
          ))}
        </NewsHscrollSection>
        <NewsHscrollSection title="Berita" prior="Populer">
          {trendingPostData.slice(0, 3).map((post, index) => (
            <NewsCard id={id} key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={`https://pifa.co.id/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
          ))}
        </NewsHscrollSection>
        <FeedsSection>
          <FeedsGroup id={id} posts={latestPostData} />
          <Aside>
            <InlineadsSection label="" src="/img/inline-ads.webp" />
          </Aside>
        </FeedsSection>
        <NewsHscrollSection title="Berita" prior="Rekomendasi">
          {trendingPostData.slice(0, 3).map((post, index) => (
            <NewsCard id={id} key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={`https://pifa.co.id/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
          ))}
        </NewsHscrollSection>
        <NewsSliderSection content={ads} renderContent={renderAds} noHead contentStyle={{ minWidth: "100%" }} />
      </PageLayout>
    </Fragment>
  );
};

export default CategoryPage;
