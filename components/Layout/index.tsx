import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import CookieConsent from "react-cookie-consent";
import { useRouter } from "next/router";
import { useMedia } from "react-use";
import { getFooter, getHeader } from "../../api";
import { Header } from "../Header";
import Footer from "../Footer";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const locale = router.locale;
  const [desktopOffset, setDesktopOffset] = useState(0);
  const [mobileOffset, setMobileOffset] = useState(0);
  const [isHeaderMount, setIsHeaderMount] = useState(false);

  const isTablet = useMedia("(max-width: 1024px)", false);

  const onMountCallback = useCallback(() => {
    setIsHeaderMount(true);
  }, []);

  useEffect(() => {
    if (isHeaderMount) {
      const observer = new ResizeObserver((node) => {
        const height = node[0].target.getBoundingClientRect().height;
        setDesktopOffset(height);
      });

      const header = document.querySelector("#header-desktop");
      if (header) {
        observer.observe(header);
      }

      return () => {
        if (header) {
          observer.unobserve(header);
        }
      };
    }
  }, [isHeaderMount]);

  useEffect(() => {
    if (isHeaderMount) {
      const observer = new ResizeObserver((node) => {
        const height = node[0].target.getBoundingClientRect().height;
        setMobileOffset(height);
      });

      const header = document.querySelector("#header-mobile");
      if (header) {
        observer.observe(header);
      }

      return () => {
        if (header) {
          observer.unobserve(header);
        }
      };
    }
  }, [isHeaderMount]);

  return (
    <>
      <Header onMount={onMountCallback} />
      <main
        style={{
          paddingTop: isTablet ? mobileOffset : desktopOffset,
        }}
      >
        {children}
      </main>
      <CookieConsent
        contentClasses="asd"
        style={{
          background: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "77px",
        }}
        contentStyle={{
          flex: "unset",
        }}
        ButtonComponent={(props: any) => (
          <button
            onClick={props.onClick}
            className="border border-primary px-[30px] py-[10px] text-primary mb-4 md:mb-0"
          >
            我接受
          </button>
        )}
      >
        <div>
          本網站使用cookies以提昇您的使用體驗及統計網路流量相關資料。繼續使用本網站表示您同意我們使用cookies。
        </div>
      </CookieConsent>
      <Footer />
    </>
  );
};

export default Layout;
