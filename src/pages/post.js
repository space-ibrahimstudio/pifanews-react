import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/document";
import { useLoading } from "../components/contents/loader";
import { useApi } from "../libs/plugins/api";
import { getAdDatas } from "../libs/sources/local-data";
import { SEO } from "../libs/plugins/seo";
import { PageLayout } from "../components/layouts/pages";
import PostdetSection, { PostdetContent, PostdetArticle, PostdetAside } from "../components/layouts/postdet";
import { AdBanner } from "../components/contents/image";
import NewsCard from "../components/contents/cards";
import { NewsSummaryGroup } from "../components/contents/groups";
import { NewsHscrollSection } from "../sections/news-hscroll-section";
import { NewsSliderSection } from "../sections/news-slider-section";
import { InlineadsSection } from "../sections/inlineads-section";

const imgURL = process.env.REACT_APP_IMAGE_URL;

const PostPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { short } = useDocument();
  const { width } = useWindow();
  const { apiRead, apiGet } = useApi();
  const { setLoading } = useLoading();
  const [pageInfo, setPageInfo] = useState({ title: "", desc: "", path: "", thumbnail: "" });
  const [postDetailData, setPostDetailData] = useState([]);
  const [trendLimit, setTrendLimit] = useState(10);
  const [trendLoading, setTrendLoading] = useState(false);
  const [trendingPostData, setTrendingPostData] = useState([]);
  const [catPostData, setCatPostData] = useState(null);
  const [ads, setAds] = useState([]);
  const [relatedPostData, setRelatedPostData] = useState([]);

  const id = (slug && `${short}-${slug}`) || `${short}-slug`;
  const fetchDetailPost = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("slug", slug);
    try {
      const postdetail = await apiRead(formData, "main", "detailnew");
      if (postdetail && postdetail.data && postdetail.data.length > 0) {
        const selecteddata = postdetail.data[0];
        setPostDetailData(selecteddata);
        setPageInfo({ title: selecteddata.judul_berita, desc: selecteddata.isi_berita, path: `/berita/${selecteddata.slug}`, thumbnail: `${imgURL}/${selecteddata.img_berita}` });
        const catnews = await apiGet("main", "categorynew");
        if (catnews && catnews.data && catnews.data.length > 0) {
          const selectedcat = catnews.data.find((cat) => cat.id === selecteddata.nama_kategori_berita_id);
          setCatPostData(selectedcat ? selectedcat : null);
        }
      } else {
        setPostDetailData(null);
        setPageInfo({ title: "", desc: "", path: "", thumbnail: "" });
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingPosts = async (newLimit) => {
    if (trendLoading) return;
    setTrendLoading(true);
    const formData = new FormData();
    formData.append("limit", newLimit);
    formData.append("hal", "0");
    try {
      const trendingdata = await apiRead(formData, "main", "trendingnew");
      setTrendingPostData(trendingdata && trendingdata.data && trendingdata.data.length > 0 ? trendingdata.data : []);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setTrendLoading(false);
    }
  };

  const fetchRelatedPosts = async () => {
    const formData = new FormData();
    formData.append("limit", "3");
    formData.append("hal", "0");
    try {
      const postsdata = await apiRead(formData, "main", "relatednew");
      setRelatedPostData(postsdata && postsdata.data && postsdata.data.length > 0 ? postsdata.data : []);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const paths = [
    { label: "Beranda", url: "/" },
    { label: catPostData && catPostData.nama_kategori_berita, url: catPostData && `/berita/kategori/${catPostData.slug}` },
    { label: pageInfo.title, url: `/berita/${postDetailData.slug}` },
  ];

  const renderAds = (item) => <AdBanner alt={item.label} src={item.image} />;

  useEffect(() => {
    setTrendLimit(10);
    fetchRelatedPosts();
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
    fetchTrendingPosts(trendLimit);
  }, [trendLimit]);

  useEffect(() => {
    fetchDetailPost();
  }, [slug, location.pathname]);

  return (
    <Fragment>
      <SEO title={pageInfo.title} description={pageInfo.desc} route={pageInfo.path} extThumbSrc={pageInfo.thumbnail} />
      <PageLayout pageid={id}>
        <PostdetSection>
          <PostdetContent>
            <PostdetArticle id={id} paths={paths} title={postDetailData.judul_berita} loc={postDetailData.penulis_berita} date={postDetailData.tanggal_berita} thumbnail={postDetailData.thumnail_berita} image={postDetailData.img_berita && postDetailData.img_berita} content={postDetailData.isi_berita} />
            <PostdetAside>
              <NewsSummaryGroup id={id} style={{ flexShrink: "unset" }} isPortrait={width <= 450 ? true : false} title="Rekomendasi" posts={trendingPostData} setLimit={setTrendLimit} loading={trendLoading} />
              <InlineadsSection label="" src="/img/inline-ads.webp" />
            </PostdetAside>
          </PostdetContent>
        </PostdetSection>
        <NewsHscrollSection scope="Terkait">
          {relatedPostData.map((post, index) => (
            <NewsCard id={id} key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={post.img_berita} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
          ))}
        </NewsHscrollSection>
        <NewsSliderSection noHead content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
      </PageLayout>
    </Fragment>
  );
};

export default PostPage;
