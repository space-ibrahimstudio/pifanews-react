import React from "react";
import { Navigate } from "react-router-dom";

const RedirectPage = ({ destination }) => {
  return <Navigate to={destination} replace />;
};

export default RedirectPage;
