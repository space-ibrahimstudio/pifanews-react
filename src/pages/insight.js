import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/helpers";
import AdSense from "../libs/plugins/adsense";
import useApi from "../libs/plugins/apis";
import useGraph from "../components/content/graph";
import { SEO } from "../libs/plugins/seo";
import { TagsButton } from "../components/formel/buttons";
import Page, { Container, Section, Header } from "../components/layout/frames";
import { FeedsGroup } from "../components/layout/groups";
import { NewsFeedCard } from "../components/layout/cards";
import Slider from "../components/layout/slider";
import Img, { AdBanner } from "../components/media/image";

const imgdomain = process.env.REACT_APP_API_URL;

const InsightPage = () => {
  const navigate = useNavigate();
  const { islug } = useParams();
  const { short } = useDocument();
  const { width } = useWindow();
  const { apiRead, apiGet } = useApi();
  const { H1, Span } = useGraph();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(12);
  const [pageData, setPageData] = useState([]);
  const [pageInfo, setPageInfo] = useState({ title: "", desc: "", content: "", created: "", updated: "", path: "", thumbnail: "" });
  const [ads, setAds] = useState([]);
  const [trendTagData, setTrendTagData] = useState([]);

  const id = (islug && `${short}-${islug}`) || `${short}-slug`;

  const fetchTrendTagData = async () => {
    try {
      const response = await apiGet("main", "viewtag");
      setTrendTagData(response && response.data && response.data.length > 0 ? response.data : []);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const fetchData = async (newLimit) => {
    const errormsg = "Terjadi kesalahan saat memuat halaman. Mohon periksa koneksi internet anda dan coba lagi.";
    let response;
    let data;
    if (loading) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("limit", newLimit);
    formData.append("hal", "0");
    try {
      switch (islug) {
        case "terbaru":
          response = await apiRead(formData, "main", "latestnew");
          if (response && response.data && response.data.length > 0) {
            data = response.data;
            setPageData(data);
            setPageInfo({ title: "Berita Terbaru", path: `/berita/insight/${islug}`, thumbnail: "" });
          } else {
            setPageData(null);
            setPageInfo({ title: "404 NOT FOUND", path: "", thumbnail: "" });
          }
          break;
        case "populer":
          response = await apiRead(formData, "main", "popularnew");
          if (response && response.data && response.data.length > 0) {
            data = response.data;
            setPageData(data);
            setPageInfo({ title: "Berita Populer", path: `/berita/insight/${islug}`, thumbnail: "" });
          } else {
            setPageData(null);
            setPageInfo({ title: "404 NOT FOUND", path: "", thumbnail: "" });
          }
          break;
        case "trending":
          response = await apiRead(formData, "main", "trendingnew");
          if (response && response.data && response.data.length > 0) {
            data = response.data;
            setPageData(data);
            setPageInfo({ title: "Berita Trending", path: `/berita/insight/${islug}`, thumbnail: "" });
          } else {
            setPageData(null);
            setPageInfo({ title: "404 NOT FOUND", path: "", thumbnail: "" });
          }
          break;
        case "rekomendasi":
          response = await apiRead(formData, "main", "relatednew");
          if (response && response.data && response.data.length > 0) {
            data = response.data;
            setPageData(data);
            setPageInfo({ title: "Berita Rekomendasi", path: `/berita/insight/${islug}`, thumbnail: "" });
          } else {
            setPageData(null);
            setPageInfo({ title: "404 NOT FOUND", path: "", thumbnail: "" });
          }
          break;
        default:
          setPageData(null);
          break;
      }
    } catch (error) {
      console.error(errormsg, error);
    } finally {
      setLoading(false);
    }
  };

  const renderAds = (item) => <AdBanner alt={item.idbanner} src={`${imgdomain}/images/banner/${item.bannerimg}`} />;

  const fetchBannerData = async () => {
    try {
      const response = await apiGet("main", "bannerview");
      setAds(response && response.data && response.data.length > 0 ? response.data : []);
    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    setLimit(12);
    fetchTrendTagData();
    fetchBannerData();
  }, [islug]);

  useEffect(() => {
    fetchData(limit);
  }, [islug, limit]);

  return (
    <Fragment>
      <SEO title={pageInfo.title} route={pageInfo.path} />
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
        <Header>
          <H1 align="center" color="var(--color-secondary)">
            {pageData.length > 0 && `Menampilkan `}
            <Span color="var(--color-primary)">{pageInfo.title}</Span>
            {pageData.length <= 0 && ` tidak ditemukan.`}
          </H1>
        </Header>
        <Container isWrap justifyContent="center" gap="var(--pixel-10)" minHeight={pageData.length > 0 ? "unset" : "80vh"}>
          {pageData.length > 0 && (
            <Fragment>
              <FeedsGroup id={id} noFilter setLimit={setLimit} loading={loading}>
                {pageData.map((post, index) => (
                  <NewsFeedCard key={index} id={id} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={`${imgdomain}/images/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} slug={`/berita/${post.slug}`} onClick={() => navigate(`/berita/${post.slug}`)} />
                ))}
              </FeedsGroup>
              <Section flex="1" direction="column" alignItems="center" minWidth="var(--pixel-300)" maxWidth={width >= 464 ? "var(--pixel-400)" : "unset"} gap="var(--pixel-10)">
                <Img style={{ borderRadius: "var(--pixel-20)", width: "100%", height: "auto", flexShrink: "0" }} alt="Explore Berbagai Konten Hiburan" src="/img/inline-ads.webp" />
                {/* <AdSense /> */}
              </Section>
            </Fragment>
          )}
        </Container>
      </Page>
    </Fragment>
  );
};

export default InsightPage;
