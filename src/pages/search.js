import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContent, useWindow } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/helpers";
import { useApi } from "../libs/plugins/apis";
import { getAdDatas } from "../libs/sources/datas";
import { SEO } from "../libs/plugins/seo";
import Page from "../components/layout/frames";
import { AdBanner } from "../components/media/image";
import { FeedsSection } from "../sections/feeds-section";
import { InlineadsSection } from "../sections/inlineads-section";
import { TagsSection } from "../sections/tags-section";
import { NewsSliderSection } from "../sections/news-slider-section";
import { FeedsGroup } from "../components/layout/groups";
import { Container } from "../components/layout/frames";
import { PageTitle, TextHint } from "../components/feedback/markers";
import { NewsFeedCard } from "../components/layout/cards";

const SearchPage = () => {
  const navigate = useNavigate();
  const { query } = useParams();
  const { toPathname } = useContent();
  const { width } = useWindow();
  const { short } = useDocument();
  const { apiRead, apiGet } = useApi();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(12);
  const [searchedData, setSearchedData] = useState([]);
  const [ads, setAds] = useState([]);
  const [postsFilter, setPostsFilter] = useState("update");
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

  const renderAds = (item) => <AdBanner alt={item.label} src={item.image} />;

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
    setLimit(12);
    fetchTrendTagData();
  }, [query]);

  useEffect(() => {
    fetchTagPosts(limit);
  }, [query, limit]);

  return (
    <Fragment>
      <SEO title={`Pencarian "${query}"`} route={`/pencarian/${query}`} />
      <Page pageid={id}>
        <NewsSliderSection noHead content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        <TagsSection tags={trendTagData} />
        <PageTitle>
          {`Hasil pencarian: `}
          <TextHint>{query}</TextHint>
        </PageTitle>
        <FeedsSection>
          <FeedsGroup id={id} postsFilter={postsFilter} setPostsFilter={setPostsFilter} setLimit={setLimit} loading={loading}>
            {searchedData.map((post, index) => (
              <NewsFeedCard key={index} id={id} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={post.img_berita} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
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

export default SearchPage;
