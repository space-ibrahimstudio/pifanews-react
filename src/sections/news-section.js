import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { useApi } from "../libs/plugins/api";
import { useLoading } from "../components/contents/loader";
import { SectionHead } from "../components/contents/markers";
import Container300 from "../components/layouts/containers";
import { NewsDisplayCard } from "../components/contents/cards";
import NewsGroup from "../components/contents/groups";
import styles from "./styles/news-section.module.css";

export const NewsSection = ({ id, catId, prior, slug }) => {
  const navigate = useNavigate();
  const { width } = useWindow();
  const { apiRead } = useApi();
  const { setLoading } = useLoading();
  const formData = new FormData();
  const compid = slug ? `${id}-news-section-berita-${slug}` : `${id}-news-section`;
  const [latestPostData, setLatestPostData] = useState([]);
  const [trendingPostData, setTrendingPostData] = useState([]);

  const fetchLatestPosts = async () => {
    setLoading(true);
    try {
      formData.append("idcat", catId);
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
    setLoading(true);
    try {
      formData.append("idcat", catId);
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
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLatestPosts();
    fetchTrendingPosts();
  }, []);

  return (
    <section id={compid} className={styles.newsSection}>
      <SectionHead id={compid} title="Berita" prior={prior} to={slug} />
      <div className={styles.sectionBody}>
        <Container300>
          {latestPostData.length > 0 && (
            <NewsDisplayCard id={`${compid}-${latestPostData[0].id}`} title={latestPostData[0].judul_berita} short={latestPostData[0].isi_berita} tag={latestPostData[0].nama_kategori_berita} image={`https://pifa.co.id/img_berita/${latestPostData[0].img_berita}`} loc={latestPostData[0].penulis_berita} date={latestPostData[0].tanggal_berita} height={width < 464 ? "var(--pixel-270)" : "var(--pixel-450)"} flex="1" onClick={() => navigate(`/berita/${latestPostData[0].slug}`)} />
          )}
        </Container300>
        <Container300>
          <NewsGroup id={`${compid}-newest`} isPortrait={width > 700 && width < 840 ? true : width < 686 ? true : false} title="Terbaru" scope={prior} posts={latestPostData.slice(1, 10)} />
        </Container300>
        <Container300>
          <NewsGroup id={`${compid}-trending`} isPortrait={width < 464 ? true : false} title="Trending" scope={prior} posts={trendingPostData} />
        </Container300>
      </div>
    </section>
  );
};
