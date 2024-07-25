import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useApi } from "./api";

const FetchContext = createContext();

export const FetchProvider = ({ children }) => {
  const location = useLocation();
  const formData = new FormData();
  const { apiGet, apiRead, apiCrud } = useApi();
  const [isLoading, setIsloading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [localCatData, setLocalCatData] = useState([]);
  const [trendingPostData, setTrendingPostData] = useState([]);
  const [latestPostData, setLatestPostData] = useState([]);

  const fetchCategories = async () => {
    setIsloading(true);
    try {
      const catdata = await apiGet("main", "categorynew");
      if (catdata && catdata.length > 0) {
        setCategoryData(catdata);
      } else {
        setCategoryData([]);
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setIsloading(false);
    }
  };

  const fetchLocalCats = async () => {
    setIsloading(true);
    try {
      const catdata = await apiGet("main", "categoryarea");
      if (catdata && catdata.length > 0) {
        setLocalCatData(catdata);
      } else {
        setLocalCatData([]);
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setIsloading(false);
    }
  };

  const fetchTrendingPosts = async () => {
    setIsloading(true);
    try {
      formData.append("limit", "10");
      formData.append("hal", "0");
      const postsdata = await apiRead(formData, "main", "trendingnew");
      if (postsdata && postsdata.length > 0) {
        setTrendingPostData(postsdata);
      } else {
        setTrendingPostData([]);
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setIsloading(false);
    }
  };

  const fetchLatestPosts = async () => {
    setIsloading(true);
    try {
      formData.append("limit", "10");
      formData.append("hal", "0");
      const postsdata = await apiRead(formData, "main", "latestnew");
      if (postsdata && postsdata.length > 0) {
        setLatestPostData(postsdata);
      } else {
        setLatestPostData([]);
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchLocalCats();
  }, []);

  useEffect(() => {
    fetchLatestPosts();
    fetchTrendingPosts();
  }, [location]);

  return <FetchContext.Provider value={{ categoryData, localCatData, trendingPostData, latestPostData }}>{children}</FetchContext.Provider>;
};

export const useFetch = () => useContext(FetchContext);
