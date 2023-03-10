import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import TourCards from "../components/TourCards";

export default function Home({ tours }) {

  const router = useRouter();

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [router.pathname]);
  return (
    <>
      <Head>
        <title>Tour App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSection />
      <TourCards tours={tours} />
    </>
  );
}

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`https://tours-api.onrender.com/api/v1/tours`);
  const data = await res.json();
  // Pass data to the page via props
  return { props: { tours: data.data } };
}
