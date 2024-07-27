import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoading } from "../../components/contents/loader";
import { useApi } from "./api";

const FetchContext = createContext();

export const FetchProvider = ({ children }) => {
  const location = useLocation();
  const formData = new FormData();
  const { apiGet, apiRead } = useApi();
  const { setLoading } = useLoading();
  const [categoryData, setCategoryData] = useState([]);
  const [localCatData, setLocalCatData] = useState([]);
  const [trendingPostData, setTrendingPostData] = useState([]);
  const [latestPostData, setLatestPostData] = useState([]);
  const [popularPostData, setPopularPostData] = useState([]);

  const fetchCategories = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const fetchLocalCats = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const fetchTrendingPosts = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const fetchLatestPosts = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const fetchPopularPosts = async () => {
    setLoading(true);
    try {
      formData.append("limit", "10");
      formData.append("hal", "0");
      const postsdata = await apiRead(formData, "main", "popularnew");
      if (postsdata && postsdata.length > 0) {
        setPopularPostData(postsdata);
      } else {
        setPopularPostData([]);
      }
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchLocalCats();
  }, []);

  useEffect(() => {
    fetchLatestPosts();
    fetchTrendingPosts();
    fetchPopularPosts();
  }, [location]);

  return <FetchContext.Provider value={{ categoryData, localCatData, trendingPostData, latestPostData, popularPostData }}>{children}</FetchContext.Provider>;
};

export const useFetch = () => useContext(FetchContext);
