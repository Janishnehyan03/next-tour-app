import { useContext, useEffect } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Layout from "../components/Layout";
import { UserAuthContext, UserAuthProvider } from "../context/userContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {

  return (
    <ErrorBoundary>
      <UserAuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserAuthProvider>
    </ErrorBoundary>
  );
}
