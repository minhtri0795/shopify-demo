import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Facebook,
  Instagram,
  Line,
  Twitter,
  Copy,
  Messenger,
} from "../Icons/SocialMedias";

type SocialMediaListProps = {
  fill?: "black" | "secondary";
  vertical?: boolean;
  followText?: string;
  facebookLink?: string;
  instagramLink?: string;
  twitterLink?: string;
  lineLink?: string;
  messengerLink?: string;
  copyLink?: string;
};

const secondaryLinkClass =
  "cursor-pointer fill-secondary hover:fill-secondary-hover active:fill-secondary-active transition-all";

const blackLinkClass =
  "cursor-pointer fill-black hover:fill-black-hover active:fill-black-active transition-all";

export default function SocialMediaList({
  fill = "secondary",
  followText,
  facebookLink,
  instagramLink,
  twitterLink,
  lineLink,
  copyLink,
  messengerLink,
  vertical,
}: SocialMediaListProps) {
  const linkClass = fill === "secondary" ? secondaryLinkClass : blackLinkClass;
  const router = useRouter();

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (copied) {
      timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);

  const onMessagerClick = () => {
    if (isMobile()) {
      window.location.href = "fb-messenger://share/?link=" + copyLink;
    } else {
      window.FB.ui({
        method: "send",
        link: copyLink,
        redirect_uri: copyLink,
      });
    }
  };

  function isMobile() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];
    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-0">
      {followText && (
        <span className="block w-full md:w-[unset] mr-[31px]">
          {followText}
        </span>
      )}
      <ul className={`flex gap-[18px] ${vertical ? "flex-col" : ""} `}>
        {facebookLink && (
          <li>
            <Link href={facebookLink}>
              <a target="_blank" className={linkClass}>
                <Facebook />
              </a>
            </Link>
          </li>
        )}
        {instagramLink && (
          <li>
            <Link href={instagramLink}>
              <a target="_blank" className={linkClass}>
                <Instagram />
              </a>
            </Link>
          </li>
        )}
        {twitterLink && (
          <li>
            <Link href={twitterLink}>
              <a target="_blank" className={linkClass}>
                <Twitter />
              </a>
            </Link>
          </li>
        )}
        {lineLink && (
          <li>
            <Link href={lineLink}>
              <a target="_blank" className={linkClass}>
                <Line />
              </a>
            </Link>
          </li>
        )}
        {messengerLink && (
          <li>
            <a onClick={onMessagerClick} href={messengerLink}>
              <Messenger />
            </a>
          </li>
        )}
        {copyLink && (
          <li>
            <CopyToClipboard text={copyLink} onCopy={() => setCopied(true)}>
              <a
                className={`${linkClass} flex gap-2 text-sm items-center text-gray-500`}
              >
                <Copy />
                {copied && <span>Copied</span>}
              </a>
            </CopyToClipboard>
          </li>
        )}
      </ul>
    </div>
  );
}
