import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import { format } from "date-fns";
import useSWR from "swr";
import {
  getArticleBySlug,
  getArticlePath,
  getRelatedArticles,
} from "../../api";
import {
  DetailArticle,
  ListArticleWithoutPopulation,
  StrapiEntry,
  WithDateInfo,
} from "../../api/types";
import { appendBaseUrl } from "../../utils";
import Spacing from "../../components/Spacing";
import SectionTitle from "../../components/SectionTitle";
import ArticleCard from "../../components/ArticleCard";
import Seo from "../../components/Seo";
import dynamic from "next/dynamic";

import "glightbox/dist/css/glightbox.css";
import SocialMediaList from "../../components/SocialMediaList";

const ActivateLightBox = dynamic(
  () => import("../../components/ActivateLightBox"),
  {
    ssr: false,
  }
);

export default function ArticlePage(
  props: InferGetStaticPropsType<typeof getServerSideProps>
) {
  const { rec, slug } = props;
  const contentRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const locale = router.locale;

  const relatedId = rec.length !== 0 ? rec.map((rec) => rec.rec.data?.id) : [];

  const { data: relatedArticles } = useSWR(`relatedArticles-${slug}`, () =>
    getRelatedArticles([...relatedId], { locale })
  );

  const basePath = `${process.env.NEXT_PUBLIC_URL}${
    locale === "zh" ? "/zh" : ""
  }/articles`;

  return (
    <>
      <Seo {...props.seo} />
      <ActivateLightBox contentRef={contentRef} />
      <div className="mt-[60px]">
        <div className="border-b border-[#E0E0E0] pb-[26px]">
          <div className="lg:mx-[100px] lg:flex gap-[100px] lg:h-[500px]">
            <div className="relative w-full lg:w-[53%] h-[300px] lg:h-full">
              {props.banner?.data && (
                <Image
                  src={appendBaseUrl(props.banner.data.attributes.url)}
                  alt={props.banner.data.attributes.alternativeText}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
              )}
            </div>
            <div className="px-[2rem] lg:px-0 max-w-[480px] py-[43.5px] flex flex-col justify-between m-auto flex-1">
              <div className="text-center">
                <span className="text-body text-secondary">
                  {props.category?.data?.attributes.label}
                </span>
                <h1 className="text-h2 font-serif mt-5 mb-[60px]">
                  {props.title}
                </h1>
                <p className="text-body">{props.description}</p>
              </div>

              <div className="items-center flex flex-col">
                <span className="text-subtitle">By {props.arthor}</span>
                <time className="text-secondary text-body">
                  {format(new Date(props.createdAt), "yyyy/MM/dd")}
                </time>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="sticky top-[100px] mt-[40px] hidden md:block ml-[40px]">
            <SocialMediaList
              fill="black"
              vertical
              facebookLink={`https://www.facebook.com/sharer.php?u=${basePath}/${props.slug}`}
              copyLink={`${basePath}/${props.slug}`}
              messengerLink={`fb-messenger://share?link=${basePath}/${props.slug}`}
            />
          </div>
          <div className="block md:hidden px-[2rem] mt-[2rem]">
            <SocialMediaList
              fill="black"
              facebookLink={`https://www.facebook.com/sharer.php?u=${basePath}/${props.slug}`}
              copyLink={`${basePath}/${props.slug}`}
              messengerLink={`fb-messenger://share?link=${basePath}/${props.slug}`}
            />
          </div>
          <article
            className="px-[2rem] md:px-0 w-full mt-10 max-w-[640px] m-auto editor-content block md:mt-[-110px]"
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: props.content || "" }}
          ></article>
        </div>

        <Spacing className="h-[136px]" />

        {relatedArticles && relatedArticles.length !== 0 && (
          <div>
            <SectionTitle title="推薦文章" subtitle="閱讀更多" />

            <div className="grid grid-cols-12 mt-10">
              {relatedArticles.map((article) => (
                <div
                  className="my-5 md:my-0 col-span-12 md:col-span-4"
                  key={article.id}
                >
                  <ArticleCard layoutType="vertical" {...article.attributes} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// export const getStaticPaths: GetStaticPaths = async (ctx) => {
//   const locales = ctx.locales as string[];
//   const data: StrapiEntry<ListArticleWithoutPopulation>[] = [];
//   // const data = await getArticlePath();
//   const fetchers = locales.map(async (locale) => {
//     const entries = await getArticlePath({ locale });
//     entries.forEach((entry) => {
//       data.push(entry);
//     });
//   });

//   await Promise.all(fetchers);

//   const paths = data.map((entry) => ({
//     params: {
//       slug: entry.attributes.slug,
//     },
//     locale:
//       entry.attributes.locale === "zh-Hant" ? "zh" : entry.attributes.locale,
//   }));

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

export const getServerSideProps: GetStaticProps<
  WithDateInfo<DetailArticle>,
  { slug: string }
> = async ({ params, locale }) => {
  const { slug } = params!;
  const data = await getArticleBySlug(slug, { locale });

  if (data.length === 0) {
    return {
      notFound: true,
    };
  }

  const detailProduct = data[0].attributes;

  return {
    props: {
      ...detailProduct,
    },
  };
};
