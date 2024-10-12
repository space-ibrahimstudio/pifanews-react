import React, { Fragment } from "react";

const useGraph = () => {
  const getStyles = (flex, size, align, color, type, weight, opacity, style, decoration) => {
    return { flex, position: "relative", margin: "0", alignSelf: "stretch", textAlign: align, color, fontFamily: type === "primary" ? "var(--font-jakarta)" : "var(--font-inter)", fontSize: size === "inherit" ? "inherit" : `var(--font-${size})`, fontWeight: weight, fontStyle: style, textDecoration: decoration, opacity, lineHeight: type === "primary" ? "unset" : "135%", margin: "0" };
  };

  const H1 = ({ id, flex = "1", size = "md", align = "left", color = "inherit", weight = "700", style = "normal", decoration = "unset", type = "primary", opacity = "1", children }) => {
    const compid = `${id}-h1`;
    return (
      <h1 id={compid} style={getStyles(flex, size, align, color, type, weight, opacity, style, decoration)}>
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
      </h1>
    );
  };

  const Span = ({ id, flex = "1", size = "inherit", align = "left", color = "inherit", weight = "inherit", style = "normal", decoration = "unset", type = "secondary", opacity = "1", children }) => {
    const compid = `${id}-span`;
    return (
      <span id={compid} style={getStyles(flex, size, align, color, type, weight, opacity, style, decoration)}>
        {children}
      </span>
    );
  };

  const P = ({ id, flex = "1", size = "sm", align = "left", color = "inherit", weight = "500", style = "normal", decoration = "unset", type = "secondary", opacity = "1", children }) => {
    const compid = `${id}-paragraph`;
    return (
      <p id={compid} style={getStyles(flex, size, align, color, type, weight, opacity, style, decoration)}>
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
      </p>
    );
  };

  return { H1, Span, P };
};

export default useGraph;
