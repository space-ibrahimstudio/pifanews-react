import React from "react";
import styles from "./styles/fieldset.module.css";

const Fieldset = ({ gap = "var(--pixel-10)", children }) => {
  const fieldsetstyles = { gap: gap };

  return (
    <section className={styles.inputWrap} style={fieldsetstyles}>
      <div className={styles.wrapBody} style={fieldsetstyles}>
        {children}
      </div>
    </section>
  );
};

export default Fieldset;
