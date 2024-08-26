import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../libs/security/auth";
import styles from "./styles/dashboard.module.css";

export const DashboardBody = ({ children }) => {
  return <div className={styles.sectionBody}>{children}</div>;
};

export const DashboardTool = ({ children }) => {
  return <div className={styles.sectionTool}>{children}</div>;
};

export const DashboardToolbar = ({ children }) => {
  return <nav className={styles.sectionNav}>{children}</nav>;
};

export const DashboardHead = ({ title, desc }) => {
  return (
    <header className={styles.sectionHead}>
      <h1 className={styles.sectionTitle}>{title}</h1>
      {desc && <p className={styles.sectionDesc}>{desc}</p>}
    </header>
  );
};

export const DashboardContainer = ({ children }) => {
  return <section className={styles.section}>{children}</section>;
};

const DashboardPage = () => {
  const { isLoggedin } = useAuth();

  if (!isLoggedin) {
    <Navigate to="/login" />;
  }

  return <Navigate to="/dashboard/berita/isi-berita" replace />;
};

export default DashboardPage;
