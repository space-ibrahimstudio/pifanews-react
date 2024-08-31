import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "@ibrahimstudio/react";
import { Input } from "@ibrahimstudio/input";
import { SourceButton } from "../user-inputs/buttons";
import { NewsSummaryCard } from "./cards";
import { LoadingContent } from "./loader";
import newcss from "./styles/news-group.module.css";
import sumcss from "./styles/news-summary-group.module.css";
import feecss from "./styles/feeds-group.module.css";

const NewsGroup = ({ id, isPortrait = false, title, posts = [], setLimit, loading = false }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const compid = `${id}-news-group`;

  const handleScroll = () => {
    if (ref.current) {
      if (isPortrait) {
        const { scrollLeft, scrollWidth, clientWidth } = ref.current;
        if (scrollLeft + clientWidth >= scrollWidth - 5 && !loading) {
          setLimit((prevLimit) => prevLimit + 5);
        }
      } else {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
          setLimit((prevLimit) => prevLimit + 5);
        }
      }
    }
  };

  useEffect(() => {
    const feedsBodyEl = ref.current;
    if (feedsBodyEl) {
      feedsBodyEl.addEventListener("scroll", handleScroll);
      feedsBodyEl.addEventListener("touchmove", handleScroll);
      return () => {
        feedsBodyEl.removeEventListener("scroll", handleScroll);
        feedsBodyEl.removeEventListener("touchmove", handleScroll);
      };
    }
  }, [loading, isPortrait]);

  return (
    <section id={compid} className={`${newcss.newsGroup} ${isPortrait ? "" : newcss.landscape}`}>
      <header className={newcss.groupHead}>
        <div className={newcss.groupHeadwrap}>
          <div className={newcss.groupTitlewrap}>
            <h1 className={newcss.groupTitle}>{title}</h1>
          </div>
        </div>
      </header>
      <section ref={isPortrait ? null : ref} className={`${newcss.groupBodyVscroll} ${isPortrait ? newcss.portrait : newcss.landscape}`}>
        <div ref={isPortrait ? ref : null} className={`${newcss.groupBody} ${isPortrait ? newcss.portrait : newcss.landscape}`}>
          {posts.map((post, index) => (
            <NewsSummaryCard key={index} isPortrait={isPortrait} id={`${compid}-${index}`} title={post.judul_berita} tag={post.nama_kategori_berita} image={post.img_berita} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
          ))}
          {loading && <LoadingContent />}
        </div>
      </section>
    </section>
  );
};

export const NewsSummaryGroup = ({ id, style, variant, isPortrait = false, title, posts = [], setLimit, loading = false, to = "/" }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { toPathname } = useContent();
  const compid = (title && `${id}-summary-group-${toPathname(title)}`) || `${id}-summary-group`;

  const handleScroll = () => {
    if (ref.current) {
      if (isPortrait) {
        const { scrollLeft, scrollWidth, clientWidth } = ref.current;
        if (scrollLeft + clientWidth >= scrollWidth - 5 && !loading) {
          setLimit((prevLimit) => prevLimit + 10);
        }
      } else {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
          setLimit((prevLimit) => prevLimit + 10);
        }
      }
    }
  };

  useEffect(() => {
    const feedsBodyEl = ref.current;
    if (feedsBodyEl) {
      feedsBodyEl.addEventListener("scroll", handleScroll);
      feedsBodyEl.addEventListener("touchmove", handleScroll);
      return () => {
        feedsBodyEl.removeEventListener("scroll", handleScroll);
        feedsBodyEl.removeEventListener("touchmove", handleScroll);
      };
    }
  }, [loading, isPortrait]);

  return (
    <section id={compid} className={`${sumcss.newsSummaryGroup} ${isPortrait ? "" : sumcss.landscape} ${variant === "primary" ? sumcss.primary : ""}`} style={style}>
      <header className={sumcss.groupHead}>
        <div className={sumcss.groupHeadwrap}>
          <div className={sumcss.groupTitlewrap}>
            <h1 className={sumcss.groupTitle}>{title}</h1>
          </div>
          <SourceButton id={compid} to={to} />
        </div>
      </header>
      <section ref={isPortrait ? null : ref} className={`${sumcss.groupBodyVscroll} ${isPortrait ? sumcss.portrait : sumcss.landscape}`}>
        <div ref={isPortrait ? ref : null} className={`${sumcss.groupBody} ${isPortrait ? sumcss.portrait : sumcss.landscape}`}>
          {posts.map((post, index) => (
            <NewsSummaryCard key={index} isPortrait={isPortrait} id={`${compid}-${index}`} title={post.judul_berita} tag={post.nama_kategori_berita} image={post.img_berita} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
          ))}
          {loading && <LoadingContent />}
        </div>
      </section>
    </section>
  );
};

export const FeedsGroup = ({ id, postsFilter, setPostsFilter, setLimit, loading = false, children }) => {
  const ref = useRef(null);
  const compid = `${id}-feeds-group`;

  const switchFilter = [
    { label: "Terbaru", value: "update" },
    { label: "Trending", value: "hot" },
  ];

  const switchStatus = (value) => setPostsFilter(value);
  const handleScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
        setLimit((prevLimit) => prevLimit + 10);
      }
    }
  };

  useEffect(() => {
    const feedsBodyEl = ref.current;
    if (feedsBodyEl) {
      feedsBodyEl.addEventListener("scroll", handleScroll);
      feedsBodyEl.addEventListener("touchmove", handleScroll);
      return () => {
        feedsBodyEl.removeEventListener("scroll", handleScroll);
        feedsBodyEl.removeEventListener("touchmove", handleScroll);
      };
    }
  }, [loading]);

  return (
    <section id={compid} className={feecss.feedsGroup}>
      <header className={feecss.feedsHead}>
        <div className={feecss.feedsTitlewrap}>
          <h1 className={feecss.feedsTitle}>Feeds</h1>
        </div>
        <Input id={`${compid}-switch-filter`} variant="select" noEmptyValue isLabeled={false} baseColor="var(--color-secondlight)" placeholder="Filter Jenis Berita" value={postsFilter} options={switchFilter} onSelect={switchStatus} />
      </header>
      <div ref={ref} className={feecss.feedsBody}>
        {children}
        {loading && <LoadingContent />}
      </div>
    </section>
  );
};

export default NewsGroup;
