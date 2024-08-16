import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/document";
import { useLoading } from "../components/contents/loader";
import { useFetch } from "../libs/plugins/fetch";
import { useApi } from "../libs/plugins/api";
import { getAdDatas } from "../libs/sources/local-data";
import { SEO } from "../libs/plugins/seo";
import { PageLayout } from "../components/layouts/pages";
import Container300, { Aside } from "../components/layouts/containers";
import { AdBanner } from "../components/contents/image";
import NewsCard, { NewsDisplayCard, NewsFeedCard } from "../components/contents/cards";
import { NewsSummaryGroup, FeedsGroup } from "../components/contents/groups";
import { HeroSection } from "../sections/hero-section";
import { TagsSection } from "../sections/tags-section";
import { NewsHscrollSection } from "../sections/news-hscroll-section";
import { NewsSliderSection } from "../sections/news-slider-section";
import { FeedsSection } from "../sections/feeds-section";
import { InlineadsSection } from "../sections/inlineads-section";

const CategoryPage = ({ category }) => {
  const navigate = useNavigate();
  const { short } = useDocument();
  const { width } = useWindow();
  const { apiRead } = useApi();
  const { setLoading } = useLoading();
  const { categoryData, trendingTagData } = useFetch();
  const [pageInfo, setPageInfo] = useState({ id: "", title: "", desc: "", path: "", thumbnail: "" });
  const [latestPostData, setLatestPostData] = useState([]);
  const [trendingPostData, setTrendingPostData] = useState([]);
  const [postsFilter, setPostsFilter] = useState("update");
  const [feedLimit, setFeedLimit] = useState(10);
  const [feedPostData, setFeedPostData] = useState([]);
  const [trendLimit, setTrendLimit] = useState(11);
  const [trendLoading, setTrendLoading] = useState(false);
  const [feedsLoading, setFeedsLoading] = useState(false);
  const [ads, setAds] = useState([]);

  const id = (category && `${short}-${category}`) || `${short}-category`;

  const getPageInfo = () => {
    if (categoryData && categoryData.length > 0) {
      const pageinfo = categoryData.filter((cat) => cat.slug === category);
      if (pageinfo && pageinfo.length > 0) {
        setPageInfo({ id: pageinfo[0].id, title: pageinfo[0].nama_kategori_berita, desc: "", path: `/berita/kategori/${pageinfo[0].slug}`, thumbnail: "" });
      } else {
        setPageInfo({ id: "", title: "", desc: "", path: "", thumbnail: "" });
      }
    }
  };

  const fetchTrendingPosts = async (idcat, newLimit) => {
    if (trendLoading) return;
    setTrendLoading(true);
    const formData = new FormData();
    formData.append("idcat", idcat);
    formData.append("limit", newLimit);
    formData.append("hal", "0");
    try {
      const postsdata = await apiRead(formData, "main", "cattrendingnew");
      setTrendingPostData(postsdata && postsdata.length > 0 ? postsdata : []);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setTrendLoading(false);
    }
  };

  const fetchLatestPosts = async (idcat) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("idcat", idcat);
    formData.append("limit", "3");
    formData.append("hal", "0");
    try {
      const postsdata = await apiRead(formData, "main", "categorynew");
      setLatestPostData(postsdata && postsdata.length > 0 ? postsdata : []);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedPosts = async (idcat, newLimit) => {
    if (feedsLoading) return;
    setFeedsLoading(true);
    const formData = new FormData();
    formData.append("idcat", idcat);
    formData.append("limit", newLimit);
    formData.append("hal", "0");
    let data;
    try {
      switch (postsFilter) {
        case "update":
          data = await apiRead(formData, "main", "categorynew");
          setFeedPostData(data && data.length > 0 ? data : []);
          break;
        case "hot":
          data = await apiRead(formData, "main", "cattrendingnew");
          setFeedPostData(data && data.length > 0 ? data : []);
          break;
        default:
          setFeedPostData([]);
          break;
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setFeedsLoading(false);
    }
  };

  const renderAds = (item) => <AdBanner alt={item.label} src={item.image} />;

  useEffect(() => {
    setTrendLimit(11);
  }, [category]);

  useEffect(() => {
    setFeedLimit(10);
  }, [category, postsFilter]);

  useEffect(() => {
    getPageInfo();
  }, [category, categoryData]);

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
    if (pageInfo.id) {
      fetchTrendingPosts(pageInfo.id, trendLimit);
    }
  }, [pageInfo.id, trendLimit]);

  useEffect(() => {
    if (pageInfo.id) {
      fetchLatestPosts(pageInfo.id);
    }
  }, [pageInfo.id]);

  useEffect(() => {
    if (pageInfo.id) {
      fetchFeedPosts(pageInfo.id, feedLimit);
    }
  }, [pageInfo.id, feedLimit, postsFilter]);

  return (
    <Fragment>
      <SEO title={pageInfo.title} route={pageInfo.path} />
      <PageLayout pageid={id}>
        <NewsSliderSection noHead content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        <TagsSection tags={trendingTagData} />
        <HeroSection>
          {trendingPostData.length > 0 && (
            <Container300>
              <NewsDisplayCard id={`${id}-${trendingPostData[0].id}`} title={trendingPostData[0].judul_berita} short={trendingPostData[0].isi_berita} tag={trendingPostData[0].nama_kategori_berita} image={trendingPostData[0].img_berita} loc={trendingPostData[0].penulis_berita} date={trendingPostData[0].tanggal_berita} height={width < 464 ? "var(--pixel-350)" : "var(--pixel-550)"} flex="1" onClick={() => navigate(`/berita/${trendingPostData[0].slug}`)} />
            </Container300>
          )}
          <Aside>
            <NewsSummaryGroup id={id} isPortrait={width < 464 ? true : false} title="Trending" posts={trendingPostData.slice(1)} setLimit={setTrendLimit} loading={trendLoading} />
          </Aside>
        </HeroSection>
        <NewsSliderSection noHead content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        <NewsHscrollSection scope="Terbaru">
          {latestPostData.slice(0, 3).map((post, index) => (
            <NewsCard id={id} key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={post.img_berita} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
          ))}
        </NewsHscrollSection>
        <NewsHscrollSection scope="Populer">
          {trendingPostData.slice(0, 3).map((post, index) => (
            <NewsCard id={id} key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={post.img_berita} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
          ))}
        </NewsHscrollSection>
        <FeedsSection>
          <FeedsGroup id={id} postsFilter={postsFilter} setPostsFilter={setPostsFilter} setLimit={setFeedLimit} loading={feedsLoading}>
            {feedPostData.map((post, index) => (
              <NewsFeedCard key={index} id={id} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={post.img_berita} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
            ))}
          </FeedsGroup>
          <Aside>
            <InlineadsSection label="" src="/img/inline-ads.webp" />
          </Aside>
        </FeedsSection>
        <NewsHscrollSection scope="Rekomendasi">
          {trendingPostData.slice(0, 3).map((post, index) => (
            <NewsCard id={id} key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={post.img_berita} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
          ))}
        </NewsHscrollSection>
        <NewsSliderSection noHead content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
      </PageLayout>
    </Fragment>
  );
};

export default CategoryPage;
