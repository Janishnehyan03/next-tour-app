import React, { useContext, useEffect, useState } from "react";
import { UserAuthContext } from "../context/userContext";
import NotLoggedIn from "../pages/notLogged";
import Navbar from "./Navbar";

function Layout({ children, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const { checkUserLogin, authData } = useContext(UserAuthContext);
  useEffect(() => {
    checkUserLogin();
  }, []);
  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      setLoggedIn(true);
    }
  }, []);
  if (!loggedIn && pageProps.protected) {
    return <NotLoggedIn />;
  } else {
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }
}

export default Layout;
