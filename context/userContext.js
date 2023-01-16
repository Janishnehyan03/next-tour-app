import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import Axios from "../pages/Axios";

export const UserAuthContext = createContext({});

export const UserAuthProvider = (props) => {
  const [authData, setAuthData] = useState(null);
  const router = useRouter();

  const checkUserLogin = async () => {
    try {
      const res = await Axios.post("/users/checkLogin");
      if (res.status === 200) {
        setAuthData(res.data.user);
      }
    } catch (error) {
      console.log(error.response);
      if (
        error.response.data.err.message === "invalid token" ||
        error.response.data.err.name === "JsonWebTokenError"
      ) {
        logout();
      }
    }
  };
  const logout = async () => {
    try {
      const res = await Axios.get("/users/logout");
      if (res.data.success) {
        localStorage.setItem("loggedIn", false);
        setAuthData(null);
        window.location.href = "/users/login";
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const value = {
    checkUserLogin,
    authData,
    setAuthData,
    logout,
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.pathname]);
  return (
    <UserAuthContext.Provider value={value}>
      {props.children}
    </UserAuthContext.Provider>
  );
};
