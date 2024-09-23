import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useDevmode } from "@ibrahimstudio/react";
import useLocStorage from "./storage";
import { LoadingScreen } from "../../components/feedback/loader";

const AuthContext = createContext();
const apiURL = process.env.REACT_APP_API_URL;

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const { log } = useDevmode();
  const { setL, getL, rmvL } = useLocStorage();
  const [isLoggedin, setIsLoggedin] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (reqdata) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify({ name: reqdata.name, phone: reqdata.phone, email: reqdata.email, password: reqdata.password }));
      const url = `${apiURL}/main/signup`;
      const response = await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
      const signupresponse = response.data;
      if (!signupresponse.error) {
        log("successfully signed up:", signupresponse);
      } else if (!signupresponse.status) {
        log("invalid username or password!");
        return;
      } else {
        log("please check your internet connection and try again.");
        return;
      }
    } catch (error) {
      console.error("error occurred during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (reqdata) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ username: reqdata.username, password: reqdata.password }));
    try {
      const url = `${apiURL}/authapi/login`;
      const response = await axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
      const loginresponse = response.data;
      if (loginresponse.status) {
        const userdata = loginresponse.data[0];
        setL("user_data", userdata);
        setL("logged_in", "true");
        setIsLoggedin(true);
        alert(`Kamu berhasil login. Selamat datang kembali, ${userdata.name}!`);
        log("login credential:", userdata);
        console.log("successfully logged in.");
      } else {
        if (loginresponse.message === "Username/Password Wrong") {
          setIsLoggedin(false);
          alert("Username atau Password yang kamu masukkan salah.");
          log("login response:", loginresponse);
          console.log("invalid username or password!");
        } else {
          setIsLoggedin(false);
          alert("Ada kesalahan saat login. Periksa koneksi internet dan coba lagi.");
          log("login response:", loginresponse);
          console.log("please check your internet connection and try again.");
        }
      }
    } catch (error) {
      setIsLoggedin(false);
      alert("Permintaan tidak dapat di proses. Mohon coba sesaat lagi.");
      console.error("error occurred during login:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      rmvL("user_data");
      rmvL("logged_in");
      setIsLoggedin(false);
      alert("Kamu berhasil logout. Mohon login ulang untuk mengakses Dashboard.");
      log("successfully logged out");
      console.log("successfully logged out");
    } catch (error) {
      alert("Permintaan tidak dapat di proses. Mohon coba sesaat lagi.");
      console.error("error occurred during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      const loggedin = getL("logged_in");
      const userdata = getL("user_data");
      if (loggedin === "true" && userdata) {
        setIsLoggedin(true);
        log("user logged in and ip-address matched");
      } else {
        setIsLoggedin(false);
        log("user is not logged in");
      }
    } catch (error) {
      console.error("error occurred during authentication check:", error);
    } finally {
      setLoading(false);
    }
  };

  const userData = getL("user_data");

  useEffect(() => {
    checkAuth();
  }, [location]);

  if (isLoggedin === null || loading) {
    return <LoadingScreen />;
  }

  return <AuthContext.Provider value={{ loading, isLoggedin, signup, login, logout, userData }}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
