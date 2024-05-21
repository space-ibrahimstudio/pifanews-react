import React from "react";
import { useContent, useFormat } from "@ibrahimstudio/react";
import { NewsTag } from "./markers";
import styles from "./styles/news-card.module.css";
import cat from "./styles/cat-card.module.css";
import display from "./styles/news-display-card.module.css";
import summary from "./styles/news-summary-card.module.css";
import feed from "./styles/news-feed-card.module.css";

const NewsCard = ({ id, title, short, tag, image, loc, date, onClick }) => {
  const { toTitleCase, toPathname, stripContent } = useContent();
  const { newDate } = useFormat();

  const compid = title && tag ? `${id}-news-card-${toPathname(title)}-${toPathname(tag)}` : `${id}-news-card`;
  const cardtitle = title ? toTitleCase(title) : "";
  const carddesc = short ? stripContent(short) : "";
  const cardloc = loc ? toTitleCase(loc) : "";
  const carddate = date ? newDate(date) : "";
  const cardstyle = { backgroundImage: image ? (image !== "" ? `url(${image})` : "url(/img/fallback.jpg)") : "url(/img/fallback.jpg)" };

  return (
    <section id={compid} className={styles.newsCard} onClick={onClick}>
      <div className={styles.cardImage} style={cardstyle}>
        <NewsTag id={compid} name={tag} />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardHead}>
          <h1 className={styles.cardTitle}>{cardtitle}</h1>
          <p className={styles.cardShort}>{carddesc}</p>
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardLocWrap}>
            <h6 className={styles.cardLoc}>{cardloc}</h6>
          </div>
          <h6 className={styles.cardLoc}>{`| ${carddate}`}</h6>
        </div>
      </div>
    </section>
  );
};

export const CatCard = ({ id, catname, image, onClick }) => {
  const { toTitleCase, toPathname } = useContent();
  const compid = catname ? `${id}-category-card-${toPathname(catname)}` : `${id}-category-card`;
  const cardtitle = catname ? toTitleCase(catname) : "";
  const cardstyle = {
    backgroundImage: image ? (image !== "" ? `url(${image})` : "url(/img/fallback.jpg)") : "url(/img/fallback.jpg)",
  };

  return (
    <section id={compid} className={cat.catCard} style={cardstyle} onClick={onClick}>
      <h1 className={cat.cardTitle}>{cardtitle}</h1>
    </section>
  );
};

export const NewsDisplayCard = ({ id, title, short, tag, image, loc, date, align = "stretch", height = "var(--pixel-270)", flex, onClick }) => {
  const { toTitleCase, toPathname, stripContent } = useContent();
  const { newDate } = useFormat();

  const compid = title && tag ? `${id}-display-card-${toPathname(title)}-${toPathname(tag)}` : `${id}-display-card`;
  const cardtitle = title ? toTitleCase(title) : "";
  const carddesc = short ? stripContent(short) : "";
  const cardloc = loc ? toTitleCase(loc) : "";
  const carddate = date ? newDate(date) : "";
  const cardstyle = {
    backgroundImage: image ? (image !== "" ? `url(${image})` : "url(/img/fallback.jpg)") : "url(/img/fallback.jpg)",
    alignSelf: align ? align : "unset",
    height: height ? height : "unset",
    flex: flex ? flex : "unset",
  };

  return (
    <section id={compid} className={display.newsDisplayCard} style={cardstyle} onClick={onClick}>
      <div className={display.cardContent}>
        <NewsTag id={compid} name={tag} />
        <div className={display.cardHead}>
          <h1 className={display.cardTitle}>{cardtitle}</h1>
          <p className={display.cardShort}>{carddesc}</p>
        </div>
        <div className={display.cardInfo}>
          <div className={display.cardLocWrap}>
            <h6 className={display.cardLoc}>{cardloc}</h6>
          </div>
          <h6 className={display.cardLoc}>{`| ${carddate}`}</h6>
        </div>
      </div>
    </section>
  );
};

export const NewsSummaryCard = ({ id, isPortrait, title, tag, image, loc, date, onClick }) => {
  const { toTitleCase, toPathname } = useContent();
  const { newDate } = useFormat();

  const compid = title && tag ? `${id}-summary-card-${toPathname(title)}-${toPathname(tag)}` : `${id}-summary-card`;
  const cardtitle = title ? toTitleCase(title) : "";
  const cardloc = loc ? toTitleCase(loc) : "";
  const carddate = date ? newDate(date) : "";
  const cardstyle = { backgroundImage: image ? (image !== "" ? `url(${image})` : "url(/img/fallback.jpg)") : "url(/img/fallback.jpg)" };

  return (
    <section id={compid} className={`${summary.newsSummaryCard} ${isPortrait ? summary.portrait : summary.landscape}`} onClick={onClick}>
      {isPortrait && (
        <div className={`${summary.cardImage} ${summary.portrait}`} style={cardstyle}>
          <div className={summary.cardLabel}>
            <p className={summary.cardLabelText}>{tag}</p>
          </div>
        </div>
      )}
      <div className={`${summary.cardHead} ${isPortrait ? summary.portrait : summary.landscape}`}>
        <h1 className={summary.cardTitle}>{cardtitle}</h1>
        <div className={summary.cardInfo}>
          <div className={summary.cardLocWrap}>
            <h6 className={summary.cardLoc}>{cardloc}</h6>
          </div>
          <h6 className={summary.cardLoc}>{`| ${carddate}`}</h6>
        </div>
      </div>
      {!isPortrait && (
        <div className={`${summary.cardImage} ${summary.landscape}`} style={cardstyle}>
          <div className={summary.cardLabel}>
            <div className={summary.cardLabelText}>{tag}</div>
          </div>
        </div>
      )}
    </section>
  );
};

export const NewsFeedCard = ({ id, title, short, tag, image, loc, date, onClick }) => {
  const { toTitleCase, toPathname, stripContent } = useContent();
  const { newDate } = useFormat();

  const compid = title && tag ? `${id}-feed-card-${toPathname(title)}-${toPathname(tag)}` : `${id}-feed-card`;
  const cardtitle = title ? toTitleCase(title) : "";
  const carddesc = short ? stripContent(short) : "";
  const cardloc = loc ? toTitleCase(loc) : "";
  const carddate = date ? newDate(date) : "";
  const cardstyle = { backgroundImage: image ? (image !== "" ? `url(${image})` : "url(/img/fallback.jpg)") : "url(/img/fallback.jpg)" };

  return (
    <section id={compid} className={feed.newsFeedCard} onClick={onClick}>
      <div className={feed.cardContent}>
        <div className={feed.cardHead}>
          <h1 className={feed.cardTitle}>{cardtitle}</h1>
          <p className={feed.cardShort}>{carddesc}</p>
        </div>
        <div className={feed.cardInfo}>
          <div className={feed.cardLocWrap}>
            <h6 className={feed.cardLoc}>{cardloc}</h6>
          </div>
          <h6 className={feed.cardLoc}>{`| ${carddate}`}</h6>
        </div>
      </div>
      <div className={feed.cardImage} style={cardstyle}>
        <div className={feed.cardLabel}>
          <p className={feed.cardLabelText}>{tag}</p>
        </div>
      </div>
    </section>
  );
};

export default NewsCard;
