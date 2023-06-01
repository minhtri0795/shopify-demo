import type { NextPage } from "next";
import { HomeResponse } from "../api/types";
import { GetStaticProps } from "next";
import { getHome } from "../api";
import HomeBanner from "../components/Home/HomeBanner";
import HomeIntroduction from "../components/Home/HomeIntroduction";
import Spacing from "../components/Spacing";
import HomeFeatures from "../components/Home/HomeFeatures";
import HomeProductCategory from "../components/Home/HomeProductCategory";
import HomeProducts from "../components/Home/HomeProducts";
import HomeArticles from "../components/Home/HomeArticles";
import Seo from "../components/Seo";
import DecorateLine from "../components/DecorateLine";

declare module "glightbox" {}

declare global {
  interface Window {
    FB: any;
  }
}

type HomeProps = HomeResponse;

const Home: NextPage<HomeProps> = ({
  banner,
  introduction,
  features,
  productCategory,
  homeProduct,
  homeArticles,
  seo,
}) => {
  return (
    <>
      {seo && <Seo {...seo} />}
      <div className="relative">
        <HomeBanner {...banner} />
        <DecorateLine
          type={1}
          className="absolute z-10 -bottom-20 right-[150px]"
        />
      </div>
      <Spacing className="h-20" />
      <HomeIntroduction {...introduction} />
      <Spacing className="h-20" />
      <HomeFeatures {...features} />
      <Spacing className="h-[120px]" />
      <HomeProductCategory {...productCategory} />
      <DecorateLine type={3} className="absolute right-0" />
      <Spacing className="h-[86px]" />
      <div className="relative">
        <HomeProducts {...homeProduct} />
        <DecorateLine type={4} className="absolute left-0 top-[50%]" />
      </div>
      <Spacing className="h-[80px]" />
      <HomeArticles {...homeArticles} />
    </>
  );
};

export const getServerSideProps: GetStaticProps = async (ctx) => {
  const locale = ctx.locale;
  const data = await getHome({ locale });

  return {
    props: { ...data },
  };
};

export default Home;
