import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles/tab-button.module.css";

export const TabButton = ({
  id,
  text,
  path,
  startContent,
  endContent,
  onClick,
}) => {
  const compid = `tab-${id}`;
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  return (
    <button
      id={compid}
      className={`${styles.tabButton} ${
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
