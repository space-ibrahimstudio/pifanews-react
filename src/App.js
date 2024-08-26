import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useFetch } from "./libs/plugins/fetch";
import HomePage from "./pages/home";
import CategoryPage from "./pages/category";
import PostPage from "./pages/post";
import LoginPage from "./pages/login";
import TagPage from "./pages/tag";
import SearchPage from "./pages/search";
import DashboardPage from "./pages/dashboard";
import DashboardSlugPage from "./pages/dashboard-slug";

function App() {
  const location = useLocation();
  const { categoryData } = useFetch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {categoryData.map((item, index) => (
        <Route key={index} path={`/berita/kategori/${item.slug}`} element={<CategoryPage category={item.slug} />} />
      ))}
      <Route path="/berita/:slug" element={<PostPage />} />
      <Route path="/berita/tag/:slug" element={<TagPage />} />
      <Route path="/pencarian/:query" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/:scope/:slug" element={<DashboardSlugPage />} />
    </Routes>
  );
}

export default App;
