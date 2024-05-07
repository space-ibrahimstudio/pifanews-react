import React from "react";
import styles from "./styles/news-summary-card.module.css";

export const NewsSummaryCard = ({
  id,
  title,
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
      id={`summary-card-${id}`}
      className={styles.newsSummaryCard}
      onClick={onClick}
    >
      <div className={styles.cardHead}>
        <h1 className={styles.cardTitle}>{title}</h1>
        <div className={styles.cardInfo}>
          <div className={styles.cardLocWrap}>
            <h6 className={styles.cardLoc}>{loc}</h6>
          </div>
          <h6 className={styles.cardLoc}>{`| ${date}`}</h6>
        </div>
      </div>
      <div className={styles.cardImage} style={cardstyle}>
        <div className={styles.cardLabel}>
          <div className={styles.cardLabelText}>{tag}</div>
        </div>
      </div>
    </section>
  );
};
