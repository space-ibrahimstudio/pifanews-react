import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useApi } from "./libs/plugins/api";
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
  const { apiGet } = useApi();
  const [catNewsData, setCatNewsData] = useState([]);

  const fetchData = async () => {
    try {
      const catnewsdata = await apiGet("main", "categorynew");
      setCatNewsData(catnewsdata && catnewsdata.data && catnewsdata.data.length > 0 ? catnewsdata.data : []);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {catNewsData.map((item, index) => (
        <Route key={index} path={`/berita/kategori/${item.slug}`} element={<CategoryPage category={item.slug} />} />
      ))}
      <Route path="/berita/:slug" element={<PostPage />} />
      <Route path="/berita/tag/:slug" element={<TagPage />} />
      <Route path="/pencarian/:query" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/:scope/:slug" element={<DashboardSlugPage />} />
      <Route path="/dashboard/berita/isi-berita/update/:params" element={<DashboardUpdatePage />} />
    </Routes>
  );
}

export default App;
