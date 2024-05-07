export const HomeIcon = ({ width, height, color }) => {
  const fill = color || "currentColor";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.6667 6.52432L19.7943 9.51831C20.0603 9.77291 20.0695 10.1949 19.8149 10.4609C19.5603 10.7269 19.1383 10.7361 18.8723 10.4815L18 9.64643V17.9999C18 18.3535 17.8595 18.6926 17.6095 18.9427C17.3594 19.1927 17.0203 19.3332 16.6667 19.3332H12.6667C12.2985 19.3332 12 19.0347 12 18.6666V12.9999C12 12.9115 11.9649 12.8267 11.9024 12.7642C11.8399 12.7017 11.7551 12.6666 11.6667 12.6666H8.33333C8.24493 12.6666 8.16014 12.7017 8.09763 12.7642C8.03512 12.8267 8 12.9115 8 12.9999V18.6666C8 19.0347 7.70152 19.3332 7.33333 19.3332H3.33333C2.97971 19.3332 2.64057 19.1927 2.39053 18.9427C2.14048 18.6926 2 18.3535 2 17.9999V9.64563L1.12764 10.4806C0.861658 10.7352 0.439649 10.726 0.185059 10.46C-0.0695301 10.194 -0.0602921 9.77198 0.205693 9.51739L9.07707 1.02609C9.34866 0.750548 9.71905 0.666419 10.0022 0.66678C10.2841 0.667139 10.6538 0.751561 10.9237 1.02686L13.3333 3.33347V1.99989C13.3333 1.6317 13.6318 1.33322 14 1.33322H16C16.3682 1.33322 16.6667 1.6317 16.6667 1.99989V6.52432ZM15.3333 5.24798V2.66655H14.6667V4.60981L15.3333 5.24798ZM10.0128 2.00062L16.6667 8.37009V17.9999H13.3333V12.9999C13.3333 12.5579 13.1577 12.1339 12.8452 11.8214C12.5326 11.5088 12.1087 11.3332 11.6667 11.3332H8.33333C7.89131 11.3332 7.46738 11.5088 7.15482 11.8214C6.84226 12.1339 6.66667 12.5579 6.66667 12.9999V17.9999H3.33333V8.36942L9.98714 2.00067C9.99126 2.00032 9.99574 2.00011 10.0005 2.00011C10.0048 2.00012 10.009 2.0003 10.0128 2.00062Z"
        fill={fill}
      />
    </svg>
  );
};

export const BellIcon = ({ width, height, color }) => {
  const fill = color || "currentColor";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.38805 3.11898C7.77834 1.82228 8.91262 0.5 10.5921 0.5C12.2718 0.5 13.4042 1.82135 13.7978 3.1158C13.8022 3.12541 13.8082 3.13427 13.8155 3.14201C13.8247 3.15177 13.8357 3.15954 13.848 3.16484C14.8264 3.56835 15.9779 4.21216 16.8789 5.39014C17.7881 6.57892 18.3796 8.2293 18.3796 10.5323C18.3796 12.8285 18.6216 14.0876 18.9782 14.9519C19.291 15.7102 19.7025 16.2085 20.2884 16.918C20.3734 17.021 20.4622 17.1285 20.5549 17.2418C21.6336 18.5619 20.6161 20.4192 18.9547 20.4192H14.6242V21.1697C14.6242 22.3182 14.1679 23.4196 13.3559 24.2317C12.5438 25.0438 11.4424 25.5 10.2939 25.5C9.14545 25.5 8.04403 25.0438 7.23195 24.2317C6.41987 23.4196 5.96365 22.3182 5.96365 21.1697V20.4192H2.23414C0.576055 20.4192 -0.459718 18.5721 0.628259 17.2417C0.720907 17.1284 0.809865 17.0207 0.894939 16.9177L0.895562 16.9169C1.48093 16.2082 1.89285 15.7094 2.20592 14.9515C2.41128 14.4544 2.57886 13.8265 2.68438 12.946C2.76232 12.2956 2.80641 11.5073 2.80689 10.5319C2.80696 8.22772 3.39771 6.57761 4.30682 5.38921C5.20862 4.21036 6.36181 3.56742 7.34136 3.16367C7.35299 3.15886 7.36348 3.15164 7.37211 3.14249C7.37821 3.13602 7.3833 3.12869 7.38721 3.12075L7.38805 3.11898ZM4.53898 10.5323C4.53898 9.85116 4.59791 9.25537 4.70091 8.73301C4.89954 7.72583 5.26212 6.9912 5.68253 6.44162C5.76833 6.32947 5.8577 6.2235 5.95005 6.12332C6.55276 5.46956 7.28465 5.06047 8.00221 4.76474C8.24049 4.66639 8.45518 4.51856 8.63207 4.33104C8.80896 4.14352 8.94402 3.92059 9.02832 3.67698C9.03299 3.66348 9.03733 3.64987 9.04132 3.63616C9.28847 2.7884 9.9253 2.2321 10.5921 2.2321C11.2589 2.2321 11.8953 2.7873 12.1459 3.63746C12.1499 3.65112 12.1543 3.66468 12.159 3.67813C12.2436 3.92051 12.3783 4.14236 12.5543 4.32929C12.7303 4.51622 12.9436 4.66404 13.1804 4.76314L13.1848 4.76495C14.0105 5.10518 14.8568 5.59751 15.5031 6.44242C16.1421 7.27789 16.6475 8.53976 16.6475 10.5323C16.6475 12.9267 16.8957 14.4459 17.3769 15.6124C17.7959 16.6281 18.3814 17.3336 18.9625 18.0337C19.0464 18.1349 19.1303 18.2359 19.2136 18.3378C19.2677 18.404 19.2725 18.4731 19.237 18.5431C19.204 18.6083 19.1252 18.6871 18.9547 18.6871H2.23413C2.05672 18.6871 1.97654 18.6053 1.94423 18.542C1.92564 18.5056 1.92009 18.4702 1.92277 18.4407C1.92513 18.4147 1.93498 18.38 1.96935 18.3379C2.05296 18.2356 2.13718 18.1342 2.2215 18.0326C2.80223 17.333 3.38756 16.6278 3.80681 15.6128C4.28866 14.4463 4.53781 12.9268 4.53898 10.5323ZM12.8921 20.4192H7.69575V21.1697C7.69575 21.8588 7.96948 22.5197 8.45673 23.0069C8.94398 23.4942 9.60483 23.7679 10.2939 23.7679C10.983 23.7679 11.6438 23.4942 12.1311 23.0069C12.6183 22.5197 12.8921 21.8588 12.8921 21.1697V20.4192Z"
        fill={fill}
      />
    </svg>
  );
};

export const SearchIcon = ({ width, height, color }) => {
  const fill = color || "currentColor";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.47013 0.000565052C7.36927 -0.0122642 6.2768 0.193485 5.25601 0.605892C4.23523 1.0183 3.30643 1.62916 2.52343 2.4031C1.74042 3.17703 1.11877 4.09865 0.694497 5.11456C0.270223 6.13047 0.0517578 7.22046 0.0517578 8.32141C0.0517578 9.42235 0.270223 10.5123 0.694497 11.5283C1.11877 12.5442 1.74042 13.4658 2.52343 14.2397C3.30643 15.0137 4.23523 15.6245 5.25601 16.0369C6.2768 16.4493 7.36927 16.6551 8.47013 16.6422C10.3732 16.6201 12.202 15.9467 13.6588 14.7486L18.687 19.7748C18.9875 20.0751 19.4745 20.075 19.7748 19.7746C20.0751 19.4742 20.075 18.9872 19.7746 18.6868L14.7516 13.6658C16.0021 12.1734 16.6946 10.2828 16.6946 8.32141C16.6946 6.13123 15.8311 4.02936 14.2915 2.47167C12.7518 0.913981 10.6602 0.026087 8.47013 0.000565052ZM5.83227 2.03223C6.66434 1.69606 7.55485 1.52835 8.45221 1.5388C10.2374 1.55961 11.9424 2.28336 13.1974 3.55308C14.4524 4.82281 15.1562 6.53612 15.1562 8.32141C15.1562 10.1067 14.4524 11.82 13.1974 13.0897C11.9424 14.3595 10.2374 15.0832 8.45221 15.104C7.55485 15.1145 6.66434 14.9468 5.83227 14.6106C5.00019 14.2744 4.2431 13.7765 3.60484 13.1456C2.96659 12.5148 2.45986 11.7635 2.11402 10.9354C1.76818 10.1073 1.5901 9.21882 1.5901 8.32141C1.5901 7.42399 1.76818 6.5355 2.11402 5.7074C2.45986 4.8793 2.96659 4.12805 3.60484 3.49719C4.2431 2.86633 5.00019 2.36839 5.83227 2.03223Z"
        fill={fill}
      />
    </svg>
  );
};
