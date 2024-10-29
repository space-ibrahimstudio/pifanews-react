import React, { useState, useEffect, useRef } from "react";
import { toPathname } from "../../libs/plugins/helpers";
import Img from "../media/image";
import styles from "./styles/slider.module.css";

const Slider = ({ id, title, scope, content, renderContent, swipeThreshold = 50, slideInterval = 3000, contentStyle }) => {
  const ref = useRef(null);
  const contentRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [contentGap, setContentGap] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [startX, setStartX] = useState(null);
  const compid = (title && scope && `${id}-slider-news-${toPathname(title)}-${toPathname(scope)}`) || `${id}-slider-news`;
  const totalContent = content.length;
  const mockedContent = [...content, ...content, ...content];

  const handleVisible = () => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setVisible(rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight));
    }
  };

  const handlePrev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + totalContent) % totalContent);
  const handleNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % totalContent);

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
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("scroll", handleVisible);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("scroll", handleVisible);
    };
  }, [visible, hover]);

  useEffect(() => {
    const mobileTouchEvent = "ontouchstart" in window;
    if (mobileTouchEvent && ref.current) {
      ref.current.addEventListener("touchstart", handleTouchStart);
      ref.current.addEventListener("touchmove", handleTouchMove);
      ref.current.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      if (mobileTouchEvent && ref.current) {
        ref.current.removeEventListener("touchstart", handleTouchStart);
        ref.current.removeEventListener("touchmove", handleTouchMove);
        ref.current.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);

  useEffect(() => {
    let resetTimeout;
    if (ref.current && contentWidth > 0 && contentGap > 0) {
      const totalWidth = contentWidth + contentGap;
      if (currentIndex === totalContent) {
        ref.current.style.transition = "transform 0.5s ease-in-out";
        ref.current.style.transform = `translateX(-${currentIndex * totalWidth}px)`;
        resetTimeout = setTimeout(() => {
          ref.current.style.transition = "none";
          ref.current.style.transform = `translateX(0)`;
          setCurrentIndex(0);
        }, 500);
      } else {
        ref.current.style.transition = "transform 0.5s ease-in-out";
        ref.current.style.transform = `translateX(-${currentIndex * totalWidth}px)`;
      }
    }
    return () => clearTimeout(resetTimeout);
  }, [content, currentIndex, totalContent, contentWidth, contentGap]);

  return (
    <section id={compid} className={styles.sectionBody}>
      <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: "0", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--pixel-10)", height: "var(--pixel-40)", backgroundColor: "var(--color-secondary-30)", cursor: "pointer", zIndex: "1" }} onClick={handlePrev}>
        <Img style={{ width: "var(--pixel-10)", height: "auto", transform: "scaleX(-1)" }} src="/svg/chevron.svg" />
      </div>
      <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: "0", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--pixel-10)", height: "var(--pixel-40)", backgroundColor: "var(--color-secondary-30)", cursor: "pointer", zIndex: "1" }} onClick={handleNext}>
        <Img style={{ width: "var(--pixel-10)", height: "auto" }} src="/svg/chevron.svg" />
      </div>
      <section id={`${compid}-wrap`} className={styles.sectionSlider} ref={ref}>
        {mockedContent.map((item, index) => (
          <section id={`${compid}-content`} key={index} ref={(el) => (contentRef.current[index] = el)} className={styles.contentWrapper} style={{ ...contentStyle }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {renderContent(item)}
          </section>
        ))}
      </section>
    </section>
  );
};

export default Slider;
