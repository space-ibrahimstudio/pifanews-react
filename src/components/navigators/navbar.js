import React, { useState, useEffect } from "react";
import { Button } from "@ibrahimstudio/button";
import { Input } from "@ibrahimstudio/input";
import { useContent, useWindow } from "@ibrahimstudio/react";
import { ISHome, ISBell, ISSearch } from "@ibrahimstudio/icons";
import { Close } from "../contents/icons";
import { getStaticMenus } from "../../libs/sources/local-data";
import { TabButton, TabButtonGen } from "../user-inputs/buttons";
import styles from "./styles/navbar.module.css";

export const Navbar = ({ id }) => {
  const { toPathname } = useContent();
  const { width } = useWindow();
  const compid = `${id}-top-navigation`;
  const [scrolled, setScrolled] = useState(false);
  const [staticMenus, setStaticMenus] = useState([]);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menus = await getStaticMenus();
        setStaticMenus(menus);
      } catch (error) {
        console.error("error getting public menus:", error);
      }
    };
    fetchMenus();
  }, []);

  return (
    <header id={compid} className={`${styles.navbar} ${scrolled ? styles.scroll : ""}`}>
      <section className={styles.navTop}>
        <img className={styles.navLogoIcon} alt="" src="/png/pifa-logo.png" />
        <div className={styles.navOption}>
          <Button id={`${compid}-notification`} size="sm" variant="hollow" subVariant="icon" color="var(--color-primary)" iconContent={<ISBell size="var(--pixel-30)" />} />
          <Button id={`${compid}-login`} size="sm" buttonText="Login" />
        </div>
      </section>
      <section className={styles.navBottom}>
        {searchOpen && width <= 580 ? (
          <Input id={`${compid}-search`} isLabeled={false} type="text" name="query" value={query} placeholder="Cari Berita Terkini" onChange={(e) => setQuery(e.target.value)} startContent={<ISSearch />} />
        ) : (
          <nav className={styles.navMenu}>
            <TabButtonGen id={`${compid}-beranda`} text="Beranda" path="/" startContent={<ISHome />} />
            <div className={styles.navMenuHscroll}>
              <TabButtonGen id={`${compid}-infographic`} text="Infografis" type="scroll" targetId="pifa-home-hscroll-news-section-berita-terbaru" />
              {staticMenus.map((menu, index) => (
                <TabButton key={index} id={`${compid}-${menu.text}`} path={`/${toPathname(menu.text)}`} text={menu.text} />
              ))}
            </div>
          </nav>
        )}
        {width > 580 ? (
          <div className={styles.navSearch}>
            <Input id={`${compid}-search`} isLabeled={false} type="text" name="query" value={query} placeholder="Cari Berita Terkini" onChange={(e) => setQuery(e.target.value)} endContent={<ISSearch />} />
          </div>
        ) : (
          <Button id={searchOpen ? `${compid}-close-search` : `${compid}-open-search`} size="sm" variant="hollow" subVariant="icon" color="var(--color-secondary)" iconContent={searchOpen ? <Close /> : <ISSearch />} onClick={() => setSearchOpen(!searchOpen)} />
        )}
      </section>
    </header>
  );
};
