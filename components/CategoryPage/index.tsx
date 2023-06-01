import { useRouter } from "next/router";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { useEffect, useState } from "react";
import qs from "qs";
import { ScaleLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import {
  CategoryPageResponse,
  ComposeWithMeta,
  ListProduct,
  StrapiEntry,
} from "../../api/types";
import FilterDropdown from "../../components/FilterDropdown";
import ListProductCard from "../../components/ListProductCard";
import ArchiveLayout from "../../components/ArchiveLayout";
import { getProduct, getProductCategories } from "../../api";
import Logo from "../../components/Icons/Logo";
import Spacing from "../Spacing";
import { flatten } from "lodash";
import { getLocale } from "../../utils";

type CategoryPageProps = CategoryPageResponse & {
  teaCategory?: string;
};

const getKey = (
  pageIndex: number,
  previousPageData: ComposeWithMeta<StrapiEntry<ListProduct>[]>,
  option?: {
    filters: {
      teaCategory?: string | boolean;
      productCategory?: string | boolean;
      bakingMethod?: string | boolean;
      packingMethod?: string | boolean;
      showPopular?: boolean;
    };
    locale?: string;
  }
) => {
  if (previousPageData && previousPageData.data.length < 9) {
    return null;
  }

  const query = qs.stringify(
    {
      populate: [
        "tags,thumbnailImage",
        "tags.productTag",
        "packingMethod.packingImages",
        "defaultImages",
        "teaCategory",
        "productSpec",
      ],
      pagination: {
        page: pageIndex + 1,
        pageSize: 9,
      },
    },
    { encodeValuesOnly: true }
  );

  let filterQuery = "";
  if (option?.filters) {
    const filters = [];
    const {
      productCategory,
      bakingMethod,
      packingMethod,
      teaCategory,
      showPopular,
    } = option.filters;
    if (productCategory) {
      filters.push({
        productCategory: {
          slug: option.filters.productCategory,
        },
      });
    }

    if (bakingMethod) {
      filters.push({
        bakingMethod: option.filters.bakingMethod,
      });
    }

    if (packingMethod) {
      filters.push({
        packingMethod: {
          packingMethod: option.filters.packingMethod,
        },
      });
    }

    if (teaCategory) {
      filters.push({
        teaCategory: { slug: option.filters.teaCategory },
      });
    }

    if (showPopular) {
      filters.push({
        isPopular: true,
      });
    }

    filterQuery = qs.stringify(
      {
        filters,
        ...(showPopular && { sort: "popularOrder:desc" }),
      },
      { encodeValuesOnly: true, arrayFormat: "repeat" }
    );
  }

  return `${query}&${filterQuery}&locale=${getLocale(option?.locale)}`;
};

export default function CategoryPage({
  title,
  subtitle,
  banner,
  description,
  teaCategory,
}: CategoryPageProps) {
  const router = useRouter();
  const locale = router.locale;

  console.log(router);

  const { data: categories } = useSWR("/api/product-categories", () =>
    getProductCategories({ locale })
  );

  const [type, setType] = useState<string | boolean>(() => {
    const productCategory = router.query.productCategory;

    if (productCategory) {
      return productCategory as string;
    }

    return false;
  });

  useEffect(() => {
    const productCategory = (router.query.productCategory || false) as
      | string
      | false;

    setType(productCategory);
  }, [router.query.productCategory]);

  const [packing, setPacking] = useState<string | boolean>(() => {
    const packing = router.query.packing;

    if (packing) {
      return packing as string;
    }

    return false;
  });

  useEffect(() => {
    const packing = (router.query.packing || false) as string | false;

    setPacking(packing);
  }, [router.query.packing]);

  const [baking, setBaking] = useState<string | boolean>(false);
  const [showPopular, setShowPopular] = useState<boolean>(false);

  const {
    data: response,
    size,
    setSize,
    isValidating,
  } = useSWRInfinite(
    (index, prev) =>
      getKey(index, prev, {
        filters: {
          productCategory: type,
          bakingMethod: baking,
          packingMethod: packing,
          showPopular,
          teaCategory,
        },
        locale,
      }),
    (query) => getProduct(query)
  );

  const onCategoryChangeHandler = (value: string) => {
    setSize(1);
    router.query.productCategory = value;

    if (!value) {
      delete router.query.productCategory;
    }

    router.push(router, undefined, { shallow: true });
  };

  const onPackingChangeHandler = (value: string) => {
    setSize(1);
    router.query.packing = value;

    if (!value) {
      delete router.query.packing;
    }

    router.push(router, undefined, { shallow: true });
  };

  const products = flatten(response?.map((data) => data.data));
  const totalPage = response && response[0].meta.pagination.pageCount;
  const hasNextPage = size !== totalPage;

  const categoryList = categories
    ? categories
      .sort((a, b) => b.attributes.sort - a.attributes.sort)
      .map((category) => ({
        label: category.attributes.label,
        value: category.attributes.slug,
      }))
    : [];

  const packingList = [
    {
      label: locale === 'en' ? "All" : "所有包裝",
      value: false,
    },
    {
      label: locale === 'en' ? "Tea can" : "茶葉罐",
      value: "Tea can",
    },
    {
      label: locale === 'en' ? "Tea bag" : "茶包盒",
      value: "Tea bag",
    },
  ];

  const backingList = [
    { label: locale === 'en' ? "All" : "所有方法", value: false },
    { label: locale === 'en' ? "none" : "無", value: "none" },
    { label: locale === 'en' ? "light" : "輕", value: "light" },
    { label: locale === 'en' ? "medium" : "中", value: "medium" },
    { label: locale === 'en' ? "heavy" : "重", value: "heavy", },
  ];

  return (
    <ArchiveLayout
      title={title}
      subtitle={subtitle}
      banner={banner}
      description={description}
    >
      <div className="container m-auto">
        <div className="mb-10 md:flex justify-between md:items-center">
          <div className="flex flex-row justify-between md:justify-start gap-2 md:gap-8 md:items-center">
            {!!categoryList.length && (
              <FilterDropdown
                placeholder={locale === 'en' ? "Type" : "商品種類"}
                value={type}
                onChange={(value) => {
                  onCategoryChangeHandler(value);
                }}
                list={[{ label: locale === 'en' ? "All" : "所有種類", value: false }, ...categoryList]}
              />
            )}
            <FilterDropdown
              placeholder={locale === 'en' ? "Package" : "包裝方式"}
              value={packing}
              onChange={(value) => {
                onPackingChangeHandler(value);
              }}
              list={packingList}
            />
            <FilterDropdown
              placeholder={locale === 'en' ? "Level of Roasting" : "烘焙度"}
              value={baking}
              onChange={(value) => {
                setSize(1);
                setBaking(value);
              }}
              list={backingList}
            />
          </div>
          <button
            onClick={() => setShowPopular((toggle) => !toggle)}
            className={`text-secondary mt-5 md:mt-0 border-2 border-secondary px-4 py-[6px] transition-all ${showPopular
              ? "bg-secondary text-white hover:bg-secondary-hover active:bg-secondary-active"
              : "hover:bg-transparent-hover active:bg-transparent-active"
              }`}
          >
            {locale === 'en' ? "Best Selling" : "顯示熱賣產品"}
          </button>
        </div>
        <div className="w-full grid grid-cols-4 md:grid-cols-12 gap-[44px]">
          <AnimatePresence exitBeforeEnter>
            {products &&
              products.map((listProduct) => (
                <motion.div
                  key={listProduct.id}
                  className="col-span-4"
                  initial={{
                    opacity: 0,
                    y: -20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 20,
                  }}
                >
                  <ListProductCard {...listProduct.attributes} />
                </motion.div>
              ))}
            {!products && (
              <motion.div
                className="col-span-12 flex justify-center h-[500px] items-center"
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 20,
                }}
              >
                <ScaleLoader color="#78A0AA" />
              </motion.div>
            )}
            {products && products.length === 0 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 20,
                }}
                className="col-span-12 flex justify-center h-[500px] items-center"
              >
                <div className="flex flex-col items-center opacity-70">
                  <div className="mb-5">
                    <Logo className="fill-black w-20 h-20" />
                  </div>
                  <span className="text-body font-bold">{locale ==='en'? "No result":"搜尋沒有結果"}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Spacing className="h-[100px]" />
        <div className="text-center">
          {isValidating && <ScaleLoader color="#78A0AA" />}
          {!isValidating && hasNextPage && (
            <button
              onClick={() => setSize(size + 1)}
              className="border border-secondary text-body text-secondary py-[6px] min-w-[140px] hover:bg-secondary-light-hover active:bg-secondary-light-active transition-colors"
            >
              {locale === 'en' ? "Show more" : "顯示更多產品"}
            </button>
          )}
        </div>
      </div>
    </ArchiveLayout>
  );
}
