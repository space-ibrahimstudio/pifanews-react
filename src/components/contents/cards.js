import React, { Fragment, useState, useEffect } from "react";
import { useContent } from "@ibrahimstudio/react";
import { useAuth } from "../../libs/security/auth";
import { NewsTag, NewsCount } from "./markers";
import imgcss from "./styles/image-card.module.css";
import newcss from "./styles/news-card.module.css";
import catcss from "./styles/cat-card.module.css";
import discss from "./styles/news-display-card.module.css";
import sumcss from "./styles/news-summary-card.module.css";
import feecss from "./styles/news-feed-card.module.css";
import gracss from "./styles/infographic-card.module.css";

const imgURL = process.env.REACT_APP_IMAGE_URL;

export const ImageCard = ({ alt, src }) => {
  const { toPathname } = useContent();
  const compid = (alt && `pifa-image-${toPathname(alt)}`) || "pifa-image";
  const crdcss = { position: "absolute", top: "0", left: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: "0" };
  const [imageSrc, setImageSrc] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const img = new Image();
    img.src = `${imgURL}/${src}`;
    img.onload = () => {
      setImageSrc(img.src);
      setIsLoaded(true);
    };
    img.onerror = () => setImageSrc("/img/fallback.jpg");
  }, [src]);

  return (
    <Fragment>
      {!isLoaded && <div id={`${compid}-placeholder`} className={imgcss.skeleton} />}
      <img id={compid} alt={`Foto: ${alt} | Pifa Net`} src={imageSrc} style={{ ...crdcss, opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s" }} onLoad={() => setIsLoaded(true)} />
    </Fragment>
  );
};

export const CatCard = ({ id, catname, image, onClick }) => {
  const { toPathname } = useContent();
  const compid = (catname && `${id}-category-card-${toPathname(catname)}`) || `${id}-category-card`;
  const cardstyle = { backgroundImage: (image && (image !== "" ? `url(${image})` : "url(/img/fallback.jpg)")) || "url(/img/fallback.jpg)" };

  return (
    <section id={compid} className={catcss.catCard} style={cardstyle} onClick={onClick}>
      <h1 className={catcss.cardTitle}>{catname}</h1>
    </section>
  );
};

export const NewsDisplayCard = ({ id, title, short, tag, count, image, loc, date, align = "stretch", height = "var(--pixel-270)", flex, onClick }) => {
  const { isLoggedin, userData } = useAuth();
  const { toTitleCase, toPathname, stripContent } = useContent();
  const compid = (title && tag && `${id}-display-card-${toPathname(title)}-${toPathname(tag)}`) || `${id}-display-card`;
  const carddesc = (short && stripContent(short)) || "No description";
  const cardloc = (loc && toTitleCase(loc)) || "N/A";
  const cardstyle = { alignSelf: align ? align : "unset", height: height ? height : "unset", flex: flex ? flex : "unset" };

  return (
    <section id={compid} className={discss.newsDisplayCard} style={cardstyle} onClick={onClick}>
      <section className={discss.cardContent}>
        <div style={{ display: "flex", flexDirection: "row", gap: "var(--pixel-10)", alignItems: "flex-start", justifyContent: "flex-start" }}>
          <NewsTag id={compid} name={tag} />
          {isLoggedin && userData.level === "admin" && <NewsCount id={compid} value={count} />}
        </div>
        <header className={discss.cardHead}>
          <h1 className={discss.cardTitle}>{title}</h1>
          <p className={discss.cardShort}>{carddesc}</p>
        </header>
        <div className={discss.cardInfo}>
          <div className={discss.cardLocWrap}>
            <h6 className={discss.cardLoc}>{cardloc}</h6>
          </div>
          <h6 className={discss.cardLoc}>{`| ${date}`}</h6>
        </div>
      </section>
      <ImageCard alt={title} src={image} />
    </section>
  );
};

export const NewsSummaryCard = ({ id, isPortrait, title, tag, image, loc, date, onClick }) => {
  const { toTitleCase, toPathname } = useContent();
  const compid = (title && tag && `${id}-summary-card-${toPathname(title)}-${toPathname(tag)}`) || `${id}-summary-card`;
  const cardloc = (loc && toTitleCase(loc)) || "N/A";

  return (
    <section id={compid} className={`${sumcss.newsSummaryCard} ${isPortrait ? sumcss.portrait : sumcss.landscape}`} onClick={onClick}>
      {isPortrait && (
        <section className={`${sumcss.cardImage} ${sumcss.portrait}`}>
          <label className={sumcss.cardLabel}>
            <p className={sumcss.cardLabelText}>{tag}</p>
          </label>
          <ImageCard alt={title} src={image} />
        </section>
      )}
      <header className={`${sumcss.cardHead} ${isPortrait ? sumcss.portrait : sumcss.landscape}`}>
        <h1 className={sumcss.cardTitle}>{title}</h1>
        <div className={sumcss.cardInfo}>
          <div className={sumcss.cardLocWrap}>
            <h6 className={sumcss.cardLoc}>{cardloc}</h6>
          </div>
          <h6 className={sumcss.cardLoc}>{`| ${date}`}</h6>
        </div>
      </header>
      {!isPortrait && (
        <section className={`${sumcss.cardImage} ${sumcss.landscape}`}>
          <label className={sumcss.cardLabel}>
            <div className={sumcss.cardLabelText}>{tag}</div>
          </label>
          <ImageCard alt={title} src={image} />
        </section>
      )}
    </section>
  );
};

export const NewsFeedCard = ({ id, title, short, tag, image, loc, date, onClick }) => {
  const { toTitleCase, toPathname, stripContent } = useContent();
  const compid = (title && tag && `${id}-feed-card-${toPathname(title)}-${toPathname(tag)}`) || `${id}-feed-card`;
  const carddesc = (short && stripContent(short)) || "No description";
  const cardloc = (loc && toTitleCase(loc)) || "N/A";

  return (
    <section id={compid} className={feecss.newsFeedCard} onClick={onClick}>
      <section className={feecss.cardContent}>
        <header className={feecss.cardHead}>
          <h1 className={feecss.cardTitle}>{title}</h1>
          <p className={feecss.cardShort}>{carddesc}</p>
        </header>
        <div className={feecss.cardInfo}>
          <div className={feecss.cardLocWrap}>
            <h6 className={feecss.cardLoc}>{cardloc}</h6>
          </div>
          <h6 className={feecss.cardLoc}>{`| ${date}`}</h6>
        </div>
      </section>
      <section className={feecss.cardImage}>
        <label className={feecss.cardLabel}>
          <p className={feecss.cardLabelText}>{tag}</p>
        </label>
        <ImageCard alt={title} src={image} />
      </section>
    </section>
  );
};

export const InfographicCard = ({ id, title, image, count = "0", status, onClick }) => {
  const { toPathname } = useContent();
  const compid = (title && `${id}-infographic-card-${toPathname(title)}`) || `${id}-infographic-card`;
  const cardimage = (image && image) || "/img/fallback.jpg";

  return (
    <section id={compid} className={gracss.infographicCard} onClick={onClick}>
      <img className={gracss.cardImageIcon} alt={title} src={cardimage} />
      <header className={gracss.cardContent}>
        {status && <span className={gracss.cardLabel}>{status}</span>}
        <h1 className={gracss.cardTitle}>{title}</h1>
        <p className={gracss.cardInfo}>{`${count} Konten`}</p>
      </header>
    </section>
  );
};

const NewsCard = ({ id, title, short, tag, image, loc, date, onClick }) => {
  const { toTitleCase, toPathname, stripContent } = useContent();
  const compid = (title && tag && `${id}-news-card-${toPathname(title)}-${toPathname(tag)}`) || `${id}-news-card`;
  const carddesc = (short && stripContent(short)) || "No description";
  const cardloc = (loc && toTitleCase(loc)) || "N/A";

  return (
    <section id={compid} className={newcss.newsCard} onClick={onClick}>
      <section className={newcss.cardImage}>
        <NewsTag id={compid} name={tag} />
        <ImageCard alt={title} src={image} />
      </section>
      <section className={newcss.cardContent}>
        <header className={newcss.cardHead}>
          <h1 className={newcss.cardTitle}>{title}</h1>
          <p className={newcss.cardShort}>{carddesc}</p>
        </header>
        <div className={newcss.cardInfo}>
          <div className={newcss.cardLocWrap}>
            <h6 className={newcss.cardLoc}>{cardloc}</h6>
          </div>
          <h6 className={newcss.cardLoc}>{`| ${date}`}</h6>
        </div>
      </section>
    </section>
  );
};

export default NewsCard;
