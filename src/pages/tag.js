import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/helpers";
import { useApi } from "../libs/plugins/apis";
import { getAdDatas } from "../libs/sources/datas";
import { SEO } from "../libs/plugins/seo";
import Page from "../components/layout/frames";
import { AdBanner } from "../components/media/image";
import { TagsSection } from "../sections/tags-section";
import { NewsSliderSection } from "../sections/news-slider-section";
import { PageTitle, TextHint } from "../components/feedback/markers";
import { FeedsSection } from "../sections/feeds-section";
import { Container } from "../components/layout/frames";
import { InlineadsSection } from "../sections/inlineads-section";
import { FeedsGroup } from "../components/layout/groups";
import { NewsFeedCard } from "../components/layout/cards";

const TagPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { short } = useDocument();
  const { width } = useWindow();
  const { apiRead, apiGet } = useApi();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(12);
  const [pageInfo, setPageInfo] = useState({ title: "", desc: "", path: "", thumbnail: "" });
  const [tagPostData, setTagPostData] = useState([]);
  const [ads, setAds] = useState([]);
  const [trendTagData, setTrendTagData] = useState([]);
  const [postsFilter, setPostsFilter] = useState("update");

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

  const renderAds = (item) => <AdBanner alt={item.label} src={item.image} />;

  useEffect(() => {
    setLimit(12);
    fetchTrendTagData();
  }, [slug]);

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
    fetchTagPosts(limit);
  }, [slug, limit]);

  return (
    <Fragment>
      <SEO title={pageInfo.title} route={pageInfo.path} />
      <Page pageid={id}>
        <NewsSliderSection noHead content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        <TagsSection tags={trendTagData} />
        <PageTitle>
          {`Topik berita: `}
          <TextHint>{pageInfo.title}</TextHint>
        </PageTitle>
        <FeedsSection>
          <FeedsGroup id={id} postsFilter={postsFilter} setPostsFilter={setPostsFilter} setLimit={setLimit} loading={loading}>
            {tagPostData.map((post, index) => (
              <NewsFeedCard key={index} id={id} title={post["berita"][0].judul_berita} short={post["berita"][0].isi_berita} tag={post["berita"][0].nama_kategori_berita} image={post["berita"][0].img_berita} loc={post["berita"][0].penulis_berita} date={post["berita"][0].tanggal_berita} onClick={() => navigate(`/berita/${post["berita"][0].slug}`)} />
            ))}
          </FeedsGroup>
          <Container isasChild flex="1" direction="column" alignItems="center" minWidth="var(--pixel-300)" maxWidth={width >= 464 ? "var(--pixel-400)" : "unset"} gap="var(--pixel-10)">
            <InlineadsSection label="" src="/img/inline-ads.webp" />
          </Container>
        </FeedsSection>
      </Page>
    </Fragment>
  );
};

export default TagPage;
