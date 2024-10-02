import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import useApi from "../libs/plugins/apis";
import { useDocument } from "../libs/plugins/helpers";
import { SEO } from "../libs/plugins/seo";
import { getInfographicPosts, getAdDatas } from "../libs/sources/datas";
import useGraph from "../components/content/graph";
import SectionHead from "../components/feedback/markers";
import { TagsButton } from "../components/formel/buttons";
import NewsCard, { InfographicCard, CatCard } from "../components/layout/cards";
import Page, { Container, Section } from "../components/layout/frames";
import { NewsSummaryGroup, News3Group, SectionGroup } from "../components/layout/groups";
import Slider from "../components/layout/slider";
import { AdBanner } from "../components/media/image";

const imgdomain = process.env.REACT_APP_API_URL;

const HomePage = () => {
  const { width } = useWindow();
  const { short } = useDocument();
  const navigate = useNavigate();
  const location = useLocation();
  const { apiRead, apiGet } = useApi();
  const { H1, Span } = useGraph();
  const id = `${short}-home`;
  const [limit, setLimit] = useState(13);
  const [loading, setLoading] = useState(false);
  const [trendingPostData, setTrendingPostData] = useState([]);
  const [graphicPosts, setGraphicPosts] = useState([]);
  const [ads, setAds] = useState([]);
  const [catNewsData, setCatNewsData] = useState([]);
  const [catLocalData, setCatLocalData] = useState([]);
  const [trendTagData, setTrendTagData] = useState([]);
  const [latestPostData, setLatestPostData] = useState([]);
  const [popularPostData, setPopularPostData] = useState([]);

  const renderInfographic = (item) => <InfographicCard title={item.title} image={item.image} count={item.count} status={item.status} />;
  const renderLocalCat = (item) => <CatCard catname={item.nama_kategori_daerah} image={item.img} onClick={() => window.open(`https://${item.nama_kategori_daerah.toLowerCase().replace(" ", "")}.pifa.co.id`, "_blank")} />;
  const renderAds = (item) => <AdBanner alt={item.label} src={item.image} />;

  const fetchCatNewsData = async () => {
    try {
      const response = await apiGet("main", "categorynew");
      setCatNewsData(response && response.data && response.data.length > 0 ? response.data : []);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const fetchCatLocalData = async () => {
    try {
      const response = await apiGet("main", "categoryarea");
      setCatLocalData(response && response.data && response.data.length > 0 ? response.data : []);
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

  const fetchLatestPosts = async () => {
    const formData = new FormData();
    formData.append("limit", "3");
    formData.append("hal", "0");
    try {
      const postsdata = await apiRead(formData, "main", "latestnew");
      setLatestPostData(postsdata && postsdata.data && postsdata.data.length > 0 ? postsdata.data : []);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const fetchPopularPosts = async () => {
    const formData = new FormData();
    formData.append("limit", "3");
    formData.append("hal", "0");
    try {
      const postsdata = await apiRead(formData, "main", "popularnew");
      setPopularPostData(postsdata && postsdata.data && postsdata.data.length > 0 ? postsdata.data : []);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const adSections = [
    { content: ads, renderContent: renderAds, style: { minWidth: "100%" } },
    { content: ads, renderContent: renderAds, style: { minWidth: "100%" } },
    { content: ads, renderContent: renderAds, style: { minWidth: "100%" } },
  ];

  const combinedSections = [];
  let adIndex = 0;
  for (let i = 0; i < catNewsData.length; i++) {
    const section = catNewsData[i];
    combinedSections.push({ type: "news", data: section });
    if ((i + 1) % 3 === 0 && adIndex < adSections.length) {
      combinedSections.push({ type: "ad", data: adSections[adIndex] });
      adIndex++;
    }
  }

  useEffect(() => {
    fetchCatNewsData();
    fetchLatestPosts();
    fetchCatLocalData();
    fetchTrendTagData();
    fetchPopularPosts();
  }, [location]);

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
          <News3Group posts={trendingPostData.slice(0, 3)} />
          <Section flex="1" direction="column" alignItems="center" justifyContent="center" minWidth="var(--pixel-300)" maxWidth={width >= 464 ? "var(--pixel-400)" : "unset"} gap="var(--pixel-10)">
            <NewsSummaryGroup id={id} isPortrait={width < 464 ? true : false} variant="primary" title="Trending" posts={trendingPostData.slice(3)} setLimit={setLimit} loading={loading} />
          </Section>
        </Container>
        <Container alignItems="center" gap="var(--pixel-10)">
          <SectionHead noSource>
            <H1>
              {`Berita `}
              <Span color="var(--color-primary)">Infografis</Span>
            </H1>
          </SectionHead>
          <Slider content={graphicPosts} renderContent={renderInfographic} />
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
          <Section direction="row" gap="var(--pixel-10)" overflowX="auto">
            {latestPostData.map((post, index) => (
              <NewsCard key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={`${imgdomain}/images/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} slug={`/berita/${post.slug}`} onClick={() => navigate(`/berita/${post.slug}`)} />
            ))}
          </Section>
        </Container>
        <Container alignItems="center" gap="var(--pixel-10)">
          <SectionHead noSource>
            <H1>
              {`Berita `}
              <Span color="var(--color-primary)">Kabar Daerah</Span>
            </H1>
          </SectionHead>
          <Slider content={catLocalData} renderContent={renderLocalCat} />
        </Container>
        <Container alignItems="center" gap="var(--pixel-10)">
          <Slider content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        </Container>
        <Container alignItems="center" gap="var(--pixel-10)">
          <SectionHead to="/berita/insight/populer">
            <H1>
              {`Berita `}
              <Span color="var(--color-primary)">Populer</Span>
            </H1>
          </SectionHead>
          <Section direction="row" gap="var(--pixel-10)" overflowX="auto">
            {popularPostData.map((post, index) => (
              <NewsCard key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={`${imgdomain}/images/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} slug={`/berita/${post.slug}`} onClick={() => navigate(`/berita/${post.slug}`)} />
            ))}
          </Section>
        </Container>
        {combinedSections.map((section, index) => (
          <Fragment key={index}>
            {section.type === "ad" ? (
              <Container alignItems="center" gap="var(--pixel-10)">
                <Slider content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
              </Container>
            ) : (
              <Container alignItems="center" gap="var(--pixel-10)">
                <SectionHead to={`/berita/kategori/${section.data.slug}`}>
                  <H1>
                    {`Berita `}
                    <Span color="var(--color-primary)">{section.data.nama_kategori_berita}</Span>
                  </H1>
                </SectionHead>
                <SectionGroup catId={section.data.id} scope={section.data.nama_kategori_berita} slug={section.data.slug} />
              </Container>
            )}
          </Fragment>
        ))}
      </Page>
    </Fragment>
  );
};

export default HomePage;
