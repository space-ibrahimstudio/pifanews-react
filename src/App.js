import React, { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import ErrorPage from "./pages/error";
import InsightPage from "./pages/insight";
import CompanyPage from "./pages/company";
import CategoryPage from "./pages/category";
import PostPage from "./pages/post";
import TagPage from "./pages/tag";
import SearchPage from "./pages/search";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/informasi/:cslug" element={<CompanyPage />} />
      <Route path="/berita/insight/:islug" element={<InsightPage />} />
      <Route path="/berita/kategori/:category" element={<CategoryPage />} />
      <Route path="/berita/:slug" element={<PostPage />} />
      <Route path="/berita/tag/:slug" element={<TagPage />} />
      <Route path="/pencarian/:query" element={<SearchPage />} />
      {/* no-index redirect */}
      <Route path="/informasi" element={<Navigate to="/informasi/pedoman-media-siber" replace />} />
      <Route path="/berita" element={<Navigate to="/berita/insight/trending" replace />} />
      <Route path="/berita/kategori" element={<Navigate to="/berita/kategori/pifabiz" replace />} />
      <Route path="/berita/tag" element={<Navigate to="/berita/tag/indonesia" replace />} />
      <Route path="/berita/insight" element={<Navigate to="/berita/insight/trending" replace />} />
      <Route path="/pencarian" element={<Navigate to="/" replace />} />
      <Route path="/about" element={<Navigate to="/informasi/tentang-pifa" replace />} />
      <Route path="/tentang" element={<Navigate to="/informasi/tentang-pifa" replace />} />
      <Route path="/help" element={<Navigate to="/informasi/faq" replace />} />
      <Route path="/bantuan" element={<Navigate to="/informasi/faq" replace />} />
    </Routes>
  );
}

export default App;
