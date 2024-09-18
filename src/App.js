import React, { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./libs/guards/auth";
import HomePage from "./pages/home";
import CategoryPage from "./pages/category";
import PostPage from "./pages/post";
import LoginPage from "./pages/login";
import TagPage from "./pages/tag";
import SearchPage from "./pages/search";
import DashboardPage from "./pages/dashboard/index";
import DashboardSlugPage from "./pages/dashboard/slug";
import DashboardUpdatePage from "./pages/dashboard/update";

function App() {
  const location = useLocation();
  const { isLoggedin } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/berita/kategori/:category" element={<CategoryPage />} />
      <Route path="/berita/:slug" element={<PostPage />} />
      <Route path="/berita/tag/:slug" element={<TagPage />} />
      <Route path="/pencarian/:query" element={<SearchPage />} />
      <Route path="/login" element={isLoggedin ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/dashboard" element={isLoggedin ? <DashboardPage /> : <Navigate to="/login" replace />} />
      <Route path="/dashboard/:scope/:slug" element={isLoggedin ? <DashboardSlugPage /> : <Navigate to="/login" replace />} />
      <Route path="/dashboard/:uscope/:uslug/update/:params" element={isLoggedin ? <DashboardUpdatePage /> : <Navigate to="/login" replace />} />
      {/* no-index redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/berita" element={<Navigate to="/" replace />} />
      <Route path="/berita/kategori" element={<Navigate to="/" replace />} />
      <Route path="/berita/tag" element={<Navigate to="/" replace />} />
      <Route path="/pencarian" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
