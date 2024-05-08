import React from "react";
import styles from "./styles/footer.module.css";

const FooterMenu = ({ title, children }) => {
  return (
    <div className={styles.footerMenu}>
      <h6 className={styles.menuTitle}>{title}</h6>
      <div className={styles.menuUl}>{children}</div>
    </div>
  );
};

const FooterMenuLi = ({ children, onClick }) => {
  return (
    <b className={styles.menuLi} onClick={onClick}>
      {children}
    </b>
  );
};

export const Footer = ({ id }) => {
  const compid = `bottom-navigation-${id}`;

  return (
    <footer id={compid} className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerInfo}>
          <img className={styles.infoLogo} alt="" src="/png/pifa-logo.png" />
          <h6 className={styles.infoTitle}>
            Platform Informasi Terkini dan Teraktual, Kanal Aspirasi Netizen,
            dan Digital Market
          </h6>
          <div className={styles.infoContact}>
            <img className={styles.contactIcon} alt="" src="/svg/phone.svg" />
            <h6 className={styles.contactText}>(+62) 811 5737 688</h6>
          </div>
          <div className={styles.infoContact}>
            <img className={styles.contactIcon} alt="" src="/svg/email.svg" />
            <h6 className={styles.contactText}>nettacodeindonesia@gmail.com</h6>
          </div>
        </div>
        <FooterMenu title="Navigasi">
          <FooterMenuLi>Syarat & Ketentuan</FooterMenuLi>
          <FooterMenuLi>Tentang PIFA</FooterMenuLi>
          <FooterMenuLi>Kebijakan Privasi</FooterMenuLi>
          <FooterMenuLi>Bantuan (FAQ)</FooterMenuLi>
        </FooterMenu>
        <FooterMenu title="Panduan">
          <FooterMenuLi>Kode Etik Jurnalistik</FooterMenuLi>
          <FooterMenuLi>Beriklan</FooterMenuLi>
          <FooterMenuLi>Pedoman Media Siber</FooterMenuLi>
        </FooterMenu>
        <div className={styles.footerSocial}>
          <h6 className={styles.socialTitle}>Ikuti Kami</h6>
          <div className={styles.socialUl}>
            <img className={styles.socialIcon} src="/svg/instagram.svg" />
            <img className={styles.socialIcon} src="/svg/facebook.svg" />
            <img className={styles.socialIcon} src="/svg/youtube.svg" />
          </div>
        </div>
      </div>
      <span className={styles.crText}>
        © 2013-2024 PIFA. All rights reserved.
      </span>
    </footer>
  );
};
