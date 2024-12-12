import React, { Fragment, useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useWindow, useFormat } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/helpers";
import AdSense from "../libs/plugins/adsense";
import useLoading from "../components/feedback/loader";
import useApi from "../libs/plugins/apis";
import { getStaticPosts } from "../libs/sources/datas";
import { SEO } from "../libs/plugins/seo";
import Page, { Container, Section } from "../components/layout/frames";
import Slider from "../components/layout/slider";
import Article from "../components/content/article";
import Img, { AdBanner } from "../components/media/image";
import { CompanyGroup } from "../components/layout/groups";

const imgdomain = process.env.REACT_APP_API_URL;

const CompanyPage = () => {
  const { cslug } = useParams();
  const { short } = useDocument();
  const { width } = useWindow();
  const { newDate } = useFormat();
  const { apiGet } = useApi();
  const { setLoading } = useLoading();
  const [pageData, setPageData] = useState([]);
  const [pageInfo, setPageInfo] = useState({ title: "", desc: "", content: "", created: "", updated: "", path: "", thumbnail: "" });
  const [staticPostData, setStaticPostData] = useState([]);
  const [ads, setAds] = useState([]);

  const id = (cslug && `${short}-${cslug}`) || `${short}-slug`;

  const fetchData = async () => {
    const errormsg = "Terjadi kesalahan saat memuat halaman. Mohon periksa koneksi internet anda dan coba lagi.";
    let response;
    let data;
    setLoading(true);
    try {
      switch (cslug) {
        case "syarat-ketentuan":
          response = await apiGet("main", "condition");
          if (response && response.data && response.data.length > 0) {
            data = response.data[0];
            setPageData(data);
            setPageInfo({ title: "Syarat & Ketentuan", content: data.syarat, created: data.created_at, updated: data.updated_at, path: `/informasi/${cslug}`, thumbnail: `/img/${cslug}.jpg` });
          } else {
            setPageData(null);
            setPageInfo({ title: "404 NOT FOUND", content: "", created: "", updated: "", path: "", thumbnail: "" });
          }
          break;
        case "tentang-pifa":
          response = await apiGet("main", "about");
          if (response && response.data && response.data.length > 0) {
            data = response.data[0];
            setPageData(data);
            setPageInfo({ title: "Tentang Pifa", content: data.tentang, created: data.created_at, updated: data.updated_at, path: `/informasi/${cslug}`, thumbnail: `/img/${cslug}.jpg` });
          } else {
            setPageData(null);
            setPageInfo({ title: "404 NOT FOUND", content: "", created: "", updated: "", path: "" });
          }
          break;
        case "kebijakan-privasi":
          response = await apiGet("main", "privacy");
          if (response && response.data && response.data.length > 0) {
            data = response.data[0];
            setPageData(data);
            setPageInfo({ title: "Kebijakan Privasi", content: data.kebijakan, created: data.created_at, updated: data.updated_at, path: `/informasi/${cslug}`, thumbnail: `/img/${cslug}.jpg` });
          } else {
            setPageData(null);
            setPageInfo({ title: "404 NOT FOUND", content: "", created: "", updated: "", path: "" });
          }
          break;
        case "faq":
          response = await apiGet("main", "faq");
          if (response && response.data && response.data.length > 0) {
            data = response.data[0];
            setPageData(data);
            setPageInfo({ title: "Bantuan (FAQ)", content: data.bantuan, created: data.created_at, updated: data.updated_at, path: `/informasi/${cslug}`, thumbnail: `/img/${cslug}.jpg` });
          } else {
            setPageData(null);
            setPageInfo({ title: "404 NOT FOUND", content: "", created: "", updated: "", path: "" });
          }
          break;
        case "kode-etik-jurnalistik":
          response = await apiGet("main", "ethics");
          if (response && response.data && response.data.length > 0) {
            data = response.data[0];
            setPageData(data);
            setPageInfo({ title: "Kode Etik Jurnalistik", content: data.kode, created: data.created_at, updated: data.updated_at, path: `/informasi/${cslug}`, thumbnail: `/img/${cslug}.jpg` });
          } else {
            setPageData(null);
            setPageInfo({ title: "404 NOT FOUND", content: "", created: "", updated: "", path: "" });
          }
          break;
        case "pasang-iklan":
          response = await apiGet("main", "advertise");
          if (response && response.data && response.data.length > 0) {
            data = response.data[0];
            setPageData(data);
            setPageInfo({ title: "Beriklan", content: data.beriklan, created: data.created_at, updated: data.updated_at, path: `/informasi/${cslug}`, thumbnail: `/img/${cslug}.jpg` });
          } else {
            setPageData(null);
            setPageInfo({ title: "404 NOT FOUND", content: "", created: "", updated: "", path: "" });
          }
          break;
        case "pedoman-media-siber":
          response = await apiGet("main", "guidelines");
          if (response && response.data && response.data.length > 0) {
            data = response.data[0];
            setPageData(data);
            setPageInfo({ title: "Pedoman Media Siber", content: data.pedoman, created: data.created_at, updated: data.updated_at, path: `/informasi/${cslug}`, thumbnail: `/img/${cslug}.jpg` });
          } else {
            setPageData(null);
            setPageInfo({ title: "404 NOT FOUND", content: "", created: "", updated: "", path: "" });
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

  const fetchStaticData = async () => {
    try {
      const post = await getStaticPosts();
      setStaticPostData(post);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const paths = [
    { label: "Beranda", url: "/" },
    { label: pageInfo.title, url: pageInfo.path },
  ];

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
    fetchData();
    fetchStaticData();
    fetchBannerData();
  }, [cslug]);

  if (pageData === null) {
    return <Navigate to="404-not-found" replace />;
  }

  return (
    <Fragment>
      <SEO title={pageInfo.title} description={pageInfo.content} route={pageInfo.path} extThumbSrc={pageInfo.thumbnail} isPost category="Company" author="Admin" />
      <Page pageid={id}>
        <Container gap="var(--pixel-10)" alignItems="center">
          <Section direction={width > 930 ? "row" : "column"} justifyContent="center" gap="var(--pixel-10)" textAlign="left">
            <Section flex="1" alignItems="center" gap="var(--pixel-10)">
              <Img style={{ width: "100%", height: "auto", position: "relative", borderRadius: "var(--pixel-20)", overflow: "hidden" }} alt={pageInfo.title} src={`/img/${cslug}.jpg`} />
              <Article paths={paths} title={pageInfo.title} loc="Pontianak" date={`Diterbitkan pada ${newDate(pageInfo.created, "id")} - Diperbarui pada ${newDate(pageInfo.updated, "id")}`} content={pageInfo.content} />
            </Section>
            <Section cwidth="100%" direction={width > 930 ? "column" : width <= 450 ? "column" : "row"} maxWidth={width <= 930 ? "100%" : "var(--pixel-400)"} gap="var(--pixel-10)">
              <CompanyGroup id={id} style={{ flexShrink: "unset" }} isPortrait={width <= 450 ? true : false} title="Baca Juga" posts={staticPostData.filter((item) => item.slug !== cslug)} />
              <Img style={{ borderRadius: "var(--pixel-20)", width: "100%", height: "auto", flexShrink: "0" }} alt="Explore Berbagai Konten Hiburan" src="/img/inline-ads.webp" />
              {/* <AdSense /> */}
            </Section>
          </Section>
        </Container>
        <Container alignItems="center" gap="var(--pixel-10)">
          <Slider content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        </Container>
      </Page>
    </Fragment>
  );
};

export default CompanyPage;
