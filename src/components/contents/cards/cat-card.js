import React from "react";
import styles from "./styles/cat-card.module.css";

export const CatCard = ({ id, catname, image, onClick }) => {
  const compid = `category-card-${id}`;
  const cardstyle = {
    backgroundImage: image
      ? image !== ""
        ? `url(${image})`
        : `url(/img/fallback.jpg)`
      : `url(/img/fallback.jpg)`,
  };

  return (
    <section
      id={compid}
      className={styles.catCard}
      style={cardstyle}
      onClick={onClick}
    >
      <h1 className={styles.cardTitle}>{catname}</h1>
    </section>
  );
};
