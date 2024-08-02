import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useFetch } from "./libs/plugins/fetch";
import HomePage from "./pages/home";
import CategoryPage from "./pages/category";
import PostPage from "./pages/post";

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
        <Route key={index} path={`/${item.slug}`} element={<CategoryPage category={item.slug} />} />
      ))}
      <Route path="/berita/:slug" element={<PostPage />} />
    </Routes>
  );
}

export default App;
