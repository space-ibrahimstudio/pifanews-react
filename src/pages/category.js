import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import useApi from "../libs/plugins/apis";
import { useDocument } from "../libs/plugins/helpers";
import AdSense from "../libs/plugins/adsense";
import { SEO } from "../libs/plugins/seo";
import useLoading from "../components/feedback/loader";
import useGraph from "../components/content/graph";
import { getAdDatas } from "../libs/sources/datas";
import Page, { Container, Section } from "../components/layout/frames";
import Img, { AdBanner } from "../components/media/image";
import Slider from "../components/layout/slider";
import SectionHead from "../components/feedback/markers";
import NewsCard, { NewsDisplayCard, NewsFeedCard } from "../components/layout/cards";
import { NewsSummaryGroup, FeedsGroup } from "../components/layout/groups";
import { TagsButton } from "../components/formel/buttons";

const imgdomain = process.env.REACT_APP_API_URL;

const CategoryPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { short } = useDocument();
  const { width } = useWindow();
  const { apiGet, apiRead } = useApi();
  const { setLoading } = useLoading();
  const { H1, Span } = useGraph();
  const [pageInfo, setPageInfo] = useState({ id: "", title: "", desc: "", path: "", thumbnail: "" });
  const [latestPostData, setLatestPostData] = useState([]);
  const [trendingPostData, setTrendingPostData] = useState([]);
  const [postsFilter, setPostsFilter] = useState("latest");
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
        if (selectedcat && selectedcat.length > 0) {
          setPageInfo({ id: selectedcat[0].id, title: selectedcat[0].nama_kategori_berita, desc: selectedcat[0].desc, path: `/berita/kategori/${selectedcat[0].slug}`, thumbnail: `${imgdomain}/images/img_berita/${selectedcat[0].img_berita}` });
        } else {
          setPageInfo({ id: "", title: "404 NOT FOUND", desc: "", path: "", thumbnail: "" });
          navigate("404-not-found");
        }
      } else {
        setPageInfo({ id: "", title: "404 NOT FOUND", desc: "", path: "", thumbnail: "" });
        navigate("404-not-found");
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
        case "latest":
          data = await apiRead(formData, "main", "categorynew");
          setFeedPostData(data && data.data && data.data.length > 0 ? data.data : []);
          break;
        case "hot":
          data = await apiRead(formData, "main", "cattrendingnew");
          setFeedPostData(data && data.data && data.data.length > 0 ? data.data : []);
          break;
        case "popular":
          data = await apiRead(formData, "main", "popularcatnew");
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
      <SEO title={pageInfo.title} description={pageInfo.desc} extThumbSrc={pageInfo.thumbnail} route={pageInfo.path} />
      <Page pageid={id}>
        <Container alignItems="center" gap="var(--pixel-10)">
          <Slider content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        </Container>
        <Container alignItems="center" padding={width <= 910 ? (width > 700 ? "0 var(--pixel-30)" : "0 var(--pixel-20)") : "0 var(--pixel-70)"}>
          <Section isWrap justifyContent="center" padding="var(--pixel-10) 0" gap="var(--pixel-10)">
            {trendTagData.map((tag, index) => (
              <TagsButton key={index} text={tag.nama_kategori_tag} onClick={() => navigate(`/berita/tag/${tag.slug}`)} />
            ))}
          </Section>
        </Container>
        <Container isWrap justifyContent="center" gap="var(--pixel-10)">
          {trendingPostData.length > 0 && (
            <Section flex="1" direction="row" justifyContent="center" minWidth="var(--pixel-300)">
              <NewsDisplayCard
                id={`${id}-${trendingPostData[0].id}`}
                title={trendingPostData[0].judul_berita}
                short={trendingPostData[0].isi_berita}
                tag={trendingPostData[0].nama_kategori_berita}
                image={`${imgdomain}/images/img_berita/${trendingPostData[0].img_berita}`}
                loc={trendingPostData[0].penulis_berita}
                date={trendingPostData[0].tanggal_berita}
                slug={`/berita/${trendingPostData[0].slug}`}
                height={width < 464 ? "var(--pixel-350)" : "var(--pixel-550)"}
                flex="1"
                onClick={() => navigate(`/berita/${trendingPostData[0].slug}`)}
              />
            </Section>
          )}
          <Section flex="1" direction="column" alignItems="center" justifyContent="center" minWidth="var(--pixel-300)" maxWidth={width >= 464 ? "var(--pixel-400)" : "unset"} gap="var(--pixel-10)">
            <NewsSummaryGroup id={id} isPortrait={width < 464 ? true : false} title="Trending" to="/berita/insight/trending" posts={trendingPostData.slice(1)} setLimit={setTrendLimit} loading={trendLoading} />
          </Section>
        </Container>
        <Container alignItems="center" gap="var(--pixel-10)">
          <Slider content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        </Container>
        <Container alignItems="center" gap="var(--pixel-10)">
          <SectionHead to="/berita/insight/terbaru">
            <H1>
              {`Berita `}
              <Span color="var(--color-primary)">Terbaru</Span>
            </H1>
          </SectionHead>
          <Section direction="row" gap="var(--pixel-10)" overflow="x-open">
            {latestPostData.slice(0, 3).map((post, index) => (
              <NewsCard key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={`${imgdomain}/images/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} slug={`/berita/${post.slug}`} onClick={() => navigate(`/berita/${post.slug}`)} />
            ))}
          </Section>
        </Container>
        <Container alignItems="center" gap="var(--pixel-10)">
          <SectionHead to="/berita/insight/populer">
            <H1>
              {`Berita `}
              <Span color="var(--color-primary)">Populer</Span>
            </H1>
          </SectionHead>
          <Section direction="row" gap="var(--pixel-10)" overflow="x-open">
            {trendingPostData.slice(0, 3).map((post, index) => (
              <NewsCard key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={`${imgdomain}/images/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} slug={`/berita/${post.slug}`} onClick={() => navigate(`/berita/${post.slug}`)} />
            ))}
          </Section>
        </Container>
        <Container isWrap justifyContent="center" gap="var(--pixel-10)" overflow="unset">
          <FeedsGroup id={id} postsFilter={postsFilter} setPostsFilter={setPostsFilter} setLimit={setFeedLimit} loading={feedsLoading}>
            {feedPostData.map((post, index) => (
              <NewsFeedCard key={index} id={id} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={`${imgdomain}/images/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} slug={`/berita/${post.slug}`} onClick={() => navigate(`/berita/${post.slug}`)} />
            ))}
          </FeedsGroup>
          <Section flex="1" direction="column" alignItems="center" minWidth="var(--pixel-300)" maxWidth={width >= 464 ? "var(--pixel-400)" : "unset"} gap="var(--pixel-10)">
            <Img style={{ borderRadius: "var(--pixel-20)", width: "100%", height: "auto", flexShrink: "0" }} alt="Explore Berbagai Konten Hiburan" src="/img/inline-ads.webp" />
            {/* <AdSense /> */}
          </Section>
        </Container>
        <Container alignItems="center" gap="var(--pixel-10)">
          <SectionHead to="/berita/insight/rekomendasi">
            <H1>
              {`Berita `}
              <Span color="var(--color-primary)">Rekomendasi</Span>
            </H1>
          </SectionHead>
          <Section direction="row" gap="var(--pixel-10)" overflow="x-open">
            {trendingPostData.slice(0, 3).map((post, index) => (
              <NewsCard key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={`${imgdomain}/images/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} slug={`/berita/${post.slug}`} onClick={() => navigate(`/berita/${post.slug}`)} />
            ))}
          </Section>
        </Container>
        <Container alignItems="center" gap="var(--pixel-10)">
          <Slider content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        </Container>
      </Page>
    </Fragment>
  );
};

export default CategoryPage;
