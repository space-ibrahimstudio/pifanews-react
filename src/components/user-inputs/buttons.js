import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useContent, useEvent } from "@ibrahimstudio/react";
import tab from "./styles/tab-button.module.css";
import tabg from "./styles/tab-button-gen.module.css";
import source from "./styles/source-button.module.css";
import tag from "./styles/tags-button.module.css";

export const TabButton = ({ id, text, path, startContent, endContent }) => {
  const location = useLocation();
  const { toPathname } = useContent();
  const compid = text ? `${id}-tab-${toPathname(text)}` : `${id}-tab`;
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  return (
    <Link id={compid} className={`${tab.tabButton} ${activeTab === path ? tab.active : ""}`} to={path}>
      {startContent}
      <b className={tab.tabButtonText}>{text}</b>
      {endContent}
    </Link>
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
    <button id={compid} className={`${tabg.tabButtonGen} ${activeTab === path ? tabg.active : ""}`} onClick={handleClick}>
      {startContent}
      <b className={tabg.tabButtonText}>{text}</b>
      {endContent}
    </button>
  );
};

export const SourceButton = ({ id, to }) => {
  const compid = `${id}-view-source`;
  const navigate = useNavigate();
  const handleClick = () => navigate(to);

  return (
    <button id={compid} className={source.groupCta} onClick={handleClick}>
      <b className={source.groupCtaText}>Selengkapnya</b>
      <img className={source.groupCtaIcon} alt={compid} src="/svg/arrow-right.svg" />
    </button>
  );
};

export const TagsButton = ({ id, text, onClick }) => {
  const compid = `${id}-tags`;

  return (
    <button id={compid} className={tag.tagsButton} onClick={onClick}>
      <b className={tag.tagsButtonText}>{text}</b>
    </button>
  );
};
