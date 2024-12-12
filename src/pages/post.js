import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/helpers";
import useLoading from "../components/feedback/loader";
import useApi from "../libs/plugins/apis";
import AdSense from "../libs/plugins/adsense";
import useGraph from "../components/content/graph";
import { SEO } from "../libs/plugins/seo";
import Page, { Container, Section } from "../components/layout/frames";
import Slider from "../components/layout/slider";
import Article from "../components/content/article";
import Img, { AdBanner, PostImage } from "../components/media/image";
import { TagsButton } from "../components/formel/buttons";
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
  const { H1, Span, P } = useGraph();
  const [pageInfo, setPageInfo] = useState({ title: "", cat: "", desc: "", path: "", cat_path: "", thumbnail: "" });
  const [postDetailData, setPostDetailData] = useState([]);
  const [postTags, setPostTags] = useState([]);
  const [trendLimit, setTrendLimit] = useState(10);
  const [trendLoading, setTrendLoading] = useState(false);
  const [trendingPostData, setTrendingPostData] = useState([]);
  const [ads, setAds] = useState([]);
  const [relatedPostData, setRelatedPostData] = useState([]);

  const id = (slug && `${short}-${slug}`) || `${short}-slug`;

  const fetchDetailPost = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("slug", slug);
    try {
      const postdetail = await apiRead(formData, "main", "detailnew2");
      if (postdetail && postdetail.data) {
        const selecteddata = postdetail.data;
        setPostDetailData(selecteddata.berita);
        setPostTags(selecteddata.tag);
        const catnews = await apiGet("main", "categorynew");
        if (catnews && catnews.data && catnews.data.length > 0) {
          const selectedcat = catnews.data.find((cat) => cat.id === selecteddata.berita.nama_kategori_berita_id);
          if (selectedcat) {
            setPageInfo({ title: selecteddata.berita.judul_berita, desc: selecteddata.berita.isi_berita, path: `/berita/${selecteddata.berita.slug}`, thumbnail: `${imgdomain}/images/img_berita/${selecteddata.berita.img_berita}`, cat: selectedcat.nama_kategori_berita, cat_path: `/berita/kategori/${selectedcat.slug}` });
          } else {
            setPageInfo({ title: selecteddata.berita.judul_berita, desc: selecteddata.berita.isi_berita, path: `/berita/${selecteddata.berita.slug}`, thumbnail: `${imgdomain}/images/img_berita/${selecteddata.berita.img_berita}`, cat: "N/A", cat_path: "/" });
          }
        } else {
          setPageInfo({ title: selecteddata.berita.judul_berita, desc: selecteddata.berita.isi_berita, path: `/berita/${selecteddata.berita.slug}`, thumbnail: `${imgdomain}/images/img_berita/${selecteddata.berita.img_berita}`, cat: "N/A", cat_path: "/" });
        }
      } else {
        setPostDetailData(null);
        setPostTags([]);
        setPageInfo({ title: "", desc: "", path: "", thumbnail: "", cat: "", cat_path: "" });
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
    { label: pageInfo.cat, url: pageInfo.cat_path },
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
    setTrendLimit(10);
    fetchRelatedPosts();
    fetchBannerData();
  }, [slug]);

  useEffect(() => {
    fetchTrendingPosts(trendLimit);
  }, [trendLimit]);

  useEffect(() => {
    fetchDetailPost();
  }, [slug, location.pathname]);

  if (postDetailData === null) {
    return <Navigate to="404-not-found" replace />;
  }

  return (
    <Fragment>
      <SEO title={pageInfo.title} description={pageInfo.desc} route={pageInfo.path} extThumbSrc={pageInfo.thumbnail} isPost category={pageInfo.cat} author={postDetailData.penulis_berita} datecreate={postDetailData.created_at} dateupdate={postDetailData.updated_at} />
      <Page pageid={id}>
        <Container gap="var(--pixel-10)" alignItems="center">
          <Section direction={width > 930 ? "row" : "column"} justifyContent="center" gap="var(--pixel-10)" textAlign="left">
            <Section flex="1" alignItems="center" gap="var(--pixel-10)">
              <PostImage width="100%" height="auto" alt={postDetailData.thumnail_berita} src={postDetailData.img_berita && `${imgdomain}/images/img_berita/${postDetailData.img_berita}`} />
              <Section padding="0 var(--pixel-20) 0 var(--pixel-20)">
                <P flex="unset" size="tiny" opacity="0.5" style="italic">
                  {postDetailData.thumnail_berita}
                </P>
              </Section>
              <Article paths={paths} title={postDetailData.judul_berita} loc={postDetailData.penulis_berita} date={postDetailData.tanggal_berita} content={postDetailData.isi_berita} />
              <Section isWrap padding="var(--pixel-10) var(--pixel-20) 0 var(--pixel-20)" gap="var(--pixel-10)">
                {postTags.map((item, index) => (
                  <TagsButton key={index} text={item.nama_kategori_tag} onClick={() => navigate(`/berita/tag/${item.slug}`)} />
                ))}
              </Section>
            </Section>
            <Section cwidth="100%" maxWidth={width <= 930 ? "100%" : "var(--pixel-400)"} gap="var(--pixel-10)">
              <NewsSummaryGroup id={id} style={{ flexShrink: "unset" }} isPortrait={width <= 930} title="Rekomendasi" to="/berita/insight/rekomendasi" posts={trendingPostData.filter((item) => item.slug !== slug)} setLimit={setTrendLimit} loading={trendLoading} />
              <Img style={{ borderRadius: "var(--pixel-20)", width: "100%", height: "auto", flexShrink: "0" }} alt="COBLOS NO 1" src={width <= 930 ? "/img/ad/wide-5.png" : "/img/ad/narrow-1.png"} />
              {/* <AdSense /> */}
            </Section>
          </Section>
        </Container>
        <Container alignItems="center" gap="var(--pixel-10)">
          <SectionHead noSource>
            <H1>
              {`Berita `}
              <Span color="var(--color-primary)">Terkait</Span>
            </H1>
          </SectionHead>
          <Section direction="row" gap="var(--pixel-10)" overflow="x-open">
            {relatedPostData.map((post, index) => (
              <NewsCard key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={`${imgdomain}/images/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} slug={`/berita/${post.slug}`} onClick={() => navigate(`/berita/${post.slug}`)} />
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
