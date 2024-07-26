import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/home";
import CategoryPage from "./pages/category";
import PostPage from "./pages/post";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:category" element={<CategoryPage />} />
      <Route path="/berita/:slug" element={<PostPage />} />
    </Routes>
  );
}

export default App;
