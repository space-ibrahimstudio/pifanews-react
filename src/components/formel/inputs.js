import React, { Fragment } from "react";

const Fieldset = ({ id, gap = "var(--pixel-10)", children }) => {
  const compid = `${id}-fieldset`;
  const basestyles = { display: "flex", flexDirection: "row", alignItems: "flex-start", gap };
  const wrapstyles = { alignSelf: "stretch", justifyContent: "center", textAlign: "left", fontSize: "var(--font-sm)", color: "var(--color-hint)", fontFamily: "var(--font-inter)" };
  const bodystyles = { flex: "1", flexWrap: "wrap", justifyContent: "flex-start" };

  return (
    <section id={compid} style={{ ...basestyles, ...wrapstyles }}>
      <div style={{ ...basestyles, ...bodystyles }}>
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
      </div>
    </section>
  );
};

export default Fieldset;
