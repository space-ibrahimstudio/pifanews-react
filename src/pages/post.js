import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import { useDocument } from "../libs/plugins/document";
import { useFetch } from "../libs/plugins/fetch";
import { useApi } from "../libs/plugins/api";
import { getAdDatas } from "../libs/sources/local-data";
import { SEO } from "../libs/plugins/seo";
import { PageLayout } from "../components/layouts/pages";
import { Aside } from "../components/layouts/containers";
import PostdetSection, { PostdetContent, PostdetArticle } from "../components/layouts/postdet";
import { AdBanner } from "../components/contents/image";
import { Image } from "../components/contents/image";
import NewsCard from "../components/contents/cards";
import { NewsSummaryGroup } from "../components/contents/groups";
import { NewsHscrollSection } from "../sections/news-hscroll-section";
import { NewsSliderSection } from "../sections/news-slider-section";
import { InlineadsSection } from "../sections/inlineads-section";

const PostPage = () => {
  const { slug } = useParams();
  const { short } = useDocument();
  const { width } = useWindow();
  const { apiRead } = useApi();
  const { trendingPostData, categoryData } = useFetch();
  const formData = new FormData();
  const [isLoading, setIsLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({ title: "", desc: "", path: "", scope: "", scopeslug: "" });
  const [postDetailData, setPostDetailData] = useState([]);
  const [ads, setAds] = useState([]);

  const id = slug ? `${short}-${slug}` : `${short}-slug`;

  const fetchDetailPost = async () => {
    setIsLoading(true);
    try {
      formData.append("slug", slug);
      const postdetail = await apiRead(formData, "main", "detailnew");
      if (postdetail && postdetail.length > 0) {
        setPostDetailData(postdetail[0]);
        setPageInfo({ title: postdetail[0].judul_berita, desc: postdetail[0].isi_berita, path: `/berita/${postdetail[0].slug}`, scope: categoryData.find((cat) => cat.id === postdetail[0].nama_kategori_berita_id)?.nama_kategori_berita, scopeslug: categoryData.find((cat) => cat.id === postdetail[0].nama_kategori_berita_id)?.slug });
      } else {
        setPostDetailData(null);
        setPageInfo({ title: "", desc: "", path: "" });
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const paths = [
    { label: "Beranda", url: "/" },
    { label: pageInfo.scope, url: `/${pageInfo.scopeslug}` },
    { label: pageInfo.title, url: `/${postDetailData.slug}` },
  ];

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
    fetchDetailPost();
  }, [slug]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Fragment>
      <SEO title={pageInfo.title} description={pageInfo.desc} route={pageInfo.path} />
      <PageLayout pageid={id}>
        <PostdetSection>
          <Image style={{ width: "100%", height: "var(--pixel-400)", position: "relative", borderRadius: "var(--pixel-20)" }} alt={postDetailData.thumnail_berita} src={`https://pifa.co.id/img_berita/${postDetailData.img_berita}`} />
          <PostdetContent>
            <PostdetArticle id={id} paths={paths} title={postDetailData.judul_berita} loc={postDetailData.penulis_berita} date={postDetailData.tanggal_berita} content={postDetailData.isi_berita} />
            <Aside>
              <NewsSummaryGroup id={id} isPortrait={width < 464 ? true : false} variant="primary" title="Rekomendasi" posts={trendingPostData.slice(3, 10)} />
              <InlineadsSection label="" src="/img/inline-ads.webp" />
            </Aside>
          </PostdetContent>
        </PostdetSection>
        <NewsHscrollSection title="Berita" prior="Populer Lainnya">
          {trendingPostData.slice(0, 3).map((post, index) => (
            <NewsCard id={id} key={index} title={post.judul_berita} short={post.isi_berita} tag={post.nama_kategori_berita} image={`https://pifa.co.id/img_berita/${post.img_berita}`} loc={post.penulis_berita} date={post.tanggal_berita} />
          ))}
        </NewsHscrollSection>
        <NewsSliderSection content={ads} renderContent={renderAds} noHead contentStyle={{ minWidth: "100%" }} />
      </PageLayout>
    </Fragment>
  );
};

export default PostPage;
