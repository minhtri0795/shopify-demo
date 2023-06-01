import { useEffect, useState } from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import useSWRInfinite from "swr/infinite";
import { ScaleLoader } from "react-spinners";
import qs from "qs";
import flatten from "lodash/flatten";
import { useRouter } from "next/router";
import { getArticleCategories, getArticles, getNewsArchive } from "../../api";
import {
  ComposeWithMeta,
  ListArticle,
  NewsArchive,
  StrapiEntry,
} from "../../api/types";
import ArchiveLayout from "../../components/ArchiveLayout";
import ArticleCard from "../../components/ArticleCard";
import ArticleSlider from "../../components/ArticleSlide";
import Spacing from "../../components/Spacing";
import FilterDropdown from "../../components/FilterDropdown";

import "swiper/css";
import "swiper/css/navigation";
import Seo from "../../components/Seo";
import useSWR from "swr";
import { getLocale } from "../../utils";

const getKey = (
  pageIndex: number,
  previousPageData: ComposeWithMeta<StrapiEntry<ListArticle>[]>,
  option?: {
    filters: {
      category?: string | false;
      exclude?: string[] | number[];
    };
    locale?: string;
  }
) => {
  if (previousPageData && previousPageData.data.length < 5) {
    return null;
  } // reached the end

  const query = qs.stringify(
    {
      populate: ["banner,category"],
      pagination: {
        page: pageIndex + 1,
        pageSize: 5,
      },
    },
    { encodeValuesOnly: true }
  );

  let filterQuery = "";
  if (option?.filters) {
    const filters = [];
    const { category, exclude } = option.filters;

    if (category) {
      filters.push({
        category: {
          slug: option.filters.category,
        },
      });
    }

    if (exclude) {
      filters.push({
        id: {
          $notIn: exclude,
        },
      });
    }

    filterQuery = qs.stringify(
      {
        filters,
        locale: getLocale(option.locale),
      },
      { encodeValuesOnly: true, arrayFormat: "repeat" }
    );
  }

  return `/api/articles?${query}&${filterQuery}`; // SWR key
};

function ArticleList({
  response,
  isValidating,
  size,
  setSize,
}: {
  response: ComposeWithMeta<StrapiEntry<ListArticle>[]>[];
  isValidating: boolean;
  size: number;
  setSize: (size: number) => void;
}) {
  const totalCount = response[0].meta.pagination.total;
  const articles = flatten(response.map((data) => data.data));
  const totalPage = response[0].meta.pagination.pageCount;
  const hasNextPage = size !== totalPage;
  const restArticles = articles;

  const router = useRouter();
  const locale = router.locale;

  return (
    <>
      <div className="container m-auto">
        <Spacing className="h-[60px]" />
        {restArticles && (
          <div className="flex flex-col gap-10">
            {restArticles.map((article) => {
              return <ArticleCard key={article.id} {...article.attributes} />;
            })}
          </div>
        )}
      </div>
      <Spacing className="h-[100px]" />
      <div className="text-center">
        {isValidating && <ScaleLoader color="#78A0AA" />}
        {!isValidating && hasNextPage && (
          <button
            onClick={() => setSize(size + 1)}
            className="border border-secondary text-body text-secondary py-[6px] min-w-[140px] hover:bg-secondary-light-hover active:bg-secondary-light-active transition-colors"
          >
            {locale === 'en' ? "Show more" : "顯示更多文章"}
          </button>
        )}
      </div>
    </>
  );
}

export default function ArticlePage({
  title,
  description,
  banner,
  subtitle,
  seo,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const locale = router.locale as string;

  const { data: categories } = useSWR("/api/article-categories", () =>
    getArticleCategories({ locale })
  );

  const categoryOptions = categories?.map((category) => ({
    label: category.attributes.label,
    value: category.attributes.slug,
  }));

  const [category, setCategory] = useState<string | false>(() => {
    const category = router.query.category;

    if (category) {
      return category as string;
    }

    return false;
  });

  useEffect(() => {
    const category = (router.query.category || false) as string | false;

    setCategory(category);
  }, [router.query.category]);

  const { data: topFiveArticles } = useSWR(
    "/api/articles?first-five" + locale,
    async () => {
      const response = await getArticles(
        `/api/articles?populate=*&pagination[page]=1&pagination[pageSize]=5&filters[popular]=true&locale=${getLocale(
          locale
        )}`
      );

      return response.data;
    }
  );

  const {
    data: response,
    size,
    setSize,
    isValidating,
  } = useSWRInfinite(
    (index, prev) =>
      topFiveArticles
        ? getKey(index, prev, {
          filters: {
            category,
            exclude: topFiveArticles.map((article) => article.id),
          },
          locale,
        })
        : null,
    (query) => getArticles(query),
    {
      initialSize: 1,
    }
  );

  const onCategoryChangeHandler = (value: string) => {
    setSize(1);
    router.query.category = value;

    if (!value) {
      delete router.query.category;
    }

    router.push(router, router, { shallow: true });
  };

  let totalCount;
  let articles;
  let totalPage;
  let hasNextPage;
  let restArticles;

  if (response) {
    let totalCount = response[0].meta.pagination.total;
    let articles = flatten(response.map((data) => data.data));
    let totalPage = response[0].meta.pagination.pageCount;
    let hasNextPage = size !== totalPage;
    let restArticles = articles;
  }

  return (
    <>
      {seo && <Seo {...seo} />}
      <ArchiveLayout
        title={title}
        description={description}
        banner={banner}
        subtitle={subtitle}
      >
        {topFiveArticles && <ArticleSlider articles={topFiveArticles} />}
        <>
          <Spacing className="h-[100px]" />
          <div className="container m-auto flex flex-col gap-5">
            <div className="flex justify-between">
              <FilterDropdown
                value={category}
                placeholder={locale === 'en' ? "All Articles" : "全部文章"}
                onChange={(value) => onCategoryChangeHandler(value)}
                list={
                  [
                    { label: locale === 'en' ? "All Articles" : "全部文章", value: false },
                    ...(categoryOptions || []),
                  ] || []
                }
              />
              <div>
                <span>
                  {locale === 'en' ? "Total" : "共"} {response ? response[0].meta.pagination.total : null} {locale === 'en' ? "page(s)" : "篇"}
                </span>
              </div>
            </div>
          </div>
          {response ? (
            <ArticleList
              response={response}
              isValidating={isValidating}
              size={size}
              setSize={setSize}
            />
          ) : (
            <div className="w-full container m-auto h-[300px] flex items-center justify-center">
              <ScaleLoader color="#78A0AA" />
            </div>
          )}
        </>
      </ArchiveLayout>
    </>
  );
}

export const getServerSideProps: GetStaticProps<NewsArchive> = async (ctx) => {
  const locale = ctx.locale;
  const data = await getNewsArchive({ locale });

  return {
    props: {
      ...data,
    },
  };
};
