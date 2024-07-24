import React, { useState, useEffect, useRef } from "react";
import { useContent } from "@ibrahimstudio/react";
import { SectionHead } from "../components/contents/markers";
import styles from "./styles/news-slider-section.module.css";

export const NewsSliderSection = ({ id, title, prior, content, renderContent, swipeThreshold = 50, slideInterval = 3000, noHead = false, noSource = false, contentStyle }) => {
  const ref = useRef(null);
  const contentRef = useRef([]);
  const { toPathname } = useContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [contentGap, setContentGap] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [startX, setStartX] = useState(null);
  const compid = title && prior ? `${id}-slider-news-section-${toPathname(title)}-${toPathname(prior)}` : `${id}-slider-news-section`;
  const totalContent = content.length;
  const mockedContent = [...content, ...content, ...content];

  const handleVisible = () => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setVisible(rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight));
    }
  };

  const handleTouchStart = (event) => setStartX(event.touches[0].clientX);
  const handleTouchEnd = () => setStartX(null);
  const handleTouchMove = (event) => {
    if (startX === null) return;
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - startX;
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalContent) % totalContent);
      } else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalContent);
      }
      setStartX(null);
    }
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (contentRef.current[0]) {
        const leadcontent = contentRef.current[0];
        const computedstyle = window.getComputedStyle(leadcontent);
        const width = parseFloat(computedstyle.getPropertyValue("width"));
        const rightspace = parseFloat(computedstyle.getPropertyValue("margin-right"));
        setContentWidth(width);
        setContentGap(rightspace);
      }
    };
    updateDimensions();
    const intervalId = setInterval(() => {
      if (visible && !hover) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (totalContent + 1));
      }
    }, slideInterval);
    const mobiletouchevent = "ontouchstart" in window;
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("scroll", handleVisible);
    if (mobiletouchevent && ref.current) {
      ref.current.addEventListener("touchstart", handleTouchStart);
      ref.current.addEventListener("touchmove", handleTouchMove);
      ref.current.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("scroll", handleVisible);
      if (mobiletouchevent && ref.current) {
        ref.current.removeEventListener("touchstart", handleTouchStart);
        ref.current.removeEventListener("touchmove", handleTouchMove);
        ref.current.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [totalContent, visible, hover]);

  useEffect(() => {
    if (ref.current && contentWidth > 0 && contentGap > 0) {
      const totalWidth = contentWidth + contentGap;
      if (currentIndex === totalContent) {
        ref.current.style.transition = "transform 0.5s ease-in-out";
        ref.current.style.transform = `translateX(-${currentIndex * totalWidth}px)`;
        setTimeout(() => {
          ref.current.style.transition = "none";
          ref.current.style.transform = `translateX(0)`;
          setCurrentIndex(0);
        }, 500);
      } else {
        ref.current.style.transition = "transform 0.5s ease-in-out";
        ref.current.style.transform = `translateX(-${currentIndex * totalWidth}px)`;
      }
    }
  }, [currentIndex, totalContent, contentWidth, contentGap]);

  return (
    <section id={compid} className={styles.newsSliderSection}>
      {!noHead && <SectionHead id={compid} title={title} prior={prior} noSource={noSource} />}
      <div className={styles.sectionBody}>
        <div className={styles.sectionSlider} ref={ref}>
          {mockedContent.map((item, index) => (
            <div key={index} ref={(el) => (contentRef.current[index] = el)} className={styles.contentWrapper} style={contentStyle} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
              {renderContent(item)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
