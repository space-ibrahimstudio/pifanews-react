import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import useAuth from "./libs/guards/auth";
import RedirectPage from "./libs/guards/routes";
import HomePage from "./pages/home";
import ErrorPage from "./pages/error";
import InsightPage from "./pages/insight";
import CompanyPage from "./pages/company";
import CategoryPage from "./pages/category";
import PostPage from "./pages/post";
import LoginPage from "./pages/login";
import TagPage from "./pages/tag";
import SearchPage from "./pages/search";
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
      <Route path="*" element={<ErrorPage />} />
      <Route path="/informasi/:cslug" element={<CompanyPage />} />
      <Route path="/berita/insight/:islug" element={<InsightPage />} />
      <Route path="/berita/kategori/:category" element={<CategoryPage />} />
      <Route path="/berita/:slug" element={<PostPage />} />
      <Route path="/berita/tag/:slug" element={<TagPage />} />
      <Route path="/pencarian/:query" element={<SearchPage />} />
      <Route path="/login" element={isLoggedin ? <RedirectPage destination="/dashboard" /> : <LoginPage />} />
      <Route path="/dashboard/:scope/:slug" element={isLoggedin ? <DashboardSlugPage /> : <RedirectPage destination="/login" />} />
      <Route path="/dashboard/:uscope/:uslug/update/:params" element={isLoggedin ? <DashboardUpdatePage /> : <RedirectPage destination="/login" />} />
      {/* no-index redirect */}
      <Route path="/informasi" element={<RedirectPage destination="/informasi/pedoman-media-siber" />} />
      <Route path="/berita" element={<RedirectPage destination="/berita/insight/trending" />} />
      <Route path="/berita/kategori" element={<RedirectPage destination="/berita/kategori/pifabiz" />} />
      <Route path="/berita/tag" element={<RedirectPage destination="/berita/tag/indonesia" />} />
      <Route path="/berita/insight" element={<RedirectPage destination="/berita/insight/trending" />} />
      <Route path="/pencarian" element={<RedirectPage destination="/" />} />
      <Route path="/about" element={<RedirectPage destination="/informasi/tentang-pifa" />} />
      <Route path="/tentang" element={<RedirectPage destination="/informasi/tentang-pifa" />} />
      <Route path="/help" element={<RedirectPage destination="/informasi/faq" />} />
      <Route path="/bantuan" element={<RedirectPage destination="/informasi/faq" />} />
      <Route path="/masuk" element={<RedirectPage destination="/login" />} />
      <Route path="/dashboard" element={isLoggedin ? <RedirectPage destination="/dashboard/berita/isi-berita" /> : <RedirectPage destination="/login" />} />
    </Routes>
  );
}

export default App;
