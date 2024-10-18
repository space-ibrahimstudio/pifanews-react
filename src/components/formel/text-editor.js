import React, { Fragment, useRef, useState, useEffect } from "react";
import axios from "axios";
import { useDevmode } from "@ibrahimstudio/react";
import useAuth from "../../libs/guards/auth";
import styles from "./styles/text-editor.module.css";

const apiURL = process.env.REACT_APP_API_URL;

const ToolButton = ({ id, isActive, children, onClick }) => {
  const compid = `${id}-editor-tool-button`;
  return (
    <button id={compid} className={`${styles.toolButton} ${isActive ? styles.active : ""}`} onClick={onClick}>
      {/* {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === Fragment) {
            return (
              <Fragment>
                {React.Children.map(child.props.children, (fragmentChild) => {
                  if (React.isValidElement(fragmentChild)) {
                    const combinedId = fragmentChild.props.id ? `${compid}-${fragmentChild.props.id}` : compid;
                    return React.cloneElement(fragmentChild, { id: combinedId });
                  }
                  return fragmentChild;
                })}
              </Fragment>
            );
          }
          const combinedId = child.props.id ? `${compid}-${child.props.id}` : compid;
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
    </button>
  );
};

const ToolGroup = ({ id, children }) => {
  const compid = `${id}-editor-tool-group`;
  const groupstyles = { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "var(--pixel-10)", gap: "var(--pixel-5)" };
  return (
    <section id={compid} style={groupstyles}>
      {/* {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === Fragment) {
            return (
              <Fragment>
                {React.Children.map(child.props.children, (fragmentChild) => {
                  if (React.isValidElement(fragmentChild)) {
                    const combinedId = fragmentChild.props.id ? `${compid}-${fragmentChild.props.id}` : compid;
                    return React.cloneElement(fragmentChild, { id: combinedId });
                  }
                  return fragmentChild;
                })}
              </Fragment>
            );
          }
          const combinedId = child.props.id ? `${compid}-${child.props.id}` : compid;
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
    </section>
  );
};

const Tool = ({ id, name, size = "var(--pixel-25)", color }) => {
  const compid = `${id}-${name}`;
  const fill = color ? color : "currentColor";
  const iconstyle = { width: size, height: size, overflow: "hidden", flexShrink: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxSizing: "border-box", color: "inherit" };

  const renderIcon = () => {
    switch (name) {
      case "h1":
        return (
          <svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1153_1680)">
              <path d="M14.9509 10.3949V1.96521H17.9568V23.0348H14.9509V13.4008H3.5059V23.0348H0.5V1.96521H3.5059V10.3949H14.9509Z" fill={fill} />
              <path d="M23.4063 19.2464V12.9652H19.2188V15.0589H21.3125V19.2464H19.2188V21.3402H25.5V19.2464H23.4063Z" fill={fill} />
            </g>
            <defs>
              <clipPath id="clip0_1153_1680">
                <rect width="100%" height="100%" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        );
      case "h2":
        return (
          <svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1153_1695)">
              <path d="M14.9514 10.3949V1.96484H17.9574V23.0352H14.9514V13.4009H3.50601V23.0352H0.5V1.96484H3.50601V10.3949H14.9514Z" fill={fill} />
              <path d="M19.2195 16.1381V21.3719H25.5V19.2784H21.313V18.2317H25.5V12.9979H19.2195V15.0914H23.4065V16.1381H19.2195Z" fill={fill} />
            </g>
            <defs>
              <clipPath id="clip0_1153_1695">
                <rect width="100%" height="100%" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        );
      case "paragraph":
        return (
          <svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.9999 4.08824V23.5H10.4117V17.0294C8.35235 17.0294 6.37737 16.2113 4.9212 14.7552C3.46504 13.299 2.64697 11.324 2.64697 9.26471C2.64697 7.20538 3.46504 5.23039 4.9212 3.77423C6.37737 2.31807 8.35235 1.5 10.4117 1.5H23.3529V4.08824H19.4705V23.5H16.8823V4.08824H12.9999ZM10.4117 4.08824C9.03879 4.08824 7.72214 4.63361 6.75136 5.60439C5.78058 6.57516 5.23521 7.89182 5.23521 9.26471C5.23521 10.6376 5.78058 11.9542 6.75136 12.925C7.72214 13.8958 9.03879 14.4412 10.4117 14.4412V4.08824Z"
              fill={fill}
            />
          </svg>
        );
      case "bold":
        return (
          <svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.5 11.125H13.6875C14.5992 11.125 15.4735 10.7628 16.1182 10.1182C16.7628 9.47352 17.125 8.59918 17.125 7.6875C17.125 6.77582 16.7628 5.90148 16.1182 5.25682C15.4735 4.61216 14.5992 4.25 13.6875 4.25H7.5V11.125ZM21.25 17.3125C21.2496 18.9534 20.5976 20.527 19.4373 21.6873C18.277 22.8476 16.7034 23.4996 15.0625 23.5H4.75V1.5H13.6875C14.8988 1.50005 16.0835 1.85565 17.0946 2.5227C18.1057 3.18974 18.8988 4.1389 19.3755 5.25247C19.8522 6.36604 19.9915 7.59504 19.7763 8.78708C19.561 9.97911 19.0006 11.0817 18.1645 11.9582C19.103 12.502 19.882 13.2829 20.4235 14.2226C20.9651 15.1623 21.2501 16.2279 21.25 17.3125ZM7.5 13.875V20.75H15.0625C15.9742 20.75 16.8485 20.3878 17.4932 19.7432C18.1378 19.0985 18.5 18.2242 18.5 17.3125C18.5 16.4008 18.1378 15.5265 17.4932 14.8818C16.8485 14.2372 15.9742 13.875 15.0625 13.875H7.5Z"
              fill={fill}
            />
          </svg>
        );
      case "italic":
        return (
          <svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.125 23.5H6.125V20.75H10.1496L13.0591 4.25H8.875V1.5H19.875V4.25H15.8504L12.9409 20.75H17.125V23.5Z" fill={fill} />
          </svg>
        );
      case "underline":
        return (
          <svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.1447 14.7983C9.38743 14.0411 8.962 13.014 8.962 11.943V1.5H5.89875V11.943C5.89875 13.8264 6.64692 15.6326 7.97866 16.9644C9.31041 18.2961 11.1166 19.0443 13 19.0443C14.8834 19.0443 16.6896 18.2961 18.0214 16.9644C19.3531 15.6326 20.1013 13.8264 20.1013 11.943V1.5H17.038V11.943C17.038 13.014 16.6126 14.0411 15.8553 14.7983C15.098 15.5556 14.071 15.981 13 15.981C11.9291 15.981 10.902 15.5556 10.1447 14.7983Z" fill={fill} />
            <path fillRule="evenodd" clipRule="evenodd" d="M3.6709 20.4368V23.5H22.3291V20.4368H3.6709Z" fill={fill} />
          </svg>
        );
      case "strikethrough":
        return (
          <svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1153_1630)">
              <path
                d="M20.0867 15.25C20.403 15.9595 20.5625 16.7488 20.5625 17.615C20.5625 19.4603 19.842 20.904 18.4024 21.9421C16.96 22.9803 14.9704 23.5 12.4308 23.5C10.1758 23.5 7.94413 22.9761 5.7345 21.927V18.825C7.8245 20.0309 9.96263 20.6345 12.1502 20.6345C15.6579 20.6345 17.4165 19.628 17.4289 17.6136C17.4361 17.2052 17.361 16.7995 17.2079 16.4208C17.0548 16.0421 16.8269 15.6981 16.5379 15.4095L16.3729 15.2486H0.625V12.4986H25.375V15.2486H20.0867V15.25ZM14.4795 11.125H6.98988C6.74902 10.9054 6.52773 10.6652 6.3285 10.4072C5.7345 9.64 5.4375 8.71325 5.4375 7.6215C5.4375 5.922 6.07825 4.47687 7.35837 3.28612C8.64125 2.09537 10.6226 1.5 13.3053 1.5C15.3279 1.5 17.2639 1.951 19.1105 2.853V5.812C17.4605 4.86738 15.6524 4.39575 13.6848 4.39575C10.2748 4.39575 8.57113 5.471 8.57113 7.6215C8.57113 8.199 8.87087 8.70225 9.47037 9.13262C10.0699 9.563 10.8096 9.90537 11.6882 10.1639C12.5407 10.4114 13.4716 10.7331 14.4795 11.125Z"
                fill={fill}
              />
            </g>
            <defs>
              <clipPath id="clip0_1153_1630">
                <rect width="100%" height="100%" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        );
      case "ol":
        return (
          <svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.79325 2.08664H24.7149V4.68997H7.79325V2.08664ZM3.88825 0.784973V4.68997H5.18991V5.99164H1.28491V4.68997H2.58658V2.08664H1.28491V0.784973H3.88825ZM1.28491 15.1033V11.8491H3.88825V11.1983H1.28491V9.89664H5.18991V13.1508H2.58658V13.8016H5.18991V15.1033H1.28491ZM3.88825 22.2625H1.28491V20.9608H3.88825V20.31H1.28491V19.0083H5.18991V24.215H1.28491V22.9133H3.88825V22.2625ZM7.79325 11.1983H24.7149V13.8016H7.79325V11.1983ZM7.79325 20.31H24.7149V22.9133H7.79325V20.31Z"
              fill={fill}
            />
          </svg>
        );
      case "ul":
        return (
          <svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.79281 2.15089H24.7159V4.75444H7.79281V2.15089ZM3.2366 5.40533C2.71872 5.40533 2.22205 5.1996 1.85586 4.8334C1.48966 4.46721 1.28394 3.97054 1.28394 3.45266C1.28394 2.93478 1.48966 2.43812 1.85586 2.07192C2.22205 1.70573 2.71872 1.5 3.2366 1.5C3.75448 1.5 4.25114 1.70573 4.61734 2.07192C4.98354 2.43812 5.18926 2.93478 5.18926 3.45266C5.18926 3.97054 4.98354 4.46721 4.61734 4.8334C4.25114 5.1996 3.75448 5.40533 3.2366 5.40533ZM3.2366 14.5178C2.71872 14.5178 2.22205 14.312 1.85586 13.9458C1.48966 13.5796 1.28394 13.083 1.28394 12.5651C1.28394 12.0472 1.48966 11.5505 1.85586 11.1843C2.22205 10.8182 2.71872 10.6124 3.2366 10.6124C3.75448 10.6124 4.25114 10.8182 4.61734 11.1843C4.98354 11.5505 5.18926 12.0472 5.18926 12.5651C5.18926 13.083 4.98354 13.5796 4.61734 13.9458C4.25114 14.312 3.75448 14.5178 3.2366 14.5178ZM3.2366 23.5C2.71872 23.5 2.22205 23.2943 1.85586 22.9281C1.48966 22.5619 1.28394 22.0652 1.28394 21.5473C1.28394 21.0295 1.48966 20.5328 1.85586 20.1666C2.22205 19.8004 2.71872 19.5947 3.2366 19.5947C3.75448 19.5947 4.25114 19.8004 4.61734 20.1666C4.98354 20.5328 5.18926 21.0295 5.18926 21.5473C5.18926 22.0652 4.98354 22.5619 4.61734 22.9281C4.25114 23.2943 3.75448 23.5 3.2366 23.5ZM7.79281 11.2633H24.7159V13.8669H7.79281V11.2633ZM7.79281 20.3757H24.7159V22.9793H7.79281V20.3757Z"
              fill={fill}
            />
          </svg>
        );
      case "image":
        return (
          <svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1153_1617)">
              <path
                d="M21.7999 14.7V18H25.0999V20.2H21.7999V23.5H19.5999V20.2H16.2999V18H19.5999V14.7H21.7999ZM21.8087 1.5C22.4115 1.5 22.8999 1.9895 22.8999 2.5923V12.5H20.6999V3.7H3.0999V19.0989L14.0999 8.1L17.3999 11.4V14.5119L14.0999 11.2119L6.2096 19.1H14.0999V21.3H1.9911C1.7016 21.2997 1.42405 21.1845 1.21944 20.9797C1.01483 20.7749 0.899902 20.4972 0.899902 20.2077V2.5923C0.901915 2.30342 1.01749 2.02692 1.22167 1.82254C1.42584 1.61816 1.70222 1.5023 1.9911 1.5H21.8087ZM7.4999 5.9C8.08338 5.9 8.64296 6.13179 9.05554 6.54437C9.46812 6.95695 9.6999 7.51652 9.6999 8.1C9.6999 8.68348 9.46812 9.24305 9.05554 9.65563C8.64296 10.0682 8.08338 10.3 7.4999 10.3C6.91643 10.3 6.35685 10.0682 5.94427 9.65563C5.53169 9.24305 5.2999 8.68348 5.2999 8.1C5.2999 7.51652 5.53169 6.95695 5.94427 6.54437C6.35685 6.13179 6.91643 5.9 7.4999 5.9Z"
                fill={fill}
              />
            </g>
            <defs>
              <clipPath id="clip0_1153_1617">
                <rect width="100%" height="100%" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        );
      case "video":
        return (
          <svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1153_1622)">
              <path
                d="M17.5455 3.40912C17.8468 3.40912 18.1359 3.52884 18.349 3.74195C18.5621 3.95506 18.6818 4.2441 18.6818 4.54548V9.31821L24.6057 5.17048C24.6909 5.11077 24.7908 5.07559 24.8946 5.06878C24.9984 5.06197 25.1021 5.08378 25.1943 5.13184C25.2866 5.1799 25.3639 5.25237 25.4178 5.34134C25.4717 5.43031 25.5001 5.53237 25.5 5.63639V19.3637C25.5001 19.4677 25.4717 19.5697 25.4178 19.6587C25.3639 19.7477 25.2866 19.8202 25.1943 19.8682C25.1021 19.9163 24.9984 19.9381 24.8946 19.9313C24.7908 19.9245 24.6909 19.8893 24.6057 19.8296L18.6818 15.6818V20.4546C18.6818 20.756 18.5621 21.045 18.349 21.2581C18.1359 21.4712 17.8468 21.5909 17.5455 21.5909H1.63636C1.33498 21.5909 1.04594 21.4712 0.832833 21.2581C0.619724 21.045 0.5 20.756 0.5 20.4546V4.54548C0.5 4.2441 0.619724 3.95506 0.832833 3.74195C1.04594 3.52884 1.33498 3.40912 1.63636 3.40912H17.5455ZM16.4091 5.68185H2.77273V19.3182H16.4091V5.68185ZM8.45455 7.95457H10.7273V11.3637H14.1364V13.6364H10.7261L10.7273 17.0455H8.45455L8.45341 13.6364H5.04545V11.3637H8.45455V7.95457ZM23.2273 8.91025L18.6818 12.0921V12.908L23.2273 16.0898V8.91025Z"
                fill={fill}
              />
            </g>
            <defs>
              <clipPath id="clip0_1153_1622">
                <rect width="100%" height="100%" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        );
      case "file":
        return (
          <svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.9001 8.1V22.3923C22.9011 22.5368 22.8737 22.68 22.8193 22.8138C22.765 22.9477 22.6848 23.0695 22.5834 23.1724C22.4819 23.2752 22.3612 23.3571 22.2282 23.4133C22.0951 23.4695 21.9523 23.499 21.8078 23.5H4.1924C3.90289 23.5 3.62523 23.3851 3.42041 23.1805C3.2156 22.9759 3.10039 22.6983 3.1001 22.4088V2.5912C3.1001 2.0005 3.594 1.5 4.2023 1.5H16.2968L22.9001 8.1ZM20.7001 9.2H15.2001V3.7H5.3001V21.3H20.7001V9.2ZM8.6001 7H11.9001V9.2H8.6001V7ZM8.6001 11.4H17.4001V13.6H8.6001V11.4ZM8.6001 15.8H17.4001V18H8.6001V15.8Z"
              fill={fill}
            />
          </svg>
        );
      case "link":
        return (
          <svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.1863 8.14627L15.7699 9.72995C17.2388 11.1995 18.064 13.1923 18.064 15.27C18.064 17.3478 17.2388 19.3406 15.7699 20.8101L15.3737 21.2052C14.6462 21.9328 13.7825 22.5099 12.8319 22.9036C11.8814 23.2973 10.8625 23.5 9.83365 23.5C8.80476 23.5 7.78595 23.2973 6.83538 22.9036C5.88481 22.5099 5.0211 21.9328 4.29356 21.2052C3.56602 20.4777 2.98891 19.614 2.59517 18.6634C2.20143 17.7128 1.99878 16.694 1.99878 15.6651C1.99878 14.6362 2.20143 13.6174 2.59517 12.6668C2.98891 11.7163 3.56603 10.8526 4.29356 10.125L5.87724 11.7087C5.35387 12.2275 4.93812 12.8446 4.65387 13.5245C4.36961 14.2044 4.22246 14.9338 4.22084 15.6708C4.21923 16.4077 4.36319 17.1377 4.64446 17.8189C4.92573 18.5 5.33878 19.1189 5.85988 19.64C6.38098 20.1611 6.99987 20.5742 7.68103 20.8554C8.36219 21.1367 9.09219 21.2807 9.82914 21.2791C10.5661 21.2774 11.2954 21.1303 11.9754 20.846C12.6553 20.5618 13.2724 20.146 13.7912 19.6227L14.1874 19.2265C15.2365 18.177 15.8258 16.7539 15.8258 15.27C15.8258 13.7862 15.2365 12.363 14.1874 11.3136L12.6037 9.72995L14.1874 8.14739L14.1863 8.14627ZM21.7051 14.8738L20.1226 13.2913C20.9109 12.5101 21.4492 11.5121 21.6688 10.4242C21.8885 9.33632 21.7796 8.20767 21.356 7.18181C20.9325 6.15596 20.2134 5.27924 19.2903 4.66317C18.3671 4.04709 17.2816 3.71949 16.1717 3.72203C15.4348 3.72366 14.7054 3.87082 14.0255 4.15508C13.3456 4.43933 12.7285 4.85509 12.2097 5.37846L11.8124 5.77354C10.7633 6.82296 10.174 8.24608 10.174 9.72995C10.174 11.2138 10.7633 12.6369 11.8124 13.6864L13.3961 15.27L11.8124 16.8526L10.2299 15.27C9.50227 14.5425 8.92512 13.6788 8.53135 12.7283C8.13758 11.7777 7.93491 10.7589 7.93491 9.72995C7.93491 8.70105 8.13758 7.68222 8.53135 6.73165C8.92512 5.78107 9.50227 4.91737 10.2299 4.18986L10.6261 3.79478C12.0954 2.32546 14.0882 1.5 16.1661 1.5C18.2441 1.5 20.2369 2.32546 21.7062 3.79478C23.1756 5.2641 24.001 7.25693 24.001 9.33487C24.001 11.4128 23.1756 13.4056 21.7062 14.875L21.7051 14.8738Z"
              fill={fill}
            />
          </svg>
        );
      default:
        return null;
    }
  };
  return (
    <div id={compid} className={styles.isIcon} style={iconstyle}>
      {renderIcon()}
    </div>
  );
};

export const EditorFooter = ({ id, children }) => {
  const compid = `${id}-editor-footer`;
  const footerstyles = { alignSelf: "stretch", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: "var(--pixel-10)" };
  return (
    <footer id={compid} style={footerstyles}>
      {/* {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === Fragment) {
            return (
              <Fragment>
                {React.Children.map(child.props.children, (fragmentChild) => {
                  if (React.isValidElement(fragmentChild)) {
                    const combinedId = fragmentChild.props.id ? `${compid}-${fragmentChild.props.id}` : compid;
                    return React.cloneElement(fragmentChild, { id: combinedId });
                  }
                  return fragmentChild;
                })}
              </Fragment>
            );
          }
          const combinedId = child.props.id ? `${compid}-${child.props.id}` : compid;
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
    </footer>
  );
};

export const EditorContent = ({ id, editorRef, handleInput, handlePaste }) => {
  const compid = `${id}-editor-content`;
  return (
    <section id={compid} className={styles.editorContent}>
      <div className={styles.contentArea} ref={editorRef} contentEditable={true} onInput={handleInput} onPaste={handlePaste}></div>
    </section>
  );
};

export const EditorToolbar = ({ id, tools, formatText, toggleHeading, activeFormats, insertImage, insertVideo, insertLink }) => {
  const compid = `${id}-editor-toolbar`;
  const toolbarstyles = { alignSelf: "stretch", overflow: "hidden", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" };
  const actionMap = {
    h1: () => toggleHeading("H1"),
    h2: () => toggleHeading("H2"),
    bold: () => formatText("bold"),
    italic: () => formatText("italic"),
    underline: () => formatText("underline"),
    strikethrough: () => formatText("strikeThrough"),
    ol: () => formatText("insertOrderedList"),
    ul: () => formatText("insertUnorderedList"),
    image: () => insertImage(),
    video: () => insertVideo(),
    link: () => insertLink(),
  };

  const activeTool = (name) => activeFormats[name] || false;
  const handleToolClick = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    const action = actionMap[name];
    if (action) {
      action();
    }
  };

  return (
    <header id={compid} style={toolbarstyles}>
      {tools.map((group, index) => (
        <ToolGroup key={index}>
          {group.map((tool, idx) => {
            return (
              <ToolButton key={idx} onClick={(e) => handleToolClick(e, tool)} isActive={activeTool(tool)}>
                <Tool name={tool} />
              </ToolButton>
            );
          })}
        </ToolGroup>
      ))}
    </header>
  );
};

const TextEditor = ({ id, children, minW = "unset", maxW = "unset", initialContent = "", onSubmit }) => {
  const compid = `${id}-text-editor`;
  const editorRef = useRef(null);
  const { log } = useDevmode();
  const { secret } = useAuth();
  const editorstyles = { flex: "1", minWidth: minW, maxWidth: maxW, borderRadius: "var(--pixel-20)", backgroundColor: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "var(--pixel-20)", gap: "var(--pixel-15)" };
  const [activeFormats, setActiveFormats] = useState({ h1: false, h2: false, paragraph: false, bold: false, italic: false, underline: false, strikethrough: false, ol: false, ul: false });

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    updateActiveFormats();
  };

  const toggleHeading = (heading) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedElement = range.commonAncestorContainer.nodeType === 3 ? range.commonAncestorContainer.parentElement : range.commonAncestorContainer;
      if (selectedElement.tagName === heading) {
        formatText("formatBlock", "P");
      } else {
        formatText("formatBlock", heading);
      }
    }
  };

  const uploadFile = async (file, type) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ secret, type }));
    formData.append("fileimg", file);
    try {
      const url = `${apiURL}/office/uploadfile`;
      const res = await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
      const imagelink = res.data.data[0].link;
      log("success:", res.data);
      return `${apiURL}/images/${imagelink}`;
    } catch (error) {
      console.error(error);
      alert("File upload failed");
      return null;
    }
  };

  const insertImage = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const caption = prompt("Enter the image caption");
        if (caption) {
          try {
            const fileUrl = await uploadFile(file, "img");
            if (fileUrl) {
              const imgHtml = `<img src=${fileUrl} alt="${caption}" loading="lazy" /><i style="position: relative; margin: 0px; align-self: stretch; text-align: left; color: inherit; font-size: var(--font-tiny); font-weight: 500; opacity: 0.5; line-height: 135%;">${caption}</i>`;
              document.execCommand("insertHTML", false, imgHtml);
            }
          } catch (error) {
            console.error(error);
            alert("File upload failed");
          }
        }
      }
    };
    fileInput.click();
  };

  const insertVideo = async () => {
    const url = prompt("Enter the Video URL");
    if (url) {
      const videoHtml = `<iframe loading="lazy" allowfullscreen="true" src=${url}></iframe>`;
      document.execCommand("insertHTML", false, videoHtml);
    }
  };

  const insertLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      const label = prompt("Enter URL label or let it blank");
      const linkHtml = `<a href=${url} target="_blank">${label ? label : url}</a>`;
      document.execCommand("insertHTML", false, linkHtml);
    }
  };

  const updateActiveFormats = () => {
    setActiveFormats({
      h1: document.queryCommandValue("formatBlock") === "H1",
      h2: document.queryCommandValue("formatBlock") === "H2",
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikethrough: document.queryCommandState("strikeThrough"),
      ol: document.queryCommandState("insertOrderedList"),
      ul: document.queryCommandState("insertUnorderedList"),
    });
  };

  const handleInput = () => {
    log(editorRef.current.innerHTML);
    updateActiveFormats();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/html");
    if (pasteData) {
      document.execCommand("insertHTML", false, pasteData);
    } else {
      const text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
    }
  };

  const handleSelectionChange = () => {
    updateActiveFormats();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = editorRef.current.innerHTML;
    const action = e.nativeEvent.submitter.getAttribute("data-action");
    onSubmit(content, action);
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
    }
  }, [initialContent]);

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <form id={compid} onSubmit={handleSubmit} style={editorstyles}>
      {/* {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === Fragment) {
            return (
              <Fragment>
                {React.Children.map(child.props.children, (fragmentChild) => {
                  if (React.isValidElement(fragmentChild)) {
                    const combinedId = fragmentChild.props.id ? `${compid}-${fragmentChild.props.id}` : compid;
                    return React.cloneElement(fragmentChild, { id: combinedId, editorRef, formatText, toggleHeading, activeFormats, handleInput, handlePaste });
                  }
                  return fragmentChild;
                })}
              </Fragment>
            );
          }
          const combinedId = child.props.id ? `${compid}-${child.props.id}` : compid;
          return React.cloneElement(child, { id: combinedId, editorRef, formatText, toggleHeading, activeFormats, handleInput, handlePaste });
        }
        return child;
      })} */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === Fragment) {
            return <Fragment>{React.Children.map(child.props.children, (fragmentChild) => (React.isValidElement(fragmentChild) ? React.cloneElement(fragmentChild, { id: compid, editorRef, formatText, toggleHeading, activeFormats, insertImage, insertVideo, insertLink, handleInput, handlePaste }) : fragmentChild))}</Fragment>;
          }
          return React.cloneElement(child, { id: compid, editorRef, formatText, toggleHeading, activeFormats, insertImage, insertVideo, insertLink, handleInput, handlePaste });
        }
        return child;
      })}
    </form>
  );
};

export default TextEditor;
