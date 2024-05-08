import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles/tab-button-gen.module.css";

export const TabButtonGen = ({
  id,
  text,
  path,
  startContent,
  endContent,
  onClick,
}) => {
  const compid = `tab-general-${id}`;
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  return (
    <button
      id={compid}
      className={`${styles.tabButtonGen} ${
        activeTab === path ? styles.active : ""
      }`}
      onClick={onClick}
    >
      {startContent}
      <b className={styles.tabButtonText}>{text}</b>
      {endContent}
    </button>
  );
};
