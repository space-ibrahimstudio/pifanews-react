import React, { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import SearchPage from "./pages/search";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/event/:slug" element={<Navigate to="/" replace />} />
      <Route path="/pencarian/:query" element={<SearchPage />} />
      {/* no-index redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/event" element={<Navigate to="/" replace />} />
      <Route path="/pencarian" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
