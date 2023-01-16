import { useContext, useEffect } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Layout from "../components/Layout";
import { UserAuthContext, UserAuthProvider } from "../context/userContext";
import "../styles/globals.css";
import NotLoggedIn from "./notLogged";

export default function App({ Component, pageProps }) {


  return (
    <ErrorBoundary>
      <UserAuthProvider>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </UserAuthProvider>
    </ErrorBoundary>
  );
}
