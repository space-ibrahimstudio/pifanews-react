import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useContent, useEvent } from "@ibrahimstudio/react";
import { Close } from "../content/icons";
import tabcss from "./styles/tab-button.module.css";
import tbgcss from "./styles/tab-button-gen.module.css";
import srccss from "./styles/source-button.module.css";
import tagcss from "./styles/tags-button.module.css";
import swtcss from "./styles/switch-button.module.css";

export const SwitchButton = ({ id, buttons = [] }) => {
  const compid = `${id}-switch-button`;

  return (
    <nav id={compid} className={swtcss.tabSwitch}>
      <section className={swtcss.tabScroll}>
        {buttons.map((button, index) => (
          <button key={index} type="button" className={`${swtcss.tabButton} ${button.active ? swtcss.active : ""}`} onClick={button.onClick}>
            <b className={swtcss.buttonText}>{button.label}</b>
          </button>
        ))}
      </section>
    </nav>
  );
};

export const TagsButton = ({ id, text, type = "reg", onClick }) => {
  const compid = `${id}-tags`;

  return (
    <button id={compid} className={tagcss.tagsButton} onClick={type === "reg" ? onClick : () => {}}>
      <b className={tagcss.tagsButtonText}>{text}</b>
      {type === "select" && <Close size="var(--pixel-20)" onClick={onClick} />}
    </button>
  );
};

export const SourceButton = ({ id, to }) => {
  const compid = `${id}-view-source`;
  const navigate = useNavigate();
  const handleClick = () => navigate(to);

  return (
    <button id={compid} className={srccss.groupCta} onClick={handleClick}>
      <b className={srccss.groupCtaText}>Selengkapnya</b>
      <img className={srccss.groupCtaIcon} alt={compid} src="/svg/arrow-right.svg" />
    </button>
  );
};

export const TabButtonGen = ({ id, text, type = "route", path, targetId, startContent, endContent }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toPathname } = useContent();
  const { scroll } = useEvent();
  const compid = text ? `${id}-tab-general-${toPathname(text)}` : `${id}-tab-general`;
  const [activeTab, setActiveTab] = useState(null);

  const handleClick = () => {
    if (type === "scroll") {
      scroll(targetId, -70);
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  return (
    <button id={compid} className={`${tbgcss.tabButtonGen} ${activeTab === path ? tbgcss.active : ""}`} onClick={handleClick}>
      {startContent}
      <b className={tbgcss.tabButtonText}>{text}</b>
      {endContent}
    </button>
  );
};

const TabButton = ({ id, text, path, type = "single", subTabData = [], startContent, endContent }) => {
  const location = useLocation();
  const { toPathname, toTitleCase } = useContent();
  const compid = text ? `${id}-tab-${toPathname(text)}` : `${id}-tab`;
  const [activeTab, setActiveTab] = useState(null);
  const [subTabOpen, setSubTabOpen] = useState(false);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  return type === "sub" ? (
    <button id={compid} className={`${tabcss.tabButton} ${activeTab === path ? tabcss.active : ""}`} onMouseEnter={() => setSubTabOpen(true)} onMouseLeave={() => setSubTabOpen(false)}>
      {startContent}
      <b className={tabcss.tabButtonText}>{text}</b>
      {endContent}
      {subTabOpen && subTabData.length > 0 && (
        <section className={tabcss.tabSub}>
          {subTabData.map((item, index) => (
            <Link key={index} className={tabcss.tabSubButton} to={`/dashboard/${path}/${toPathname(item.submenu)}`}>
              <b className={tabcss.tabSubButtonText}>{toTitleCase(item.submenu)}</b>
            </Link>
          ))}
        </section>
      )}
    </button>
  ) : (
    <Link id={compid} className={`${tabcss.tabButton} ${activeTab === path ? tabcss.active : ""}`} to={path}>
      {startContent}
      <b className={tabcss.tabButtonText}>{text}</b>
      {endContent}
    </Link>
  );
};

export default TabButton;
