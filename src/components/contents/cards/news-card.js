import React from "react";
import { NewsTag } from "../markers/news-tag";
import styles from "./styles/news-card.module.css";

export const NewsCard = ({
  id,
  title,
  short,
  tag,
  image,
  loc,
  date,
  onClick,
}) => {
  const cardstyle = {
    backgroundImage: image
      ? image !== ""
        ? `url(${image})`
        : `url(/img/fallback.jpg)`
      : `url(/img/fallback.jpg)`,
  };

  return (
    <section
      id={`news-card-${id}`}
      className={styles.newsCard}
      onClick={onClick}
    >
      <div className={styles.cardImage} style={cardstyle}>
        <NewsTag id={`news-card-${id}`} name={tag} />
      </div>
      <div className={styles.cardContent}>
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
