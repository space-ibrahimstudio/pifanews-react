import React, { Fragment, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./styles/popover.module.css";

const modalRoot = document.getElementById("modal-root") || document.body;

const PopOver = ({ onSubmit, onClose, children }) => {
  const compid = `popover-form`;
  const ref = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

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
    <main id={compid} className={styles.formScroll}>
      <section id={`${compid}-wrap`} className={`${styles.formScreen} ${isClosing ? styles.close : ""}`}>
        <form id={`${compid}-wrap-form`} ref={ref} className={`${styles.form} ${isClosing ? styles.close : ""}`} style={{ maxWidth: "var(--pixel-550)" }} onSubmit={onSubmit}>
          {/* {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              if (child.type === Fragment) {
                return (
                  <Fragment>
                    {React.Children.map(child.props.children, (fragmentChild) => {
                      if (React.isValidElement(fragmentChild)) {
                        const combinedId = fragmentChild.props.id ? `${compid}-wrap-form-${fragmentChild.props.id}` : `${compid}-wrap-form`;
                        return React.cloneElement(fragmentChild, { id: combinedId });
                      }
                      return fragmentChild;
                    })}
                  </Fragment>
                );
              }
              const combinedId = child.props.id ? `${compid}-wrap-form-${child.props.id}` : `${compid}-wrap-form`;
              return React.cloneElement(child, { id: combinedId });
            }
            return child;
          })} */}
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              if (child.type === Fragment) {
                return <Fragment>{React.Children.map(child.props.children, (fragmentChild) => (React.isValidElement(fragmentChild) ? React.cloneElement(fragmentChild, { id: compid }) : fragmentChild))}</Fragment>;
              }
              return React.cloneElement(child, { id: compid });
            }
            return child;
          })}
        </form>
      </section>
    </main>
  );

  return createPortal(modalElement, modalRoot);
};

export default PopOver;
