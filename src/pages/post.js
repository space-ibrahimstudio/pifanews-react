import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/helpers";
import useLoading from "../components/feedback/loader";
import useApi from "../libs/plugins/apis";
import useGraph from "../components/content/graph";
import { getAdDatas } from "../libs/sources/datas";
import { SEO } from "../libs/plugins/seo";
import Page, { Container, Section } from "../components/layout/frames";
import Slider from "../components/layout/slider";
import Article from "../components/content/article";
import Image, { AdBanner } from "../components/media/image";
import NewsCard from "../components/layout/cards";
import SectionHead from "../components/feedback/markers";
import { NewsSummaryGroup } from "../components/layout/groups";

const imgdomain = process.env.REACT_APP_API_URL;

const PostPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { short } = useDocument();
  const { width } = useWindow();
  const { apiRead, apiGet } = useApi();
  const { setLoading } = useLoading();
  const { H1, Span } = useGraph();
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
        setPageInfo({ title: selecteddata.judul_berita, desc: selecteddata.isi_berita, path: `/berita/${selecteddata.slug}`, thumbnail: `${imgdomain}/images/img_berita/${selecteddata.img_berita}` });
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
      <SEO title={pageInfo.title} description={pageInfo.desc} route={pageInfo.path} extThumbSrc={pageInfo.thumbnail} isPost category={catPostData && catPostData.nama_kategori_berita} author={postDetailData.penulis_berita} datecreate={postDetailData.created_at} dateupdate={postDetailData.updated_at} />
      <Page pageid={id}>
        <Container gap="var(--pixel-10)" alignItems="center">
          <Section direction={width > 930 ? "row" : "column"} justifyContent="center" gap="var(--pixel-10)" textAlign="left">
            <Section flex="1" alignItems="center" gap="var(--pixel-10)">
              <Image style={{ width: "100%", height: "auto", position: "relative", borderRadius: "var(--pixel-20)", overflow: "hidden" }} alt={postDetailData.thumnail_berita} src={postDetailData.img_berita && `${imgdomain}/images/img_berita/${postDetailData.img_berita}`} />
              <i style={{ position: "relative", color: "var(--color-secondary)", opacity: "0.5", fontFamily: "var(--font-inter)", fontSize: "var(--font-tiny)", fontWeight: "500", textAlign: "left", alignSelf: "stretch", marginLeft: "var(--pixel-20)", marginRight: "var(--pixel-20)" }}>{postDetailData.thumnail_berita}</i>
              <Article paths={paths} title={postDetailData.judul_berita} loc={postDetailData.penulis_berita} date={postDetailData.tanggal_berita} content={postDetailData.isi_berita} />
            </Section>
            <Section cwidth="100%" direction={width > 930 ? "column" : width <= 450 ? "column" : "row"} maxWidth={width <= 930 ? "100%" : "var(--pixel-400)"} gap="var(--pixel-10)">
              <NewsSummaryGroup id={id} style={{ flexShrink: "unset" }} isPortrait={width <= 450 ? true : false} title="Rekomendasi" posts={trendingPostData.filter((item) => item.slug !== slug)} setLimit={setTrendLimit} loading={trendLoading} />
              <Image style={{ borderRadius: "var(--pixel-20)", width: "100%", height: "auto", flexShrink: "0" }} alt="Explore Berbagai Konten Hiburan" src="/img/inline-ads.webp" />
            </Section>
          </Section>
        </Container>
        <Container alignItems="center" gap="var(--pixel-10)">
          <SectionHead>
            <H1>
              {`Berita `}
              <Span color="var(--color-primary)">Terkait</Span>
            </H1>
          </SectionHead>
          <Section direction="row" gap="var(--pixel-10)" overflowX="auto">
            {relatedPostData.map((post, index) => (
              <NewsCard key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={`${imgdomain}/images/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} onClick={() => navigate(`/berita/${post.slug}`)} />
            ))}
          </Section>
        </Container>
        <Container alignItems="center" gap="var(--pixel-10)">
          <Slider content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        </Container>
      </Page>
    </Fragment>
  );
};

export default PostPage;
