import Link from "next/link";
import Image from "next/image";
import Typography from "../Typography";
import { styled, keyframes } from "@stitches/react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import HeaderLogo from "../../public/header_logo.svg";
import { HeaderResponse } from "../../api/types";
import Arrow from "../Icons/Arrow";
import LangSwitcher from "../LangSwitcher";

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

const HeaderMenu = ({ menu, atTop }: HeaderMenuProps) => (
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
        {menu.map((item) => (
          <NavigationMenu.Item key={item.id}>
            {!item.subMenu ||
              (item.subMenu.length === 0 && (
                <NavigationMenu.Link className="hover:text-secondary transition-colors">
                  <Link href={item.link || ""}>
                    <a>{item.label}</a>
                  </Link>
                </NavigationMenu.Link>
              ))}
            {item.subMenu && item.subMenu.length !== 0 && (
              <>
                <NavigationMenu.Trigger className="hover:text-secondary hover:fill-secondary transition-colors flex items-center gap-1">
                  {item.label}
                  <Arrow />
                </NavigationMenu.Trigger>
                <StyledContent>
                  <div className="flex gap-20">
                    {item.subMenu.map((subMenu) => (
                      <div key={subMenu.id}>
                        <Typography
                          variant="body"
                          tag="span"
                          className="font-bold"
                        >
                          {subMenu.title}
                        </Typography>
                        <ul>
                          {subMenu.list.map((item) => (
                            <li key={item.id}>
                              <Typography variant="body" tag="span">
                                <Link href={item.link || ""}>
                                  <a className="hover:text-secondary transition-colors">
                                    {item.label}
                                  </a>
                                </Link>
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </StyledContent>
              </>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
      <LangSwitcher />
    </div>

    <StyledViewportContainer>
      <StyledViewport />
    </StyledViewportContainer>
  </NavigationMenu.Root>
);

export default HeaderMenu;
