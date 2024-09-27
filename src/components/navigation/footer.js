import React, { useState, useEffect } from "react";
import { getContactInfo, getStaticPages, getSocialInfo } from "../../libs/sources/datas";
import Image from "../media/image";
import styles from "./styles/footer.module.css";

const maindo = process.env.REACT_APP_DOMAIN_MAIN;

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

const Footer = ({ id }) => {
  const compid = `${id}-bottom-navigation`;
  const [contacts, setContacts] = useState([]);
  const [staticPage, setStaticPage] = useState([]);
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const info = await getContactInfo();
        setContacts(info);
      } catch (error) {
        console.error("error getting contact info:", error);
      }
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const pages = await getStaticPages();
        setStaticPage(pages);
      } catch (error) {
        console.error("error getting static pages:", error);
      }
    };
    fetchPages();
  }, []);

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const info = await getSocialInfo();
        setSocials(info);
      } catch (error) {
        console.error("error getting social info:", error);
      }
    };
    fetchSocials();
  }, []);

  return (
    <footer id={compid} className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerInfo}>
          <Image className={styles.infoLogo} alt="PIFA Logo Footer" src="/png/pifa-logo.png" />
          <h6 className={styles.infoTitle}>Platform Informasi Terkini dan Teraktual, Kanal Aspirasi Netizen, dan Digital Market</h6>
          {contacts.map((contact) => (
            <div key={contact.id} className={styles.infoContact}>
              <Image className={styles.contactIcon} alt={contact.label} src={contact.icon} />
              <h6 className={styles.contactText}>{contact.label}</h6>
            </div>
          ))}
        </div>
        {staticPage.map((menu, index) => (
          <FooterMenu key={index} title={menu.title}>
            {menu.items.map((page, pageidx) => (
              <FooterMenuLi key={pageidx} onClick={() => window.open(`${maindo}${page.path}`, "_blank")}>
                {page.name}
              </FooterMenuLi>
            ))}
          </FooterMenu>
        ))}
        <div className={styles.footerSocial}>
          <h6 className={styles.socialTitle}>Ikuti Kami</h6>
          <div className={styles.socialUl}>
            {socials.map((social) => (
              <Image key={social.id} className={styles.socialIcon} alt={social.label} src={social.icon} onClick={() => window.open(social.value, "_blank")} />
            ))}
          </div>
        </div>
      </div>
      <span className={styles.crText}>© 2013-2024 PIFA. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
