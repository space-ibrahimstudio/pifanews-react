import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useWindow, useContent } from "@ibrahimstudio/react";
import { Button } from "@ibrahimstudio/button";
import { Input } from "@ibrahimstudio/input";
import { ISHome, ISSearch } from "@ibrahimstudio/icons";
import useApi from "../../libs/plugins/apis";
import useAuth from "../../libs/guards/auth";
import { toPathname } from "../../libs/plugins/helpers";
import useIcons from "../content/icons";
import TabButton, { TabButtonGen } from "../formel/buttons";
import styles from "./styles/navbar.module.css";

const Navbar = ({ id, parentType = "public" }) => {
  const navigate = useNavigate();
  const { apiGet, apiRead } = useApi();
  const { toTitleCase } = useContent();
  const { isLoggedin, logout, userData } = useAuth();
  const { width } = useWindow();
  const { Close } = useIcons();
  const compid = `${id}-top-navigation`;
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [publicMenus, setPublicMenus] = useState([]);
  const [privateMenus, setPrivateMenus] = useState([]);

  const handleLogout = () => logout();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/pencarian/${query}`);
    }
  };

  const getPublicMenus = async () => {
    try {
      const publicmenus = await apiGet("main", "categorynew");
      setPublicMenus(publicmenus && publicmenus.data && publicmenus.data.length > 0 ? publicmenus.data : []);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const getPrivateMenus = async () => {
    const formData = new FormData();
    const { token_activation, level } = userData;
    formData.append("data", JSON.stringify({ secret: token_activation, level: level.toUpperCase() }));
    try {
      const privatemenus = await apiRead(formData, "office", "viewmenu");
      setPrivateMenus(privatemenus && privatemenus.data && privatemenus.data.length > 0 ? privatemenus.data : []);
    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    if (parentType === "private") {
      getPrivateMenus();
    } else {
      getPublicMenus();
    }
  }, [parentType]);

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
    <header id={compid} className={`${styles.navbar} ${scrolled ? styles.scroll : ""} ${parentType === "private" ? "" : styles.pub}`}>
      <section className={styles.navTop}>
        <img className={styles.navLogoIcon} alt="" src="/png/pifa-logo.png" />
        <div className={styles.navOption}>
          <Button id={`${compid}-action`} variant="line" color="var(--color-primary)" size="sm" buttonText={isLoggedin ? (userData.level === "admin" ? "Dashboard" : "Posting Iklan") : "Beriklan Disini"} onClick={isLoggedin ? (userData.level === "admin" ? () => navigate("/dashboard") : () => alert("Add Post coming soon!")) : () => navigate("/login")} />
          {isLoggedin ? <Button id={`${compid}-logout`} size="sm" buttonText="Keluar" onClick={handleLogout} /> : <Button id={`${compid}-login`} size="sm" buttonText="Login" onClick={() => navigate("/login")} />}
        </div>
      </section>
      <section className={`${styles.navBottom} ${parentType === "private" ? "" : styles.pub}`}>
        {searchOpen && width <= 580 ? (
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", margin: "0", flexShrink: "0", boxSizing: "border-box", flex: "1" }} onKeyDown={handleSearch}>
            <Input id={`${compid}-search`} isLabeled={false} type="text" name="query" value={query} placeholder="Cari Berita Terkini" onChange={(e) => setQuery(e.target.value)} startContent={<ISSearch />} />
          </div>
        ) : (
          <nav className={`${styles.navMenu} ${parentType === "private" ? "" : styles.pub}`}>
            <TabButtonGen id={`${compid}-beranda`} text="Beranda" path="/" startContent={<ISHome />} />
            <div className={`${styles.navMenuHscroll} ${parentType === "private" ? "" : styles.pub}`}>
              <div className={styles.navMenuItems}>
                {parentType === "private" ? (
                  <Fragment>
                    {privateMenus.map((menu, index) => (
                      <TabButton key={index} type="sub" id={`${compid}-${menu["Menu Utama"].idmenu}`} path={toPathname(menu["Menu Utama"].menu)} text={toTitleCase(menu["Menu Utama"].menu)} subTabData={menu["Sub Menu"]} />
                    ))}
                  </Fragment>
                ) : (
                  <Fragment>
                    {publicMenus.map((menu, index) => (
                      <TabButton key={index} id={`${compid}-${menu.slug}`} path={`/berita/kategori/${menu.slug}`} text={menu.nama_kategori_berita} />
                    ))}
                  </Fragment>
                )}
              </div>
            </div>
          </nav>
        )}
        {parentType !== "private" &&
          (width > 580 ? (
            <div className={styles.navSearch} onKeyDown={handleSearch}>
              <Input id={`${compid}-search`} isLabeled={false} type="text" name="query" value={query} placeholder="Cari Berita Terkini" onChange={(e) => setQuery(e.target.value)} endContent={<ISSearch />} />
            </div>
          ) : (
            <Button id={searchOpen ? `${compid}-close-search` : `${compid}-open-search`} size="sm" variant="hollow" subVariant="icon" color="var(--color-secondary)" iconContent={searchOpen ? <Close /> : <ISSearch />} onClick={() => setSearchOpen(!searchOpen)} />
          ))}
      </section>
    </header>
  );
};

export default Navbar;
