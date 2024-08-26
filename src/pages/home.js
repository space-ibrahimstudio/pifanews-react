import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/document";
import { useFetch } from "../libs/plugins/fetch";
import { useApi } from "../libs/plugins/api";
import { getInfographicPosts, getAdDatas } from "../libs/sources/local-data";
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
  const location = useLocation();
  const { apiRead } = useApi();
  const { categoryData, localCatData, latestPostData, popularPostData, trendingTagData } = useFetch();
  const id = `${short}-home`;
  const [limit, setLimit] = useState(13);
  const [loading, setLoading] = useState(false);
  const [trendingPostData, setTrendingPostData] = useState([]);
  const [graphicPosts, setGraphicPosts] = useState([]);
  const [ads, setAds] = useState([]);

  const renderInfographic = (item) => <InfographicCard title={item.title} image={item.image} count={item.count} status={item.status} />;
  const renderLocalCat = (item) => <CatCard catname={item.nama_kategori_daerah} image={item.img} />;
  const renderAds = (item) => <AdBanner alt={item.label} src={item.image} />;

  const fetchTrendingPostData = async (newLimit) => {
    if (loading) return;
    const formData = new FormData();
    formData.append("limit", newLimit);
    formData.append("hal", "0");
    setLoading(true);
    try {
      const trendingdata = await apiRead(formData, "main", "trendingnew");
      setTrendingPostData(trendingdata && trendingdata.data && trendingdata.data.length > 0 ? trendingdata.data : []);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  };

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
    fetchTrendingPostData(limit);
  }, [location, limit]);

  useEffect(() => {
    setLimit(13);
  }, [location]);

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
        <TagsSection tags={trendingTagData} />
        <HeroSection>
          <News3Grid id={id} posts={trendingPostData} />
          <Aside>
            <NewsSummaryGroup id={id} isPortrait={width < 464 ? true : false} variant="primary" title="Trending" posts={trendingPostData.slice(3)} setLimit={setLimit} loading={loading} />
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
