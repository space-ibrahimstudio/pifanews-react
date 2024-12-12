import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { useDocument, toPathname } from "../libs/plugins/helpers";
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

const SearchPage = () => {
  const navigate = useNavigate();
  const { query } = useParams();
  const { width } = useWindow();
  const { short } = useDocument();
  const { apiRead, apiGet } = useApi();
  const { H1, Span } = useGraph();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(12);
  const [searchedData, setSearchedData] = useState([]);
  const [ads, setAds] = useState([]);
  const [trendTagData, setTrendTagData] = useState([]);

  const id = `${short}-${toPathname(query)}`;

  const fetchTagPosts = async (newLimit) => {
    if (loading) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("search", query);
    formData.append("limit", newLimit);
    try {
      const searchdata = await apiRead(formData, "main", "searchnew");
      if (searchdata && searchdata.data && searchdata.data.length > 0) {
        setSearchedData(searchdata.data);
      } else {
        setSearchedData([]);
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
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
  }, [query]);

  useEffect(() => {
    fetchTagPosts(limit);
  }, [query, limit]);

  return (
    <Fragment>
      <SEO title={`Pencarian "${query}"`} route={`/pencarian/${query}`} />
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
            {`Hasil pencarian: `}
            <Span color="var(--color-primary)">{query}</Span>
            {searchedData.length <= 0 && ` tidak ditemukan.`}
          </H1>
        </Header>
        <Container isWrap justifyContent="center" gap="var(--pixel-10)" minHeight={searchedData.length > 0 ? "unset" : "80vh"}>
          {searchedData.length > 0 && (
            <Fragment>
              <FeedsGroup id={id} noFilter setLimit={setLimit} loading={loading}>
                {searchedData.map((post, index) => (
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

export default SearchPage;
