import React, { Fragment } from "react";
import { useWindow } from "@ibrahimstudio/react";
import Navbar from "../navigation/navbar";
import Footer from "../navigation/footer";

export const Header = ({ id, isasChild = false, display = "flex", flex = "unset", cwidth = "unset", maxWidth = "unset", minWidth = "unset", alignSelf = "stretch", overflow = "hidden", padding = "unset", gap = "var(--pixel-25)", direction = "column", alignItems = "flex-start", justifyContent = "flex-start", isWrap = false, isWrapReverse = false, color = "var(--color-secondary)", backgroundColor = "transparent", margin = "unset", children }) => {
  const { width } = useWindow();
  const sectionid = `${id}-header`;
  const headerstyles = { alignSelf, overflow, display, flex, width: cwidth, minWidth, maxWidth, flexDirection: isWrap ? "row" : direction, flexWrap: isWrap ? (isWrapReverse ? "wrap-reverse" : "wrap") : "unset", alignItems, justifyContent, padding: isasChild ? padding : width <= 910 ? (width > 700 ? "var(--pixel-20) var(--pixel-30)" : "var(--pixel-20)") : "var(--pixel-20) var(--pixel-70)", gap, color, backgroundColor, margin };

  return (
    <header id={sectionid} style={headerstyles}>
      {/* {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === Fragment) {
            return (
              <Fragment>
                {React.Children.map(child.props.children, (fragmentChild) => {
                  if (React.isValidElement(fragmentChild)) {
                    const combinedId = fragmentChild.props.id ? `${sectionid}-${fragmentChild.props.id}` : sectionid;
                    return React.cloneElement(fragmentChild, { id: combinedId });
                  }
                  return fragmentChild;
                })}
              </Fragment>
            );
          }
          const combinedId = child.props.id ? `${sectionid}-${child.props.id}` : sectionid;
          return React.cloneElement(child, { id: combinedId });
        }
        return child;
      })} */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === Fragment) {
            return <Fragment>{React.Children.map(child.props.children, (fragmentChild) => (React.isValidElement(fragmentChild) ? React.cloneElement(fragmentChild, { id: sectionid }) : fragmentChild))}</Fragment>;
          }
          return React.cloneElement(child, { id: sectionid });
        }
        return child;
      })}
    </header>
  );
};

export const Section = ({ id, display = "flex", flex = "unset", cwidth = "unset", maxWidth = "unset", minWidth = "unset", cheight = "unset", maxHeight = "unset", minHeight = "unset", alignSelf = "stretch", overflow = "hidden", padding = "unset", gap = "var(--pixel-25)", direction = "column", alignItems = "flex-start", justifyContent = "flex-start", isWrap = false, isWrapReverse = false, backgroundColor = "transparent", textAlign = "unset", margin = "unset", children }) => {
  const sectionid = `${id}-section`;
  const sectionstyles = { alignSelf, display, flex, width: cwidth, minWidth, maxWidth, height: cheight, minHeight, maxHeight, flexDirection: isWrap ? "row" : direction, flexWrap: isWrap ? (isWrapReverse ? "wrap-reverse" : "wrap") : "unset", alignItems, justifyContent, padding, gap, backgroundColor, textAlign, margin };
  const getOverflow = () => {
    let styles;
    switch (overflow) {
      case "x-open":
        styles = { overflowX: "auto" };
        break;
      case "y-open":
        styles = { overflowY: "auto" };
        break;
      case "xy-open":
        styles = { overflow: "auto" };
        break;
      case "hidden":
        styles = { overflow: "hidden" };
        break;
      default:
        break;
    }
    return styles;
  };

  return (
    <section id={sectionid} style={{ ...sectionstyles, ...getOverflow() }}>
      {/* {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === Fragment) {
            return (
              <Fragment>
                {React.Children.map(child.props.children, (fragmentChild) => {
                  if (React.isValidElement(fragmentChild)) {
                    const combinedId = fragmentChild.props.id ? `${sectionid}-${fragmentChild.props.id}` : sectionid;
                    return React.cloneElement(fragmentChild, { id: combinedId });
                  }
                  return fragmentChild;
                })}
              </Fragment>
            );
          }
          const combinedId = child.props.id ? `${sectionid}-${child.props.id}` : sectionid;
          return React.cloneElement(child, { id: combinedId });
        }
        return child;
      })} */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === Fragment) {
            return <Fragment>{React.Children.map(child.props.children, (fragmentChild) => (React.isValidElement(fragmentChild) ? React.cloneElement(fragmentChild, { id: sectionid }) : fragmentChild))}</Fragment>;
          }
          return React.cloneElement(child, { id: sectionid });
        }
        return child;
      })}
    </section>
  );
};

export const Container = ({ id, display = "flex", flex = "unset", cwidth = "unset", maxWidth = "unset", minWidth = "unset", cheight = "unset", maxHeight = "unset", minHeight = "unset", alignSelf = "stretch", overflow = "hidden", padding = "unset", gap = "var(--pixel-25)", direction = "column", alignItems = "flex-start", justifyContent = "flex-start", isWrap = false, isWrapReverse = false, backgroundColor = "transparent", textAlign = "unset", children }) => {
  const { width } = useWindow();
  const sectionid = `${id}-container`;
  const sectionstyles = { alignSelf, overflow, display, flex, width: cwidth, minWidth, maxWidth, height: cheight, minHeight, maxHeight, flexDirection: isWrap ? "row" : direction, flexWrap: isWrap ? (isWrapReverse ? "wrap-reverse" : "wrap") : "unset", alignItems, justifyContent, padding: padding !== "unset" ? padding : width <= 910 ? (width > 700 ? "var(--pixel-20) var(--pixel-30)" : "var(--pixel-20)") : "var(--pixel-20) var(--pixel-70)", gap, backgroundColor, textAlign };

  return (
    <section id={sectionid} style={sectionstyles}>
      {/* {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === Fragment) {
            return (
              <Fragment>
                {React.Children.map(child.props.children, (fragmentChild) => {
                  if (React.isValidElement(fragmentChild)) {
                    const combinedId = fragmentChild.props.id ? `${sectionid}-${fragmentChild.props.id}` : sectionid;
                    return React.cloneElement(fragmentChild, { id: combinedId });
                  }
                  return fragmentChild;
                })}
              </Fragment>
            );
          }
          const combinedId = child.props.id ? `${sectionid}-${child.props.id}` : sectionid;
          return React.cloneElement(child, { id: combinedId });
        }
        return child;
      })} */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === Fragment) {
            return <Fragment>{React.Children.map(child.props.children, (fragmentChild) => (React.isValidElement(fragmentChild) ? React.cloneElement(fragmentChild, { id: sectionid }) : fragmentChild))}</Fragment>;
          }
          return React.cloneElement(child, { id: sectionid });
        }
        return child;
      })}
    </section>
  );
};

const Page = ({ pageid, isFullscreen = false, type = "public", children }) => {
  const pagestyles = { width: "100%", position: "relative", paddingTop: isFullscreen ? "unset" : "var(--pixel-140)", backgroundColor: "var(--color-foreground)", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" };
  return (
    <main id={pageid} style={pagestyles}>
      {!isFullscreen && <Navbar id={pageid} parentType={type} />}
      {/* {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === Fragment) {
            return (
              <Fragment>
                {React.Children.map(child.props.children, (fragmentChild) => {
                  if (React.isValidElement(fragmentChild)) {
                    const combinedId = fragmentChild.props.id ? `${pageid}-${fragmentChild.props.id}` : pageid;
                    return React.cloneElement(fragmentChild, { id: combinedId });
                  }
                  return fragmentChild;
                })}
              </Fragment>
            );
          }
          const combinedId = child.props.id ? `${pageid}-${child.props.id}` : pageid;
          return React.cloneElement(child, { id: combinedId });
        }
        return child;
      })} */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === Fragment) {
            return <Fragment>{React.Children.map(child.props.children, (fragmentChild) => (React.isValidElement(fragmentChild) ? React.cloneElement(fragmentChild, { id: pageid }) : fragmentChild))}</Fragment>;
          }
          return React.cloneElement(child, { id: pageid });
        }
        return child;
      })}
      {!isFullscreen && <Footer id={pageid} />}
    </main>
  );
};

export default Page;
