import React, { Fragment } from "react";

const Grid = ({ id, gridTemplateRows = "unset", gridTemplateColumns = "unset", flex = "unset", cwidth = "unset", maxWidth = "unset", minWidth = "unset", padding = "unset", gap = "var(--pixel-25)", backgroundColor = "transparent", children }) => {
  const sectionid = `${id}-grid`;
  const sectionstyles = { alignSelf: "stretch", display: "grid", gridTemplateRows, gridTemplateColumns, flex, width: cwidth, minWidth, maxWidth, padding, gap, backgroundColor };

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

export default Grid;
