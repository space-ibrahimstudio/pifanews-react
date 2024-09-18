import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/helpers";
import { useLoading } from "../components/feedback/loader";
import { useApi } from "../libs/plugins/apis";
import { getAdDatas } from "../libs/sources/datas";
import { SEO } from "../libs/plugins/seo";
import Page, { Container } from "../components/layout/frames";
import { AdBanner } from "../components/media/image";
import NewsCard, { NewsDisplayCard, NewsFeedCard } from "../components/layout/cards";
import { NewsSummaryGroup, FeedsGroup } from "../components/layout/groups";
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
  const { apiGet, apiRead } = useApi();
  const { setLoading } = useLoading();
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
  const [trendTagData, setTrendTagData] = useState([]);

  const id = (category && `${short}-${category}`) || `${short}-category`;

  const fetchCatNewsData = async () => {
    try {
      const response = await apiGet("main", "categorynew");
      if (response && response.data && response.data.length > 0) {
        const catnewsdata = response.data;
        const selectedcat = catnewsdata.filter((item) => item.slug === category);
        setPageInfo({ id: selectedcat[0].id, title: selectedcat[0].nama_kategori_berita, desc: "", path: `/berita/kategori/${selectedcat[0].slug}`, thumbnail: "" });
      } else {
        setPageInfo({ id: "", title: "", desc: "", path: "", thumbnail: "" });
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  const fetchTrendTagData = async () => {
    try {
      const response = await apiGet("main", "viewtag");
      setTrendTagData(response && response.data && response.data.length > 0 ? response.data : []);
    } catch (error) {
      console.error("error:", error);
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
      setTrendingPostData(postsdata && postsdata.data && postsdata.data.length > 0 ? postsdata.data : []);
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
      setLatestPostData(postsdata && postsdata.data && postsdata.data.length > 0 ? postsdata.data : []);
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
          setFeedPostData(data && data.data && data.data.length > 0 ? data.data : []);
          break;
        case "hot":
          data = await apiRead(formData, "main", "cattrendingnew");
          setFeedPostData(data && data.data && data.data.length > 0 ? data.data : []);
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
    fetchCatNewsData();
    fetchTrendTagData();
  }, [category]);

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
      <Page pageid={id}>
        <NewsSliderSection noHead content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        <TagsSection tags={trendTagData} />
        <HeroSection>
          {trendingPostData.length > 0 && (
            <Container isasChild flex="1" direction="row" justifyContent="center" minWidth="var(--pixel-300)">
              <NewsDisplayCard id={`${id}-${trendingPostData[0].id}`} title={trendingPostData[0].judul_berita} short={trendingPostData[0].isi_berita} tag={trendingPostData[0].nama_kategori_berita} image={trendingPostData[0].img_berita} loc={trendingPostData[0].penulis_berita} date={trendingPostData[0].tanggal_berita} height={width < 464 ? "var(--pixel-350)" : "var(--pixel-550)"} flex="1" onClick={() => navigate(`/berita/${trendingPostData[0].slug}`)} />
            </Container>
          )}
          <Container isasChild flex="1" direction="column" alignItems="center" justifyContent="center" minWidth="var(--pixel-300)" maxWidth={width >= 464 ? "var(--pixel-400)" : "unset"} gap="var(--pixel-10)">
            <NewsSummaryGroup id={id} isPortrait={width < 464 ? true : false} title="Trending" posts={trendingPostData.slice(1)} setLimit={setTrendLimit} loading={trendLoading} />
          </Container>
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
          <Container isasChild flex="1" direction="column" alignItems="center" minWidth="var(--pixel-300)" maxWidth={width >= 464 ? "var(--pixel-400)" : "unset"} gap="var(--pixel-10)">
            <InlineadsSection label="" src="/img/inline-ads.webp" />
          </Container>
        </FeedsSection>
        <NewsHscrollSection scope="Rekomendasi">
          {trendingPostData.slice(0, 3).map((post, index) => (
            <NewsCard id={id} key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={post.img_berita} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
          ))}
        </NewsHscrollSection>
        <NewsSliderSection noHead content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
      </Page>
    </Fragment>
  );
};

export default CategoryPage;
