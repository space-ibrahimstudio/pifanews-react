import React, { useState, useEffect } from "react";
import { Button } from "@ibrahimstudio/button";
import { Input } from "@ibrahimstudio/input";
import { useWindow } from "@ibrahimstudio/react";
import { useFetch } from "../../libs/plugins/fetch";
import { ISHome, ISSearch } from "@ibrahimstudio/icons";
import { Close } from "../contents/icons";
import { TabButton, TabButtonGen } from "../user-inputs/buttons";
import styles from "./styles/navbar.module.css";

export const Navbar = ({ id }) => {
  const { width } = useWindow();
  const { categoryData } = useFetch();
  const compid = `${id}-top-navigation`;
  const [scrolled, setScrolled] = useState(false);
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

  return (
    <header id={compid} className={`${styles.navbar} ${scrolled ? styles.scroll : ""}`}>
      <section className={styles.navTop}>
        <img className={styles.navLogoIcon} alt="" src="/png/pifa-logo.png" />
        <div className={styles.navOption}>
          <Button id={`${compid}-advertising`} variant="line" color="var(--color-primary)" size="sm" buttonText="Beriklan Disini" />
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
              <TabButtonGen id={`${compid}-infographic`} text="Infografis" type="scroll" targetId="pifa-home-slider-news-section-berita-infografis" />
              {categoryData.map((menu, index) => (
                <TabButton key={index} id={`${compid}-${menu.slug}`} path={`/${menu.slug}`} text={menu.nama_kategori_berita} />
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
