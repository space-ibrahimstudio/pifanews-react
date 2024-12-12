import React, { Fragment, useState, useEffect, useRef } from "react";
import { useContent, useFormat } from "@ibrahimstudio/react";
import { Button } from "@ibrahimstudio/button";
import { Input } from "@ibrahimstudio/input";
import { useDocument, stripHtml, toPathname } from "../../libs/plugins/helpers";
import useIcons from "../content/icons";
import A from "../feedback/anchor";
import { NewsTag } from "../feedback/markers";
import imgcss from "./styles/image-card.module.css";
import newcss from "./styles/news-card.module.css";
import catcss from "./styles/cat-card.module.css";
import discss from "./styles/news-display-card.module.css";
import sumcss from "./styles/news-summary-card.module.css";
import feecss from "./styles/news-feed-card.module.css";
import gracss from "./styles/infographic-card.module.css";
import cadcss from "./styles/cat-admin-card.module.css";
import ogscss from "./styles/og-card.module.css";
import tagcss from "./styles/tag-card.module.css";
import bancss from "./styles/banner-card.module.css";

export const ImageCard = ({ alt, src }) => {
  const compid = (alt && `Pifa image ${toPathname(alt)}`) || "Pifa image";
  const crdcss = { position: "absolute", top: "0", left: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: "0" };
  const [imageSrc, setImageSrc] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const img = new Image();
    img.src = src;
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

export const BannerCard = ({ type, src, isUploading, onUpload, onDelete, draggable = false, onDragStart, onDragOver, onDrop }) => {
  const ref = useRef(null);
  const { Trash } = useIcons();

  const ISImgUpload = ({ size, color }) => {
    const fill = color ? color : "currentColor";
    const iconstyle = { width: size, height: size, overflow: "hidden", flexShrink: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxSizing: "border-box", color: "inherit" };

    return (
      <div style={iconstyle}>
        <svg width="100%" height="100%" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 5H17.5V12H19.5V5C19.5 3.897 18.603 3 17.5 3H4.5C3.397 3 2.5 3.897 2.5 5V17C2.5 18.103 3.397 19 4.5 19H12.5V17H4.5V5Z" fill={fill} />
          <path d="M8.5 11L5.5 15H16.5L12.5 9L9.5 13L8.5 11Z" fill={fill} />
          <path d="M17.5 14H19.5V17H22.5V19H19.5V22H17.5V19H14.5V17H17.5V14Z" fill={fill} />
        </svg>
      </div>
    );
  };

  const triggerFileUpload = () => {
    if (ref.current) ref.current.click();
  };

  return (
    <section className={`${bancss.bannerCard} ${type === "add" ? bancss.add : bancss.exist} ${isUploading ? bancss.loading : ""}`} onClick={type === "add" ? triggerFileUpload : () => {}} draggable={draggable} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop}>
      {type === "add" && (
        <Fragment>
          <ISImgUpload size="var(--pixel-65)" />
          <input style={{ display: "none" }} ref={ref} type="file" accept="image/*" onChange={onUpload} />
        </Fragment>
      )}
      {type === "exist" && (
        <Fragment>
          <section className={bancss.bannerImageWrap}>
            <img className={bancss.bannerImage} src={src} loading="lazy" alt="" />
          </section>
          <section className={bancss.bannerAction}>
            <Button size="sm" subVariant="icon" color="var(--color-red)" bgColor="var(--color-red-5)" iconContent={<Trash size="var(--pixel-20)" />} onClick={onDelete} />
          </section>
        </Fragment>
      )}
    </section>
  );
};

export const EventDetailCard = ({ id, title, day, date, onEdit, onDelete }) => {
  const { Trash, Edit } = useIcons();
  const compid = (title && `${id}-event-detail-card-${toPathname(title)}`) || `${id}-event-detail-card`;

  return (
    <section id={compid} className={tagcss.tagCard}>
      <header className={tagcss.cardContent}>
        <h1 className={tagcss.cardTitle}>{title}</h1>
        <span className={tagcss.cardDate}>
          {day} | {date}
        </span>
      </header>
      <Button id={`${compid}-action-edit`} size="sm" color="var(--color-primary)" bgColor="var(--color-primary-5)" buttonText="Edit" startContent={<Edit size="var(--pixel-20)" />} onClick={onEdit} />
      <Button id={`${compid}-action-delete`} size="sm" subVariant="icon" color="var(--color-red)" bgColor="var(--color-red-5)" iconContent={<Trash size="var(--pixel-20)" />} onClick={onDelete} />
    </section>
  );
};

export const TagCard = ({ id, openState = false, title = "", timeCreate, timeUpdate, onEdit, inputData, onChange, onClose, onSave, onDelete, isDisabled = false }) => {
  const { newDate } = useFormat();
  const { Close, Trash, Edit } = useIcons();
  const [editOpen, setEditOpen] = useState(openState);
  const compid = (title && `${id}-tag-card-${toPathname(title)}`) || `${id}-tag-card`;

  const openEdit = () => {
    onEdit();
    setEditOpen(true);
  };

  const closeEdit = () => {
    onClose();
    setEditOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave();
    setEditOpen(false);
  };

  return editOpen ? (
    <form id={compid} className={tagcss.tagCard} onSubmit={handleSave}>
      <Input id={`${id}-tag-name`} type="text" isLabeled={false} placeholder="Masukkan nama tag" name="name" value={inputData.name} onChange={onChange} isRequired />
      <Button id={`${compid}-action-edit`} type="submit" buttonText="Simpan" />
      <Button id={`${compid}-action-cancel`} type="button" subVariant="icon" color="var(--color-red)" bgColor="var(--color-red-5)" iconContent={<Close />} onClick={closeEdit} />
    </form>
  ) : (
    <section id={compid} className={tagcss.tagCard}>
      <header className={tagcss.cardContent}>
        <h1 className={tagcss.cardTitle}>{title}</h1>
        <span className={tagcss.cardDate}>
          Created at: {newDate(timeCreate)} | Updated at: {newDate(timeUpdate)}
        </span>
      </header>
      <Button id={`${compid}-action-edit`} color="var(--color-primary)" bgColor="var(--color-primary-5)" buttonText="Edit" startContent={<Edit size="var(--pixel-20)" />} onClick={openEdit} isDisabled={isDisabled} />
      <Button id={`${compid}-action-delete`} subVariant="icon" color="var(--color-red)" bgColor="var(--color-red-5)" iconContent={<Trash size="var(--pixel-20)" />} onClick={onDelete} isDisabled={isDisabled} />
    </section>
  );
};

export const OGCard = ({ id, image, title = "", mssg, scope = "/", desc = "" }) => {
  const { company, domain } = useDocument();
  const compid = (title && `${id}-og-card-${toPathname(title)}`) || `${id}-og-card`;

  return (
    <section id={compid} className={ogscss.ogCard}>
      <img className={ogscss.cardImage} loading="lazy" alt={title} src={image} />
      <header className={ogscss.cardContent}>
        <h1 className={ogscss.contentTitle}>{title === "" ? "Open Graph Protocol" : `${title} | ${company}`}</h1>
        <span className={`${ogscss.contentDesc} ${desc === "" ? ogscss.not : ""}`}>{desc === "" ? "How your content appears when it's shared on social media platforms like WhatsApp, Facebook, Twitter, and LinkedIn." : desc}</span>
        <span className={ogscss.contentUrl}>pifa.co.id</span>
      </header>
      <section className={ogscss.cardMssg}>
        <p className={ogscss.mssgText}>
          {`${mssg} `}
          <span style={{ color: "var(--color-primary)", textDecoration: "underline" }}>{`${domain}${scope}${toPathname(title)}`}</span>
        </p>
      </section>
    </section>
  );
};

export const CatAdmCard = ({ id, title, short, image, tag, onEdit, style, draggable = false, onDragStart, onDragOver, onDrop }) => {
  const { Edit } = useIcons();
  const compid = (title && `${id}-category-admin-card-${toPathname(title)}`) || `${id}-category-admin-card`;
  const cardimg = image === "" ? "/img/fallback.jpg" : image;
  const cardshrt = short === "" ? "no description." : short;

  return (
    <section id={compid} className={cadcss.catAdmCard} style={style} draggable={draggable} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop}>
      <section className={cadcss.cardImage}>
        {tag && <NewsTag id={compid} name={tag} />}
        <ImageCard alt={title} src={cardimg} />
      </section>
      <section className={cadcss.cardContent}>
        <header className={cadcss.cardHead}>
          <h1 className={cadcss.cardTitle}>{title}</h1>
          <span className={cadcss.cardShort}>{cardshrt}</span>
        </header>
        <Button id={`${compid}-action-edit`} size="sm" color="var(--color-primary)" bgColor="var(--color-primary-5)" buttonText="Lihat & Edit" startContent={<Edit size="var(--pixel-20)" />} onClick={onEdit} />
      </section>
    </section>
  );
};

export const CatCard = ({ id, catname, image, onClick }) => {
  const compid = (catname && `${id}-category-card-${toPathname(catname)}`) || `${id}-category-card`;
  const cardstyle = { backgroundImage: (image && (image !== "" ? `url(${image})` : "url(/img/fallback.jpg)")) || "url(/img/fallback.jpg)" };

  return (
    <section id={compid} className={catcss.catCard} style={cardstyle} onClick={onClick}>
      <h1 className={catcss.cardTitle}>{catname}</h1>
    </section>
  );
};

export const NewsDisplayCard = ({ id, title, short, tag, image, loc, date, slug, align = "stretch", height = "var(--pixel-270)", flex }) => {
  const { toTitleCase } = useContent();
  const compid = (title && tag && `${id}-display-card-${toPathname(title)}-${toPathname(tag)}`) || `${id}-display-card`;
  const carddesc = (short && stripHtml(short)) || "No description";
  const cardloc = (loc && toTitleCase(loc)) || "N/A";
  const cardstyle = { alignSelf: align ? align : "unset", height: height ? height : "unset", flex: flex ? flex : "unset" };

  return (
    <section id={compid} className={discss.newsDisplayCard} style={cardstyle}>
      <A slug={slug} />
      <section className={discss.cardContent}>
        <div style={{ display: "flex", flexDirection: "row", gap: "var(--pixel-10)", alignItems: "flex-start", justifyContent: "flex-start" }}>
          <NewsTag id={compid} name={tag} />
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

export const NewsSummaryCard = ({ id, isPortrait, title, tag, image, loc, date, slug }) => {
  const { toTitleCase } = useContent();
  const compid = (title && tag && `${id}-summary-card-${toPathname(title)}-${toPathname(tag)}`) || `${id}-summary-card`;
  const cardloc = (loc && toTitleCase(loc)) || "N/A";

  return (
    <section id={compid} className={`${sumcss.newsSummaryCard} ${isPortrait ? sumcss.portrait : sumcss.landscape}`}>
      <A slug={slug} />
      {isPortrait && (
        <section className={`${sumcss.cardImage} ${sumcss.portrait}`}>
          {tag && (
            <label className={sumcss.cardLabel}>
              <p className={sumcss.cardLabelText}>{tag}</p>
            </label>
          )}
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
          {tag && (
            <label className={sumcss.cardLabel}>
              <div className={sumcss.cardLabelText}>{tag}</div>
            </label>
          )}
          <ImageCard alt={title} src={image} />
        </section>
      )}
    </section>
  );
};

export const NewsFeedCard = ({ id, title, short, tag, image, loc, date, slug }) => {
  const { toTitleCase } = useContent();
  const compid = (title && tag && `${id}-feed-card-${toPathname(title)}-${toPathname(tag)}`) || `${id}-feed-card`;
  const carddesc = (short && stripHtml(short)) || "No description";
  const cardloc = (loc && toTitleCase(loc)) || "N/A";

  return (
    <section id={compid} className={feecss.newsFeedCard}>
      <A slug={slug} />
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

const NewsCard = ({ id, title, short, tag, image, loc, date, slug }) => {
  const { toTitleCase } = useContent();
  const compid = (title && tag && `${id}-news-card-${toPathname(title)}-${toPathname(tag)}`) || `${id}-news-card`;
  const carddesc = (short && stripHtml(short)) || "No description";
  const cardloc = (loc && toTitleCase(loc)) || "N/A";

  return (
    <section id={compid} className={newcss.newsCard}>
      <A slug={slug} />
      <section className={newcss.cardImage}>
        {tag && <NewsTag id={compid} name={tag} />}
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
