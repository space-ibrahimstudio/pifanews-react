import React, { useRef, useState, useEffect } from "react";
import { useDevmode } from "@ibrahimstudio/react";
import styles from "./styles/text-editor.module.css";

const ToolButton = ({ id, isActive, children, onClick }) => {
  const compid = `${id}-editor-tool-button`;
  return (
    <button id={compid} className={`${styles.toolButton} ${isActive ? styles.active : ""}`} onClick={onClick}>
      {React.Children.map(children, (child) => {
        return React.isValidElement(child) ? React.cloneElement(child, { id: compid }) : child;
      })}
    </button>
  );
};

const ToolGroup = ({ id, children }) => {
  const compid = `${id}-editor-tool-group`;
  const groupstyles = { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "var(--pixel-10)", gap: "var(--pixel-5)" };
  return (
    <section id={compid} style={groupstyles}>
      {React.Children.map(children, (child) => {
        return React.isValidElement(child) ? React.cloneElement(child, { id: compid }) : child;
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
      {React.Children.map(children, (child) => {
        return React.isValidElement(child) ? React.cloneElement(child, { id: compid }) : child;
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

export const EditorToolbar = ({ id, tools, formatText, toggleHeading, activeFormats }) => {
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
      {React.Children.map(children, (child) => {
        return React.isValidElement(child) ? React.cloneElement(child, { id: compid, editorRef, formatText, toggleHeading, activeFormats, handleInput, handlePaste }) : child;
      })}
    </form>
  );
};

export default TextEditor;
