import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDocument } from "../libs/plugins/document";
import { useLoading } from "../components/contents/loader";
import { useApi } from "../libs/plugins/api";
import { getAdDatas } from "../libs/sources/local-data";
import { SEO } from "../libs/plugins/seo";
import { PageLayout } from "../components/layouts/pages";
import { AdBanner } from "../components/contents/image";
import { NewsGridSection } from "../sections/news-grid-section";
import NewsCard from "../components/contents/cards";
import { NewsSliderSection } from "../sections/news-slider-section";

const TagPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { short } = useDocument();
  const { apiRead } = useApi();
  const { setLoading } = useLoading();
  const [pageInfo, setPageInfo] = useState({ title: "", desc: "", path: "", thumbnail: "" });
  const [tagPostData, setTagPostData] = useState([]);
  const [ads, setAds] = useState([]);

  const id = (slug && `${short}-${slug}`) || `${short}-tag`;

  const fetchTagPosts = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("tag", slug);
    formData.append("limit", "10");
    try {
      const tagdata = await apiRead(formData, "main", "tagnew");
      if (tagdata && tagdata.length > 0) {
        setTagPostData(tagdata);
        setPageInfo({ title: tagdata[0].name, desc: "", path: `/topic/${tagdata[0].tag}`, thumbnail: "" });
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
    fetchTagPosts();
  }, [slug]);

  return (
    <Fragment>
      <SEO title={pageInfo.title} route={pageInfo.path} />
      <PageLayout pageid={id}>
        <NewsSliderSection noHead content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        <h1></h1>
        <NewsGridSection scope={pageInfo.title}>
          {tagPostData.map((post, index) => (
            <NewsCard id={id} key={index} title={post["berita"][0].judul_berita} short={post["berita"][0].isi_berita} tag={post["berita"][0].nama_kategori_berita} image={post["berita"][0].img_berita} loc={post["berita"][0].penulis_berita} date={post["berita"][0].tanggal_berita} onClick={() => navigate(`/berita/${post["berita"][0].slug}`)} />
          ))}
        </NewsGridSection>
      </PageLayout>
    </Fragment>
  );
};

export default TagPage;
