import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import CategoryPage from "./pages/category";

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:category" element={<CategoryPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
