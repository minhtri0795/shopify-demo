import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import Layout from "../components/Layout";
import ShopProvider from "../context/shopContext";
import Cart from "../components/Cart";
import "swiper/css";
import "swiper/css/pagination";
import CookieConsent from "react-cookie-consent";
import Head from "next/head";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ShopProvider>
      <Head>
        <meta name="robots" content="noindex,nofollow"/>
      </Head>
      <Layout>
        <Cart/>
        <Component {...pageProps} />
      </Layout>
    </ShopProvider>
  );
}

export default MyApp;
