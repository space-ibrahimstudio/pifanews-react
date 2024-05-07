import React, { useState, useEffect } from "react";
import { Button } from "@ibrahimstudio/button";
import { Input } from "@ibrahimstudio/input";
import { TabButtonGen } from "../userInputs/buttons/tab-button-gen";
import { TabButton } from "../userInputs/buttons/tab-button";
import { getStaticMenus } from "../../libs/sources/local-data";
import { HomeIcon, BellIcon, SearchIcon } from "../contents/markers/icons";
import styles from "./styles/navbar.module.css";

export const Navbar = ({ id }) => {
  const [scrolled, setScrolled] = useState(false);
  const [staticMenus, setStaticMenus] = useState([]);
  const [query, setQuery] = useState("");

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
    <header
      id={`top-navigation-${id}`}
      className={`${styles.navbar} ${scrolled ? styles.scroll : ""}`}
    >
      <section className={styles.navTop}>
        <img className={styles.navLogoIcon} alt="" src="/png/pifa-logo.png" />
        <div className={styles.navOption}>
          <Button
            id={`top-navigation-${id}-notification`}
            size="sm"
            variant="hollow"
            subVariant="icon"
            color="var(--color-primary)"
            iconContent={<BellIcon width="100%" height="25px" />}
          />
          <Button
            id={`top-navigation-${id}-login`}
            size="sm"
            buttonText="Login"
          />
          <Button
            id={`top-navigation-${id}-submit`}
            size="sm"
            variant="line"
            color="var(--color-primary)"
            buttonText="Buat Berita"
          />
        </div>
      </section>
      <section className={styles.navBottom}>
        <nav className={styles.navMenu}>
          <TabButtonGen
            id={`top-navigation-${id}-home`}
            text="Beranda"
            path="/"
            startContent={<HomeIcon width="20px" height="100%" />}
          />
          <div className={styles.navMenuHscroll}>
            {staticMenus.map((menu, index) => (
              <TabButton
                key={index}
                id={`top-navigation-${id}-${menu.path}`}
                path={menu.path}
                text={menu.text}
              />
            ))}
          </div>
          <TabButtonGen
            id={`top-navigation-${id}-more`}
            text="Lainnya"
            path="/lainnya"
          />
        </nav>
        <div className={styles.navSearch}>
          <Input
            id={`top-navigation-${id}-search`}
            isLabeled={false}
            type="text"
            name="query"
            value={query}
            placeholder="Cari Berita Terkini"
            onChange={(e) => setQuery(e.target.value)}
            endContent={<SearchIcon width="100%" height="20px" />}
          />
        </div>
      </section>
    </header>
  );
};
