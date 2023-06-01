import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useWindowScroll } from "react-use";
import useSWRImmutable from "swr/immutable";
import HeaderLogo from "../../public/header_logo.svg";
import HeaderMenu from "./HeaderMenu";
import { HeaderResponse } from "../../api/types";
import Link from "next/link";
import MobileHeader from "../MobileHeader";
import { getHeader } from "../../api";
import { useRouter } from "next/router";

type HeaderProps = {
  data: HeaderResponse;
  onMount: () => void;
};

export default function Header({ onMount }: Omit<HeaderProps, "data">) {
  const router = useRouter();
  const locale = router.locale;

  const { data } = useSWRImmutable("/api/header", () => getHeader({ locale }));

  if (data) {
    return <HeaderInner data={data} onMount={onMount} />;
  }

  return null;
}

export function HeaderInner({ data, onMount }: HeaderProps) {
  const { menu } = data;
  const { y } = useWindowScroll();
  const [mobileNotificationHeight, setMobileNotificationHeight] = useState(0);

  const logoBarRef = useRef<HTMLDivElement>(null);
  const mobileNotificationRef = useRef<HTMLSpanElement>(null);

  const atTop = y < 10;

  // const mobileNotificationHeight =
  //   mobileNotificationRef.current?.getBoundingClientRect().height;

  useEffect(() => {
    onMount();
  }, [onMount]);

  useEffect(() => {
    const observer = new ResizeObserver((node) => {
      const height = node[0].target.getBoundingClientRect().height;
      setMobileNotificationHeight(height);
    });

    const ref = mobileNotificationRef.current;

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, []);

  return (
    <>
      <div
        id="header-desktop"
        className="hidden lg:block w-screen fixed top-0 z-20"
      >
        <div
          ref={logoBarRef}
          className={`transition-all duration-500 ${
            atTop
              ? `${
                  data.enableHeaderNotification ? "h-[140px]" : ""
                } opacity-100`
              : "h-0 overflow-hidden opacity-0"
          }`}
        >
          {data.enableHeaderNotification && (
            <div className="bg-primary h-10 flex justify-center items-center text-white">
              <span
                className="text-white text-body"
                dangerouslySetInnerHTML={{
                  __html: data.headerNotificationText,
                }}
              />
            </div>
          )}
          <div className="bg-white w-screen flex justify-center h-[109px] items-center">
            <Link href="/">
              <a>
                <Image src={HeaderLogo} alt="Header logo" />
              </a>
            </Link>
          </div>
        </div>
        <HeaderMenu menu={menu} atTop={atTop} />
      </div>
      <div
        id="header-mobile"
        className="block lg:hidden fixed top-0 z-20 w-screen"
      >
        {data.enableHeaderNotification && (
          <div
            style={{
              height: atTop ? mobileNotificationHeight : 0,
              opacity: atTop ? 1 : 0,
            }}
            className={`bg-primary px-5 opacity-100 transition-all duration-500 flex justify-center items-center text-white`}
          >
            <span
              ref={mobileNotificationRef}
              className="text-white text-body"
              dangerouslySetInnerHTML={{
                __html: data.headerNotificationText,
              }}
            />
          </div>
        )}
        <MobileHeader menu={menu} />
      </div>
    </>
  );
}
