import React from "react";
import { NewsTag } from "../markers/news-tag";
import styles from "./styles/news-display-card.module.css";

export const NewsDisplayCard = ({
  id,
  title,
  short,
  tag,
  image,
  loc,
  date,
  align = "stretch",
  height = "var(--pixel-270)",
  flex,
  onClick,
}) => {
  const compid = `display-card-${id}`;
  const cardstyle = {
    backgroundImage: image
      ? image !== ""
        ? `url(${image})`
        : `url(/img/fallback.jpg)`
      : `url(/img/fallback.jpg)`,
    alignSelf: align,
    height: height,
    flex: flex,
  };

  return (
    <section
      id={compid}
      className={styles.newsDisplayCard}
      style={cardstyle}
      onClick={onClick}
    >
      <div className={styles.cardContent}>
        <NewsTag id={compid} name={tag} />
        <div className={styles.cardHead}>
          <h1 className={styles.cardTitle}>{title}</h1>
          <p className={styles.cardShort}>{short}</p>
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardLocWrap}>
            <h6 className={styles.cardLoc}>{loc}</h6>
          </div>
          <h6 className={styles.cardLoc}>{`| ${date}`}</h6>
        </div>
      </div>
    </section>
  );
};
