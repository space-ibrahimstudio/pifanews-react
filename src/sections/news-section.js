import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { useApi } from "../libs/plugins/apis";
import { Container } from "../components/layout/frames";
import { SectionHead, TextHint } from "../components/feedback/markers";
import { NewsDisplayCard } from "../components/layout/cards";
import NewsGroup from "../components/layout/groups";
import styles from "./styles/news-section.module.css";

export const NewsSection = ({ id, catId, scope, slug }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindow();
  const { apiRead } = useApi();
  const compid = (slug && `${id}-news-section-berita-${slug}`) || `${id}-news-section`;
  const [latestLoading, setLatestLoading] = useState(false);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [latestLimit, setLatestLimit] = useState(6);
  const [trendingLimit, setTrendingLimit] = useState(5);
  const [latestPostData, setLatestPostData] = useState([]);
  const [trendingPostData, setTrendingPostData] = useState([]);

  const fetchLatestPosts = async (newLimit) => {
    if (latestLoading) return;
    setLatestLoading(true);
    const formData = new FormData();
    formData.append("idcat", catId);
    formData.append("limit", newLimit);
    formData.append("hal", "0");
    try {
      const postsdata = await apiRead(formData, "main", "categorynew");
      setLatestPostData(postsdata && postsdata.data && postsdata.data.length > 0 ? postsdata.data : []);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLatestLoading(false);
    }
  };

  const fetchTrendingPosts = async (newLimit) => {
    if (trendingLoading) return;
    setTrendingLoading(true);
    const formData = new FormData();
    formData.append("idcat", catId);
    formData.append("limit", newLimit);
    formData.append("hal", "0");
    try {
      const postsdata = await apiRead(formData, "main", "cattrendingnew");
      setTrendingPostData(postsdata && postsdata.data && postsdata.data.length > 0 ? postsdata.data : []);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setTrendingLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestPosts(latestLimit);
  }, [latestLimit]);

  useEffect(() => {
    fetchTrendingPosts(trendingLimit);
  }, [trendingLimit]);

  useEffect(() => {
    setLatestLimit(6);
    setTrendingLimit(5);
  }, [location]);

  return (
    <section id={compid} className={styles.newsSection}>
      {/* prettier-ignore */}
      <SectionHead id={compid} title={<Fragment>{`Berita `}<TextHint>{scope}</TextHint></Fragment>} to={`berita/kategori/${slug}`} />
      <div className={styles.sectionBody}>
        <Container isasChild flex="1" direction="row" justifyContent="center" minWidth="var(--pixel-300)">
          {latestPostData.length > 0 && <NewsDisplayCard id={`${compid}-${latestPostData[0].id}`} title={latestPostData[0].judul_berita} short={latestPostData[0].isi_berita} tag={latestPostData[0].nama_kategori_berita} image={latestPostData[0].img_berita} loc={latestPostData[0].penulis_berita} date={latestPostData[0].tanggal_berita} height={width < 464 ? "var(--pixel-270)" : "var(--pixel-450)"} flex="1" onClick={() => navigate(`/berita/${latestPostData[0].slug}`)} />}
        </Container>
        <Container isasChild flex="1" direction="row" justifyContent="center" minWidth="var(--pixel-300)">
          {/* prettier-ignore */}
          <NewsGroup id={`${compid}-newest`} isPortrait={width < 464 ? true : false} title={<Fragment>{`Terbaru di `}<TextHint>{scope}</TextHint></Fragment>} posts={latestPostData.slice(1)} setLimit={setLatestLimit} loading={latestLoading} />
        </Container>
        <Container isasChild flex="1" direction="row" justifyContent="center" minWidth="var(--pixel-300)">
          {/* prettier-ignore */}
          <NewsGroup id={`${compid}-trending`} isPortrait={width > 700 && width < 840 ? true : width < 686 ? true : false} title={<Fragment>{`Trending di `}<TextHint>{scope}</TextHint></Fragment>} posts={trendingPostData} setLimit={setTrendingLimit} loading={trendingLoading} />
        </Container>
      </div>
    </section>
  );
};
