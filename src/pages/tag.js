import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/helpers";
import AdSense from "../libs/plugins/adsense";
import useApi from "../libs/plugins/apis";
import useGraph from "../components/content/graph";
import { SEO } from "../libs/plugins/seo";
import Page, { Section, Header, Container } from "../components/layout/frames";
import Slider from "../components/layout/slider";
import Img, { AdBanner } from "../components/media/image";
import { TagsButton } from "../components/formel/buttons";
import { FeedsGroup } from "../components/layout/groups";
import { NewsFeedCard } from "../components/layout/cards";

const imgdomain = process.env.REACT_APP_API_URL;

const TagPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { short } = useDocument();
  const { width } = useWindow();
  const { apiRead, apiGet } = useApi();
  const { H1, Span } = useGraph();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(12);
  const [pageInfo, setPageInfo] = useState({ title: "", desc: "", path: "", thumbnail: "" });
  const [tagPostData, setTagPostData] = useState([]);
  const [ads, setAds] = useState([]);
  const [trendTagData, setTrendTagData] = useState([]);

  const id = (slug && `${short}-${slug}`) || `${short}-tag`;

  const fetchTrendTagData = async () => {
    try {
      const response = await apiGet("main", "viewtag");
      setTrendTagData(response && response.data && response.data.length > 0 ? response.data : []);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const fetchTagPosts = async (newLimit) => {
    if (loading) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("tag", slug);
    formData.append("limit", newLimit);
    try {
      const tagdata = await apiRead(formData, "main", "tagnew");
      if (tagdata && tagdata.data && tagdata.data.length > 0) {
        const firstidxdata = tagdata.data[0];
        setTagPostData(tagdata.data);
        setPageInfo({ title: firstidxdata.name, desc: "", path: `/berita/tag/${firstidxdata.tag}`, thumbnail: "" });
      } else {
        setTagPostData([]);
        setPageInfo({ title: "", desc: "", path: "", thumbnail: "" });
      }
    } catch (error) {
      console.error("error:", error);
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
  }, [slug]);

  useEffect(() => {
    fetchTagPosts(limit);
  }, [slug, limit]);

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
            {`Topik berita: `}
            <Span color="var(--color-primary)">{pageInfo.title}</Span>
            {tagPostData.length <= 0 && ` tidak ditemukan.`}
          </H1>
        </Header>
        <Container isWrap justifyContent="center" gap="var(--pixel-10)" minHeight={tagPostData.length > 0 ? "unset" : "80vh"}>
          {tagPostData.length > 0 && (
            <Fragment>
              <FeedsGroup id={id} noFilter setLimit={setLimit} loading={loading}>
                {tagPostData.map((post, index) => (
                  <NewsFeedCard key={index} id={id} title={post["berita"][0].judul_berita} short={post["berita"][0].isi_berita} tag={post["berita"][0].nama_kategori_berita} image={`${imgdomain}/images/img_berita/${post["berita"][0].img_berita}`} loc={post["berita"][0].penulis_berita} date={post["berita"][0].tanggal_berita} slug={`/berita/${post["berita"][0].slug}`} onClick={() => navigate(`/berita/${post["berita"][0].slug}`)} />
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

export default TagPage;
