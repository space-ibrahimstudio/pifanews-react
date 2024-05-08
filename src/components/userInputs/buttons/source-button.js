import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/source-button.module.css";

export const SourceButton = ({ id, to }) => {
  const compid = `view-source-${id}`;
  const navigate = useNavigate();
  const handleClick = () => navigate(to);

  return (
    <button id={compid} className={styles.groupCta} onClick={handleClick}>
      <b className={styles.groupCtaText}>Selengkapnya</b>
      <img
        className={styles.groupCtaIcon}
        alt={compid}
        src="/svg/arrow-right.svg"
      />
    </button>
  );
};
