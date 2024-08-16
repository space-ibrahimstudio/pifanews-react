import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDocument } from "../libs/plugins/document";
import { useApi } from "../libs/plugins/api";
import { useFetch } from "../libs/plugins/fetch";
import { getAdDatas } from "../libs/sources/local-data";
import { SEO } from "../libs/plugins/seo";
import { PageLayout } from "../components/layouts/pages";
import { AdBanner } from "../components/contents/image";
import { TagsSection } from "../sections/tags-section";
import { NewsSliderSection } from "../sections/news-slider-section";
import { PageTitle, TextHint } from "../components/contents/markers";
import { FeedsSection } from "../sections/feeds-section";
import { InlineadsSection } from "../sections/inlineads-section";
import { Aside } from "../components/layouts/containers";
import { FeedsGroup } from "../components/contents/groups";
import { NewsFeedCard } from "../components/contents/cards";

const TagPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { short } = useDocument();
  const { apiRead } = useApi();
  const { trendingTagData } = useFetch();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(12);
  const [pageInfo, setPageInfo] = useState({ title: "", desc: "", path: "", thumbnail: "" });
  const [tagPostData, setTagPostData] = useState([]);
  const [ads, setAds] = useState([]);
  const [postsFilter, setPostsFilter] = useState("update");

  const id = (slug && `${short}-${slug}`) || `${short}-tag`;

  const fetchTagPosts = async (newLimit) => {
    if (loading) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("tag", slug);
    formData.append("limit", newLimit);
    try {
      const tagdata = await apiRead(formData, "main", "tagnew");
      if (tagdata && tagdata.length > 0) {
        setTagPostData(tagdata);
        setPageInfo({ title: tagdata[0].name, desc: "", path: `/berita/tag/${tagdata[0].tag}`, thumbnail: "" });
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

  useEffect(() => {
    setLimit(12);
  }, [slug]);

  return (
    <Fragment>
      <SEO title={pageInfo.title} route={pageInfo.path} />
      <PageLayout pageid={id}>
        <NewsSliderSection noHead content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        <TagsSection tags={trendingTagData} />
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
          <Aside>
            <InlineadsSection label="" src="/img/inline-ads.webp" />
          </Aside>
        </FeedsSection>
      </PageLayout>
    </Fragment>
  );
};

export default TagPage;
