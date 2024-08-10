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
import NewsCard, { NewsDisplayCard } from "../components/contents/cards";
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
  const [ads, setAds] = useState([]);

  const id = (category && `${short}-${category}`) || `${short}-category`;

  const getPageInfo = () => {
    if (categoryData && categoryData.length > 0) {
      const pageinfo = categoryData.filter((cat) => cat.slug === category);
      if (pageinfo && pageinfo.length > 0) {
        setPageInfo({ id: pageinfo[0].id, title: pageinfo[0].nama_kategori_berita, desc: "", path: `/${pageinfo[0].slug}`, thumbnail: "" });
      } else {
        setPageInfo({ id: "", title: "", desc: "", path: "", thumbnail: "" });
      }
    }
  };

  const fetchLatestPosts = async (idcat) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("idcat", idcat);
    formData.append("limit", "11");
    formData.append("hal", "0");
    try {
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

  const fetchTrendingPosts = async (idcat) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("idcat", idcat);
    formData.append("limit", "10");
    formData.append("hal", "0");
    try {
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
    getPageInfo();
  }, [category, categoryData]);

  useEffect(() => {
    if (pageInfo.id) {
      fetchLatestPosts(pageInfo.id);
      fetchTrendingPosts(pageInfo.id);
    }
  }, [pageInfo.id]);

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
            <NewsSummaryGroup id={id} isPortrait={width < 464 ? true : false} title="Trending" posts={trendingPostData.slice(1, 10)} />
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
          <FeedsGroup id={id} category={category} />
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
