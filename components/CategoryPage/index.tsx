import { AnimatePresence } from "framer-motion";
import { flatten } from "lodash";
import { useRouter } from "next/router";
import qs from "qs";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { getProduct, getProductCategories } from "../../api";
import {
  CategoryPageResponse,
  ComposeWithMeta,
  ListProduct,
  StrapiEntry,
} from "../../api/types";
import ArchiveLayout from "../../components/ArchiveLayout";
import ListProductCard from "../../components/ListProductCard";
import { getLocale } from "../../utils";
import Spacing from "../Spacing";

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
  products
}: CategoryPageProps) {
  const router = useRouter();
  const locale = router.locale;

  // console.log(router);

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



  

  const totalPage = response && response[0].meta.pagination.pageCount;
  const hasNextPage = size !== totalPage;


 
  // console.log("PRODUCTS==>",products)
  return (
    <ArchiveLayout
      title={title}
      subtitle={subtitle}
      banner={banner}
      description={description}
    >
      <div className="container m-auto">
        <div className="mb-10 md:flex justify-between md:items-center"></div>
        <div className="w-full grid grid-cols-4 md:grid-cols-12 gap-[44px]">
          <AnimatePresence exitBeforeEnter>
            {products &&
              products.map((listProduct:any) => (
                <div key={listProduct.id} className="col-span-4">
                  <ListProductCard {...listProduct} />
                </div>
              ))}
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
              {locale === "en" ? "Show more" : "顯示更多產品"}
            </button>
          )}
        </div>
      </div>
    </ArchiveLayout>
  );
}
