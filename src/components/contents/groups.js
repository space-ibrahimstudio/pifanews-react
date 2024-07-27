import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "@ibrahimstudio/react";
import { useApi } from "../../libs/plugins/api";
import { useFetch } from "../../libs/plugins/fetch";
import { Input } from "@ibrahimstudio/input";
import { SourceButton } from "../user-inputs/buttons";
import { NewsSummaryCard, NewsFeedCard } from "./cards";
import { LoadingContent } from "./loader";
import styles from "./styles/news-group.module.css";
import summary from "./styles/news-summary-group.module.css";
import feed from "./styles/feeds-group.module.css";

const NewsGroup = ({ id, isPortrait, title, scope, posts }) => {
  const navigate = useNavigate();
  const { toPathname } = useContent();
  const compid = title && scope ? `${id}-news-group-${toPathname(title)}-${toPathname(scope)}` : `${id}-news-group`;

  return (
    <section id={compid} className={`${styles.newsGroup} ${isPortrait ? "" : styles.landscape}`}>
      <header className={styles.groupHead}>
        <div className={styles.groupHeadwrap}>
          <div className={styles.groupTitlewrap}>
            <h1 className={styles.groupTitle}>
              <span>{`${title} di `}</span>
              <span className={styles.textHint}>{scope}</span>
            </h1>
          </div>
        </div>
      </header>
      <div className={`${styles.groupBodyVscroll} ${isPortrait ? styles.portrait : styles.landscape}`}>
        <div className={`${styles.groupBody} ${isPortrait ? styles.portrait : styles.landscape}`}>
          {posts.map((post, index) => (
            <NewsSummaryCard key={index} isPortrait={isPortrait} id={`${compid}-${index}`} title={post.judul_berita} tag={post.nama_kategori_berita} image={`https://pifa.co.id/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const NewsSummaryGroup = ({ id, style, variant, isPortrait, title, posts }) => {
  const navigate = useNavigate();
  const { toTitleCase, toPathname } = useContent();
  const compid = title ? `${id}-summary-group-${toPathname(title)}` : `${id}-summary-group`;
  const grouptitle = title ? toTitleCase(title) : "";
  const groupto = title ? `/${toPathname(title)}` : "/";

  return (
    <section id={compid} className={`${summary.newsSummaryGroup} ${isPortrait ? "" : summary.landscape} ${variant === "primary" ? summary.primary : ""}`} style={style}>
      <header className={summary.groupHead}>
        <div className={summary.groupHeadwrap}>
          <div className={summary.groupTitlewrap}>
            <h1 className={summary.groupTitle}>{grouptitle}</h1>
          </div>
          <SourceButton id={compid} to={groupto} />
        </div>
      </header>
      <div className={`${summary.groupBodyVscroll} ${isPortrait ? summary.portrait : summary.landscape}`}>
        <div className={`${summary.groupBody} ${isPortrait ? summary.portrait : summary.landscape}`}>
          {posts.map((post, index) => (
            <NewsSummaryCard key={index} isPortrait={isPortrait} id={`${compid}-${index}`} title={post.judul_berita} tag={post.nama_kategori_berita} image={`https://pifa.co.id/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const FeedsGroup = ({ id, category, filter = "popular" }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { apiRead } = useApi();
  const { categoryData } = useFetch();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [postsFilter, setPostsFilter] = useState(filter);

  const compid = `${id}-feeds-group`;

  const switchFilter = [
    { label: "Terbaru", value: "update" },
    { label: "Trending", value: "hot" },
    { label: "Populer", value: "popular" },
  ];

  const switchStatus = (value) => setPostsFilter(value);

  const fetchLatestPosts = async (newLimit) => {
    const idcat = categoryData.find((cat) => cat.slug === category)?.id;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("idcat", idcat);
      formData.append("limit", newLimit);
      formData.append("hal", "0");
      const postsdata = await apiRead(formData, "main", "categorynew");
      if (postsdata && postsdata.length > 0) {
        setPosts(postsdata);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        setLimit((prevLimit) => prevLimit + 10);
      }
    }
  };

  useEffect(() => {
    fetchLatestPosts(limit);
  }, [limit]);

  useEffect(() => {
    const feedsBodyEl = ref.current;
    if (feedsBodyEl) {
      feedsBodyEl.addEventListener("scroll", handleScroll);
      return () => {
        feedsBodyEl.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <section id={compid} className={feed.feedsGroup}>
      <header className={feed.feedsHead}>
        <div className={feed.feedsTitlewrap}>
          <h1 className={feed.feedsTitle}>Feeds</h1>
        </div>
        <Input id={`${compid}-switch-filter`} variant="select" isLabeled={false} baseColor="var(--color-secondlight)" placeholder="Filter Jenis Berita" value={postsFilter} options={switchFilter} onSelect={switchStatus} />
      </header>
      <div ref={ref} className={feed.feedsBody}>
        {posts.map((post, index) => (
          <NewsFeedCard key={index} id={`${compid}-${index}`} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={`https://pifa.co.id/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
        ))}
        {loading && <LoadingContent />}
      </div>
    </section>
  );
};

export default NewsGroup;
