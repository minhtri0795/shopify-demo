import Image from "next/image";
import useSWRImmutable from "swr/immutable";
import Mailchimp from "../Mailchimp";
import SectionTitle from "../SectionTitle";
import Logo from "../../public/header_logo.svg";
import { Footer as FooterData } from "../../api/types";
import FooterMenu from "./FooterMenu";
import Link from "next/link";
import SocialMediaList from "../SocialMediaList";
import { useRouter } from "next/router";
import { getFooter } from "../../api";

type FooterProps = {
  data: FooterData;
};

export default function Footer() {
  const router = useRouter();
  const locale = router.locale;

  const { data } = useSWRImmutable("/api/footer", () => getFooter({ locale }));

  if (!data) {
    return null;
  }

  const {
    logoSubtitle,
    mailchimpSectionTitle,
    footerMenu,
    copyrightLabel,
    copyrightLink,
    copyrightText,
    followText,
    facebookLink,
    lineLink,
    twitterLink,
    instagramLink,
  } = data;

  const socialProps = {
    followText,
    facebookLink,
    lineLink,
    twitterLink,
    instagramLink,
  };

  return (
    <footer className="bg-white w-full mt-20">
      <div className="text-center">
        <SectionTitle {...mailchimpSectionTitle} />
        <div className="mt-6 flex justify-center">
          <Mailchimp />
        </div>
      </div>
      <div className="flex flex-col items-center mt-[74px]">
        <Image src={Logo} alt="footer logo" />
        <span className="text-subtitle mt-[10px]">{logoSubtitle}</span>
      </div>
      <div className="flex justify-center pt-10 pb-10 border-b border-dark-grey">
        <FooterMenu menu={footerMenu} />
      </div>
      <div className="flex flex-col-reverse gap-5 md:flex-row md:justify-between mx-[2rem] md:mx-[100px] mt-[27px] mb-[44px]">
        <div>
          <span className="text-caption block md:inline-block mr-[23px]">
            {copyrightText} {new Date().getFullYear()} All right reserved
          </span>
          <Link href={copyrightLink || ""}>
            <a target="_blank" className="text-body text-[#78A0AA] underline">
              {copyrightLabel}
            </a>
          </Link>
        </div>
        <div>
          <SocialMediaList {...socialProps} />
        </div>
      </div>
    </footer>
  );
}
