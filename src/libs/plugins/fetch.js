import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoading } from "../../components/contents/loader";
import { useApi } from "./api";

const FetchContext = createContext();

export const FetchProvider = ({ children }) => {
  const location = useLocation();
  const { apiGet, apiRead } = useApi();
  const { setLoading } = useLoading();
  const [categoryData, setCategoryData] = useState([]);
  const [localCatData, setLocalCatData] = useState([]);
  const [trendingPostData, setTrendingPostData] = useState([]);
  const [latestPostData, setLatestPostData] = useState([]);
  const [popularPostData, setPopularPostData] = useState([]);
  const [relatedPostData, setRelatedPostData] = useState([]);
  const [trendingTagData, setTrendingTagData] = useState([]);

  const fetchAdditionalData = async () => {
    const formData = new FormData();
    formData.append("limit", "10");
    formData.append("hal", "0");
    setLoading(true);
    try {
      const catdata = await apiGet("main", "categorynew");
      setCategoryData(catdata && catdata.length > 0 ? catdata : []);
      const catlocaldata = await apiGet("main", "categoryarea");
      setLocalCatData(catlocaldata && catlocaldata.length > 0 ? catlocaldata : []);
      const trendingdata = await apiRead(formData, "main", "trendingnew");
      setTrendingPostData(trendingdata && trendingdata.data && trendingdata.data.length > 0 ? trendingdata.data : []);
      const latestdata = await apiRead(formData, "main", "latestnew");
      setLatestPostData(latestdata && latestdata.data && latestdata.data.length > 0 ? latestdata.data : []);
      const populardata = await apiRead(formData, "main", "popularnew");
      setPopularPostData(populardata && populardata.data && populardata.data.length > 0 ? populardata.data : []);
      const relateddata = await apiRead(formData, "main", "relatednew");
      setRelatedPostData(relateddata && relateddata.data && relateddata.data.length > 0 ? relateddata.data : []);
      const trendingtagdata = await apiGet("main", "viewtag");
      setTrendingTagData(trendingtagdata && trendingtagdata.length > 0 ? trendingtagdata : []);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdditionalData();
  }, [location.pathname]);

  return <FetchContext.Provider value={{ categoryData, localCatData, trendingPostData, latestPostData, popularPostData, relatedPostData, trendingTagData }}>{children}</FetchContext.Provider>;
};

export const useFetch = () => useContext(FetchContext);
