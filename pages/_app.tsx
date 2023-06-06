import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import Layout from "../components/Layout";
import ShopProvider from "../context/shopContext";
import Cart from "../components/Cart";
import "swiper/css";
import "swiper/css/pagination";
import CookieConsent from "react-cookie-consent";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ShopProvider>
      <Layout>
        <Cart/>
        <Component {...pageProps} />
      </Layout>
    </ShopProvider>
  );
}

export default MyApp;
