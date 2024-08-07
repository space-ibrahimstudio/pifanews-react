import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@ibrahimstudio/button";
import { Input } from "@ibrahimstudio/input";
import { useWindow } from "@ibrahimstudio/react";
import { useAuth } from "../../libs/security/auth";
import { useFetch } from "../../libs/plugins/fetch";
import { ISHome, ISSearch } from "@ibrahimstudio/icons";
import { Close } from "../contents/icons";
import { TabButton, TabButtonGen } from "../user-inputs/buttons";
import styles from "./styles/navbar.module.css";

export const Navbar = ({ id }) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { isLoggedin, logout } = useAuth();
  const { width } = useWindow();
  const { categoryData } = useFetch();
  const compid = `${id}-top-navigation`;
  const [leftShadow, setLeftShadow] = useState(false);
  const [rightShadow, setRightShadow] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = () => logout();

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
    const onScroll = () => {
      const { scrollWidth = 0, scrollLeft = 0, offsetWidth = 0 } = ref.current || {};
      setLeftShadow(scrollLeft > 0);
      setRightShadow(scrollLeft + offsetWidth < scrollWidth);
    };
    onScroll();
    const node = ref.current;
    node.addEventListener("scroll", onScroll);
    return () => {
      node.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header id={compid} className={`${styles.navbar} ${scrolled ? styles.scroll : ""}`}>
      <section className={styles.navTop}>
        <img className={styles.navLogoIcon} alt="" src="/png/pifa-logo.png" />
        <div className={styles.navOption}>
          <Button id={`${compid}-advertising`} variant="line" color="var(--color-primary)" size="sm" buttonText={isLoggedin ? "Posting Iklan" : "Beriklan Disini"} />
          {isLoggedin ? <Button id={`${compid}-logout`} size="sm" buttonText="Keluar" onClick={handleLogout} /> : <Button id={`${compid}-login`} size="sm" buttonText="Login" onClick={() => navigate("/login")} />}
        </div>
      </section>
      <section className={styles.navBottom}>
        {searchOpen && width <= 580 ? (
          <Input id={`${compid}-search`} isLabeled={false} type="text" name="query" value={query} placeholder="Cari Berita Terkini" onChange={(e) => setQuery(e.target.value)} startContent={<ISSearch />} />
        ) : (
          <nav className={styles.navMenu}>
            <TabButtonGen id={`${compid}-beranda`} text="Beranda" path="/" startContent={<ISHome />} />
            <div className={`${styles.navMenuItems} ${leftShadow ? styles.leftShadow : ""} ${rightShadow ? styles.rightShadow : ""}`}>
              <div ref={ref} className={styles.navMenuHscroll}>
                <TabButtonGen id={`${compid}-infographic`} text="Infografis" type="scroll" targetId="pifa-home-slider-news-section-berita-infografis" />
                {categoryData.map((menu, index) => (
                  <TabButton key={index} id={`${compid}-${menu.slug}`} path={`/${menu.slug}`} text={menu.nama_kategori_berita} />
                ))}
              </div>
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
