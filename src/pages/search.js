import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContent } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/document";
import { useApi } from "../libs/plugins/api";
import { useFetch } from "../libs/plugins/fetch";
import { getAdDatas } from "../libs/sources/local-data";
import { SEO } from "../libs/plugins/seo";
import { PageLayout } from "../components/layouts/pages";
import { AdBanner } from "../components/contents/image";
import { FeedsSection } from "../sections/feeds-section";
import { InlineadsSection } from "../sections/inlineads-section";
import { TagsSection } from "../sections/tags-section";
import { NewsSliderSection } from "../sections/news-slider-section";
import { FeedsGroup } from "../components/contents/groups";
import { Aside } from "../components/layouts/containers";
import { PageTitle, TextHint } from "../components/contents/markers";
import { NewsFeedCard } from "../components/contents/cards";

const SearchPage = () => {
  const navigate = useNavigate();
  const { query } = useParams();
  const { toPathname } = useContent();
  const { short } = useDocument();
  const { apiRead } = useApi();
  const { trendingTagData } = useFetch();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(12);
  const [searchedData, setSearchedData] = useState([]);
  const [ads, setAds] = useState([]);
  const [postsFilter, setPostsFilter] = useState("update");

  const id = `${short}-${toPathname(query)}`;

  const fetchTagPosts = async (newLimit) => {
    if (loading) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("search", query);
    formData.append("limit", newLimit);
    try {
      const searchdata = await apiRead(formData, "main", "searchnew");
      if (searchdata && searchdata.length > 0) {
        setSearchedData(searchdata);
      } else {
        setSearchedData([]);
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
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
    fetchTagPosts(limit);
  }, [query, limit]);

  useEffect(() => {
    setLimit(12);
  }, [query]);

  return (
    <Fragment>
      <SEO title={`Pencarian "${query}"`} route={`/pencarian/${query}`} />
      <PageLayout pageid={id}>
        <NewsSliderSection noHead content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        <TagsSection tags={trendingTagData} />
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
          <Aside>
            <InlineadsSection label="" src="/img/inline-ads.webp" />
          </Aside>
        </FeedsSection>
      </PageLayout>
    </Fragment>
  );
};

export default SearchPage;
