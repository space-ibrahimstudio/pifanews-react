import React, { createContext, useContext } from "react";

const DocumentContext = createContext();

export const Document = ({ children }) => {
  const company = "Pifa News";
  const short = "pifa";

  return (
    <DocumentContext.Provider value={{ company, short }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => useContext(DocumentContext);
