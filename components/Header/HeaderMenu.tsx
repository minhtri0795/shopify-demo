import React, { useContext,useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Typography from "../Typography";
import { styled, keyframes } from "@stitches/react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import HeaderLogo from "../../public/header_logo.svg";
import { HeaderResponse } from "../../api/types";
import Arrow from "../Icons/Arrow";
import { ShopContext } from "../../context/shopContext";
const enterFromLeft = keyframes({
  from: { transform: "translateY(-40px)", opacity: 0 },
  to: { transform: "translateY(0)", opacity: 1 },
});

const enterFromRight = keyframes({
  from: { transform: "translateY(40px)", opacity: 0 },
  to: { transform: "translateY(0)", opacity: 1 },
});

const exitToLeft = keyframes({
  from: { transform: "translateY(0)", opacity: 1 },
  to: { transform: "translateY(-40px)", opacity: 0 },
});

const exitToRight = keyframes({
  from: { transform: "translateY(0)", opacity: 1 },
  to: { transform: "translateY(40px)", opacity: 0 },
});

const StyledContent = styled(NavigationMenu.Content, {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,

  display: "flex",
  justifyContent: "center",

  paddingTop: "40px",
  paddingBottom: "100px",

  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "250ms",
    animationTimingFunction: "ease",
    '&[data-motion="from-start"]': { animationName: enterFromLeft },
    '&[data-motion="from-end"]': { animationName: enterFromRight },
    '&[data-motion="to-start"]': {
      animationName: exitToLeft,
      opacity: 0,
      pointerEvent: "none",
    },
    '&[data-motion="to-end"]': {
      animationName: exitToRight,
      opacity: 0,
      pointerEvent: "none",
    },
  },
});

const scaleIn = keyframes({
  from: { opacity: 0, transform: "translateY(-10px)" },
  to: { opacity: 1 },
});

const scaleOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0, transform: "translateY(-10px)" },
});

const StyledViewport = styled(NavigationMenu.Viewport, {
  position: "relative",
  height: "var(--radix-navigation-menu-viewport-height)",
  backgroundColor: "white",
  transition: "transform, height 0.2s ease",

  "@media (prefers-reduced-motion: no-preference)": {
    '&[data-state="open"]': {
      animation: `${scaleIn} 200ms ease`,
    },
    '&[data-state="closed"]': {
      animation: `${scaleOut} 200ms ease`,
      opacity: 0,
    },
  },
});

const StyledViewportContainer = styled("div", {
  position: "absolute",
  zIndex: 10,
  bottom: "var(--radix-navigation-menu-viewport-height)",
  left: 0,
  right: 0,
});

type HeaderMenuProps = {
  menu: HeaderResponse["menu"];
  atTop: boolean;
};

const HeaderMenu = ({ menu, atTop }: HeaderMenuProps) => {
  const { openCart, checkout } = useContext(ShopContext);
  // let sum = checkout?.lineItems ? checkout?.lineItems: 0

  let sum = useCallback(checkout?.lineItems?.reduce(function (
    previousValue: any,
    currentValue: any,
  ) {
    console.table([["previousValue",previousValue.quantity],["currentValue",currentValue.quantity]])
    return {quantity: previousValue.quantity + currentValue.quantity};
  },{quantity:0}),[checkout]);
  return (
    <NavigationMenu.Root className="relative z-20 w-full">
      <div className="flex justify-between items-center h-16 border-t border-[#E4E3E3] bg-white">
        <div className="ml-[100px]">
          <Link href="/">
            <a
              className={`transition-all duration-500 ${
                atTop ? "opacity-0" : "opacity-100"
              }`}
            >
              <Image src={HeaderLogo} alt="Header logo" width={50} />
            </a>
          </Link>
        </div>
        <NavigationMenu.List className="flex justify-center items-center gap-12">
          <NavigationMenu.Item>
            <NavigationMenu.Link className="hover:text-secondary transition-colors">
              <Link href={"/about"}>
                <a>About</a>
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link className="hover:text-secondary transition-colors">
              <Link href={"/category"}>
                <a>All products</a>
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link className="hover:text-secondary transition-colors">
              <Link href={"/articles"}>
                <a>Articles</a>
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link className="hover:text-secondary transition-colors">
              <Link href={"/contact"}>
                <a>Contact us</a>
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
        <div onClick={() => openCart()}>
          <div className="mr-20 hidden md:flex gap-3 items-center cursor-pointer relative">
            <Image
              src={"/shopping-cart.png"}
              alt="global icon"
              width={30}
              height={30}
            />
            <span className=" absolute top-[-40%] right-[-40%] bg-[#ff013f] text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-full">
              {sum?.quantity}
            </span>
          </div>
        </div>
      </div>

      <StyledViewportContainer>
        <StyledViewport />
      </StyledViewportContainer>
    </NavigationMenu.Root>
  );
};

export default HeaderMenu;
