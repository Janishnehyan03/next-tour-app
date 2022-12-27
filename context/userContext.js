import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import Axios from "../Axios";

export const UserAuthContext = createContext({});

export const UserAuthProvider = (props) => {
  const [authData, setAuthData] = useState(null);
  const router = useRouter();

  const checkUserLogin = async () => {
    try {
      const res = await Axios.post(
        "/users/checkLogin",
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.status === 200) {
        setAuthData(res.data.user);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const logout = async () => {
    try {
      const res = await Axios.post("/users/logout");
      if (res.data.success) {
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
