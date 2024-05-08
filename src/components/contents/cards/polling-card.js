import React from "react";
import { Button } from "@ibrahimstudio/button";
import { NewsTag } from "../markers/news-tag";
import styles from "./styles/polling-card.module.css";

export const PollingCard = ({
  id,
  title,
  voters,
  count,
  tag,
  image,
  onClick,
}) => {
  const compid = `polling-card-${id}`;
  const cardstyle = {
    backgroundImage: image
      ? image !== ""
        ? `url(${image})`
        : `url(/img/fallback.jpg)`
      : `url(/img/fallback.jpg)`,
  };

  return (
    <section id={compid} className={styles.pollingCard} onClick={onClick}>
      <div className={styles.cardImage} style={cardstyle}>
        <NewsTag id={compid} name={tag} />
      </div>
      <div className={styles.cardContent}>
        <h1 className={styles.cardTitle}>{title}</h1>
        <Button
          id={`polling-card-${id}-cta`}
          size="sm"
          variant="line"
          color="var(--color-primary)"
          buttonText="Lihat Detail"
        />
        <div className={styles.cardInfo}>
          <div className={styles.cardVotersWrap}>
            <h6 className={styles.cardVoters}>{`${voters} Pemilih`}</h6>
          </div>
          <h6 className={styles.cardVoters}>{`| ${count}`}</h6>
        </div>
      </div>
    </section>
  );
};
