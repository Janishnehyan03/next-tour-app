import React, { useContext, useEffect } from "react";
import { UserAuthContext } from "../context/userContext";
import Navbar from "./Navbar";

function Layout({ children }) {
  const { checkUserLogin } = useContext(UserAuthContext);
  
  useEffect(() => {
    checkUserLogin()
  }, []);
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
