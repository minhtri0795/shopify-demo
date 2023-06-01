import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import Layout from "../components/Layout";

import "swiper/css";
import "swiper/css/pagination";
import CookieConsent from "react-cookie-consent";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
