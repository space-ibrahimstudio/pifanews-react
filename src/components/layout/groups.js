import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContent, useWindow, useFormat } from "@ibrahimstudio/react";
import { Input } from "@ibrahimstudio/input";
import useApi from "../../libs/plugins/apis";
import { toPathname } from "../../libs/plugins/helpers";
import { LoadingContent } from "../feedback/loader";
import { SourceButton } from "../formel/buttons";
import { NewsSummaryCard, NewsDisplayCard } from "./cards";
import { Section } from "./frames";
import newcss from "./styles/news-group.module.css";
import sumcss from "./styles/news-summary-group.module.css";
import feecss from "./styles/feeds-group.module.css";

const imgdomain = process.env.REACT_APP_API_URL;

export const SectionGroup = ({ id, catId, scope, slug }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindow();
  const { apiRead } = useApi();
  const compid = `${id}-section-group-${slug}`;
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
    <Section id={compid} isWrap justifyContent="center" gap="var(--pixel-10)">
      <Section flex="1" direction="row" justifyContent="center" minWidth="var(--pixel-300)">
        {latestPostData.length > 0 && (
          <NewsDisplayCard id={compid} title={latestPostData[0].judul_berita} short={latestPostData[0].isi_berita} tag={latestPostData[0].nama_kategori_berita} image={`${imgdomain}/images/img_berita/${latestPostData[0].img_berita}`} loc={latestPostData[0].penulis_berita} date={latestPostData[0].tanggal_berita} slug={`/berita/${latestPostData[0].slug}`} height={width < 464 ? "var(--pixel-270)" : "var(--pixel-450)"} flex="1" onClick={() => navigate(`/berita/${latestPostData[0].slug}`)} />
        )}
      </Section>
      <Section flex="1" direction="row" justifyContent="center" minWidth="var(--pixel-300)">
        <NewsGroup id={`${compid}-newest`} isPortrait={width < 464 ? true : false} title="Terbaru" scope={scope} posts={latestPostData.slice(1)} setLimit={setLatestLimit} loading={latestLoading} />
      </Section>
      <Section flex="1" direction="row" justifyContent="center" minWidth="var(--pixel-300)">
        <NewsGroup id={`${compid}-trending`} isPortrait={width > 700 && width < 840 ? true : width < 686 ? true : false} title="Trending" scope={scope} posts={trendingPostData} setLimit={setTrendingLimit} loading={trendingLoading} />
      </Section>
    </Section>
  );
};

export const News3Group = ({ id, posts = [] }) => {
  const navigate = useNavigate();
  const compid = `${id}-3-group`;
  const basestyles = { display: "flex", alignItems: "center", justifyContent: "center" };

  return (
    <section id={compid} style={{ ...basestyles, flex: "1", flexDirection: "column", minWidth: "var(--pixel-300)", overflow: "hidden", gap: "var(--pixel-10)" }}>
      {posts.length > 0 && <NewsDisplayCard id={compid} title={posts[0].judul_berita} short={posts[0].isi_berita.substring(0, 160)} tag={posts[0].nama_kategori_berita} count={posts[0].counter} image={`${imgdomain}/images/img_berita/${posts[0].img_berita}`} loc={posts[0].penulis_berita} date={posts[0].tanggal_berita} slug={`/berita/${posts[0].slug}`} align="stretch" height="var(--pixel-270)" onClick={() => navigate(`/berita/${posts[0].slug}`)} />}
      <aside style={{ ...basestyles, alignSelf: "stretch", flexDirection: "row", flexWrap: "wrap", overflow: "hidden", gap: "var(--pixel-10)" }}>
        {posts.slice(1).map((post, index) => (
          <div key={index} style={{ ...basestyles, flex: "1", flexDirection: "column", minWidth: "var(--pixel-200)" }}>
            <NewsDisplayCard id={compid} title={post.judul_berita} short={post.isi_berita.substring(0, 160)} tag={post.nama_kategori_berita} image={`${imgdomain}/images/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} slug={`/berita/${post.slug}`} align="stretch" height="var(--pixel-270)" onClick={() => navigate(`/berita/${post.slug}`)} />
          </div>
        ))}
      </aside>
    </section>
  );
};

export const CompanyGroup = ({ id, style, isPortrait = false, title, posts = [] }) => {
  const navigate = useNavigate();
  const { newDate } = useFormat();
  const compid = (title && `${id}-company-group-${toPathname(title)}`) || `${id}-company-group`;

  return (
    <section id={compid} className={`${sumcss.newsSummaryGroup} ${isPortrait ? "" : sumcss.landscape}`} style={style}>
      <header className={sumcss.groupHead}>
        <div className={sumcss.groupHeadwrap}>
          <div className={sumcss.groupTitlewrap}>
            <h1 className={sumcss.groupTitle}>{title}</h1>
          </div>
        </div>
      </header>
      <section className={`${sumcss.groupBodyVscroll} ${isPortrait ? sumcss.portrait : sumcss.landscape}`}>
        <div className={`${sumcss.groupBody} ${isPortrait ? sumcss.portrait : sumcss.landscape}`}>
          {posts.map((post, index) => (
            <NewsSummaryCard key={index} isPortrait={isPortrait} id={`${compid}-${index}`} title={post.title} image={post.image} loc={post.author} date={newDate(post.date, "id")} slug={`/informasi/${post.slug}`} onClick={() => navigate(`/informasi/${post.slug}`)} />
          ))}
        </div>
      </section>
    </section>
  );
};

export const NewsSummaryGroup = ({ id, style, variant, isPortrait = false, noSource = false, title, posts = [], setLimit, loading = false, to = "/" }) => {
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
          {!noSource && <SourceButton id={compid} to={to} />}
        </div>
      </header>
      <section ref={isPortrait ? null : ref} className={`${sumcss.groupBodyVscroll} ${isPortrait ? sumcss.portrait : sumcss.landscape}`}>
        <div ref={isPortrait ? ref : null} className={`${sumcss.groupBody} ${isPortrait ? sumcss.portrait : sumcss.landscape}`}>
          {posts.map((post, index) => (
            <NewsSummaryCard key={index} isPortrait={isPortrait} id={`${compid}-${index}`} title={post.judul_berita} tag={post.nama_kategori_berita} image={`${imgdomain}/images/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} slug={`/berita/${post.slug}`} onClick={() => navigate(`/berita/${post.slug}`)} />
          ))}
          {loading && <LoadingContent />}
        </div>
      </section>
    </section>
  );
};

export const FeedsGroup = ({ id, noFilter = false, postsFilter, setPostsFilter, setLimit, loading = false, children }) => {
  const ref = useRef(null);
  const compid = `${id}-feeds-group`;

  const switchFilter = [
    { label: "Terbaru", value: "latest" },
    { label: "Populer", value: "popular" },
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
        {!noFilter && <Input id={`${compid}-switch-filter`} variant="select" noEmptyValue isLabeled={false} baseColor="var(--color-secondlight)" placeholder="Filter Jenis Berita" value={postsFilter} options={switchFilter} onSelect={switchStatus} />}
      </header>
      <div ref={ref} className={feecss.feedsBody}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === Fragment) {
              return (
                <Fragment>
                  {React.Children.map(child.props.children, (fragmentChild) => {
                    if (React.isValidElement(fragmentChild)) {
                      const combinedId = fragmentChild.props.id ? `${compid}-${fragmentChild.props.id}` : compid;
                      return React.cloneElement(fragmentChild, { id: combinedId });
                    }
                    return fragmentChild;
                  })}
                </Fragment>
              );
            }
            const combinedId = child.props.id ? `${compid}-${child.props.id}` : compid;
            return React.cloneElement(child, { id: combinedId });
          }
          return child;
        })}
        {loading && <LoadingContent />}
      </div>
    </section>
  );
};

const NewsGroup = ({ id, isPortrait = false, title = "Terbaru", scope = "", posts = [], setLimit, loading = false }) => {
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
            <h1 className={newcss.groupTitle}>
              {`${title} di `}
              <span style={{ color: "var(--color-primary)" }}>{scope}</span>
            </h1>
          </div>
        </div>
      </header>
      <section ref={isPortrait ? null : ref} className={`${newcss.groupBodyVscroll} ${isPortrait ? newcss.portrait : newcss.landscape}`}>
        <div ref={isPortrait ? ref : null} className={`${newcss.groupBody} ${isPortrait ? newcss.portrait : newcss.landscape}`}>
          {posts.map((post, index) => (
            <NewsSummaryCard key={index} isPortrait={isPortrait} id={`${compid}-${index}`} title={post.judul_berita} tag={post.nama_kategori_berita} image={`${imgdomain}/images/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} slug={`/berita/${post.slug}`} onClick={() => navigate(`/berita/${post.slug}`)} />
          ))}
          {loading && <LoadingContent />}
        </div>
      </section>
    </section>
  );
};

export default NewsGroup;
