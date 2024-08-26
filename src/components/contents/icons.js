import React from "react";
import styles from "./styles/icons.module.css";

export const Close = ({ size, color, onClick = () => {} }) => {
  const fill = color ? color : "currentColor";
  const iconstyle = { width: size, height: size };

  return (
    <div className={styles.isIcon} style={iconstyle} onClick={onClick}>
      <svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.1857 6.82904C20.6041 6.41062 20.6041 5.73223 20.1857 5.31381C19.7673 4.8954 19.0889 4.8954 18.6705 5.31381L12.9995 10.9848L7.32855 5.31381C6.91014 4.8954 6.23174 4.8954 5.81333 5.31381C5.39491 5.73223 5.39491 6.41062 5.81333 6.82904L11.4843 12.5L5.81333 18.171C5.39491 18.5894 5.39491 19.2678 5.81333 19.6862C6.23174 20.1046 6.91014 20.1046 7.32855 19.6862L12.9995 14.0152L18.6705 19.6862C19.0889 20.1046 19.7673 20.1046 20.1857 19.6862C20.6041 19.2678 20.6041 18.5894 20.1857 18.171L14.5147 12.5L20.1857 6.82904Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};

export const HChevron = ({ size, color, direction }) => {
  const fill = color ? color : "currentColor";
  const iconstyle = { width: size, height: size };
  let rotation = 0;

  switch (direction) {
    case "left":
      rotation = 180;
      break;
    case "up":
      rotation = -90;
      break;
    case "down":
      rotation = 90;
      break;
    case "right":
      rotation = 0;
      break;
    default:
      rotation = 0;
      break;
  }

  return (
    <div className={styles.isIcon} style={iconstyle}>
      <svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: `rotate(${rotation}deg)` }}>
        <path d="M9.02744 18.171C8.60902 18.5894 8.60902 19.2678 9.02744 19.6862C9.44586 20.1046 10.1242 20.1046 10.5427 19.6862L16.9712 13.2576C17.3897 12.8392 17.3897 12.1608 16.9712 11.7424L10.5427 5.31381C10.1242 4.8954 9.44586 4.8954 9.02744 5.31381C8.60902 5.73223 8.60902 6.41062 9.02744 6.82904L14.6984 12.5L9.02744 18.171Z" fill={fill} />
      </svg>
    </div>
  );
};
