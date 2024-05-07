import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/source-button.module.css";

export const SourceButton = ({ id, to }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(to);

  return (
    <button
      id={`view-source-${id}`}
      className={styles.groupCta}
      onClick={handleClick}
    >
      <b className={styles.groupCtaText}>Selengkapnya</b>
      <img
        className={styles.groupCtaIcon}
        alt={`view-source-to-${to}`}
        src="/svg/arrow-right.svg"
      />
    </button>
  );
};
