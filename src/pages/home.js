import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useWindow } from "@ibrahimstudio/react";
import useApi from "../libs/plugins/apis";
import { useDocument } from "../libs/plugins/helpers";
import { SEO } from "../libs/plugins/seo";
import { getAdDatas } from "../libs/sources/datas";
import useGraph from "../components/content/graph";
import SectionHead from "../components/feedback/markers";
import NewsCard, { CatAdmCard } from "../components/layout/cards";
import Page, { Container, Section } from "../components/layout/frames";
import Grid from "../components/layout/grids";
import Slider from "../components/layout/slider";
import { AdBanner } from "../components/media/image";

const imgdomain = process.env.REACT_APP_API_URL;

const HomePage = () => {
  const { width } = useWindow();
  const { short } = useDocument();
  const navigate = useNavigate();
  const location = useLocation();
  const { apiGet } = useApi();
  const { H1, Span } = useGraph();
  const id = `${short}-home`;
  const [ads, setAds] = useState([]);
  const [topEventData, setTopEventData] = useState([]);
  const [latestEventData, setLatestEventData] = useState([]);

  const renderAds = (item) => <AdBanner alt={item.label} src={item.image} />;

  const fetchLatestEvents = async () => {
    try {
      const data = await apiGet("event", "showevent");
      setLatestEventData(data && data.data && data.data.length > 0 ? data.data : []);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const fetchTopEvents = async () => {
    try {
      const data = await apiGet("event", "showeventrandom");
      setTopEventData(data && data.data && data.data.length > 0 ? data.data : []);
    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    fetchLatestEvents();
    fetchTopEvents();
  }, [location]);

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

  return (
    <Fragment>
      <SEO title="Beranda" route="/" />
      <Page pageid={id}>
        <Container alignItems="center" gap="var(--pixel-10)">
          <Slider content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        </Container>
        <Container alignItems="center" gap="var(--pixel-10)">
          <SectionHead>
            <H1>
              {`Event `}
              <Span color="var(--color-primary)">Teratas</Span>
            </H1>
          </SectionHead>
          <Section direction="row" gap="var(--pixel-10)" overflowX="auto">
            {topEventData.slice(0, 3).map((item, index) => (
              <NewsCard key={index} title={item.title} short={`${item.descripiton} | ${item.highlight}`} image={`${imgdomain}/images/event/${item.img}`} loc={item.info} date={item.tanggal} onClick={() => navigate(`/event/${item.slug}`)} />
            ))}
          </Section>
        </Container>
        <Container alignItems="center" gap="var(--pixel-10)">
          <SectionHead noSource>
            <H1>
              {`Event `}
              <Span color="var(--color-primary)">Terbaru</Span>
            </H1>
          </SectionHead>
          <Grid gridTemplateRows={width < 464 ? "repeat(2, auto)" : "unset"} gridTemplateColumns={width < 464 ? "repeat(auto-fill, minmax(var(--pixel-350), 1fr))" : "repeat(auto-fill, minmax(var(--pixel-300), 1fr))"} gap="var(--pixel-10)">
            {latestEventData.map((item, index) => (
              <Fragment key={index}>
                {width >= 464 && <NewsCard title={item.title} short={`${item.descripiton} | ${item.highlight}`} image={`${imgdomain}/images/event/${item.img}`} loc={item.info} date={item.tanggal} onClick={() => navigate(`/event/${item.slug}`)} />}
                {width < 464 && <CatAdmCard title={item.title} short={item.descripiton} image={`${imgdomain}/images/event/${item.img}`} onEdit={() => navigate(`/event/${item.slug}`)} />}
              </Fragment>
            ))}
          </Grid>
        </Container>
        <Container alignItems="center" gap="var(--pixel-10)">
          <Slider content={ads} renderContent={renderAds} contentStyle={{ minWidth: "100%" }} />
        </Container>
      </Page>
    </Fragment>
  );
};

export default HomePage;
