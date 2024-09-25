import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./styles/popover.module.css";

const modalRoot = document.getElementById("modal-root") || document.body;

const PopOver = ({ onSubmit, onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsClosing(true);
    }
  };

  useEffect(() => {
    if (isClosing) {
      const animationDuration = 500;
      setTimeout(() => {
        onClose();
      }, animationDuration);
    }
  }, [isClosing, onClose]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let modalCount = 0;
    const popupModals = document.querySelectorAll(`.${styles.formScreen}`);
    popupModals.forEach((modal) => {
      if (!modal.classList.contains(`.${styles.close}`)) {
        modalCount++;
      }
    });
    document.documentElement.style.overflow = modalCount > 0 ? "hidden" : "auto";
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [isClosing]);

  const modalElement = (
    <main className={styles.formScroll}>
      <section className={`${styles.formScreen} ${isClosing ? styles.close : ""}`}>
        <form ref={ref} className={`${styles.form} ${isClosing ? styles.close : ""}`} style={{ maxWidth: "var(--pixel-550)" }} onSubmit={onSubmit}>
          {children}
        </form>
      </section>
    </main>
  );

  return createPortal(modalElement, modalRoot);
};

export default PopOver;
