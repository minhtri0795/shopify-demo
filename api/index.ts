import axios from "axios";
import {
  AboutPage,
  ArticleCategory,
  CategoryPageResponse,
  ComposeWithMeta,
  ContactFormParams,
  ContactPage,
  CopyrightPage,
  DetailArticle,
  DetailProduct,
  FetchOption,
  Footer,
  HeaderResponse,
  HomeResponse,
  ListArticle,
  ListArticleWithoutPopulation,
  ListProduct,
  ListProductWithoutPopulation,
  NewsArchive,
  ProductCategory,
  StrapiEntry,
  TeaCategory,
} from "./types";
import qs from "qs";
import {
  getDataFromResponse,
  getEntriesFromResponse,
  getLocale,
  getMetaFromResponse,
} from "../utils";

const SeoPopulate = "seo,seo.metaImage,seo.metaSocial.image";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getHeader = async (
  option?: FetchOption
): Promise<HeaderResponse> => {
  const response = await instance.get(
    "/api/header?populate[0]=headerMenuItem&populate[1]=headerMenuItem.subMenu&populate[2]=headerMenuItem.subMenu.list",
    {
      params: {
        locale: getLocale(option?.locale),
      },
    }
  );

  return {
    menu: response.data.data.attributes.headerMenuItem,
    enableHeaderNotification:
      response.data.data.attributes.enableHeaderNotification,
    headerNotificationText:
      response.data.data.attributes.headerNotificationText,
  };
};

export const getFooter = async (option?: FetchOption): Promise<Footer> => {
  const response = await instance.get(
    "/api/footer?populate[0]=footerMenu,mailchimpSectionTitle&populate[1]=footerMenu.subMenu",
    {
      params: {
        locale: getLocale(option?.locale),
      },
    }
  );

  const { attributes } = getDataFromResponse<Footer>(response);

  return {
    ...attributes,
  };
};

export const getHome = async (option: FetchOption): Promise<HomeResponse> => {
  const populate2 = [
    "seo",
    "seo.metaImage",
    "seo.metaSocial.image",
    "banner.image",
    "features",
    "features.featureList",
    "features.image",
    "productCategory.sectionTitle",
    "productCategory.categoryList",
    "introduction.image",
    "introduction.sectionTitle",
    "homeProduct",
    "homeProduct.sectionTitle",
    "homeArticles",
    "homeArticles.sectionTitle",
  ];

  const populate3 = [
    "productCategory.categoryList.image",
    "homeProduct.productTab.products.product",
    "homeArticles.articles.rec.banner",
  ];

  const populate4 = [
    "homeProduct.productTab.products.product.tags.productTag",
    "homeProduct.productTab.products.product.thumbnailImage",
  ];

  const query = qs.stringify(
    {
      populate: [
        "*",
        populate2.join(","),
        populate3.join(","),
        populate4.join(","),
      ],
    },
    { encodeValuesOnly: true }
  );

  const response = await instance.get(`/api/home?${query}`, {
    params: {
      locale: getLocale(option?.locale),
    },
  });

  const { attributes } = response.data.data;

  const {
    banner,
    introduction,
    features,
    productCategory,
    homeProduct,
    homeArticles,
    seo,
  } = attributes;

  return {
    banner,
    introduction,
    features,
    productCategory,
    homeProduct,
    homeArticles,
    seo,
  };
};

export const getCategoryPage = async (
  option?: FetchOption
): Promise<CategoryPageResponse> => {
  const query = qs.stringify(
    {
      populate: ["banner", SeoPopulate],
    },
    { encodeValuesOnly: true }
  );

  const response = await instance.get(`/api/category?${query}`, {
    params: {
      locale: getLocale(option?.locale),
    },
  });

  const { attributes } = getDataFromResponse<CategoryPageResponse>(response);

  const { title, subtitle, banner, description, seo } = attributes;

  return {
    title,
    subtitle,
    banner,
    description,
    seo,
  };
};

export const getRelatedProducts = async (
  _ids: string[],
  option?: FetchOption
): Promise<StrapiEntry<ListProduct>[]> => {
  const ids = _ids.filter(Boolean);

  if (ids.length === 0) {
    return [];
  }

  const filters = qs.stringify(
    {
      filters: {
        id: {
          $in: [...ids],
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const query = qs.stringify(
    {
      populate: [
        "tags,thumbnailImage",
        "tags.productTag",
        "packingMethod.packingImages",
        "defaultImages",
      ],
    },
    { encodeValuesOnly: true }
  );

  const response = await instance.get(`/api/products?${query}&${filters}`, {
    params: {
      locale: getLocale(option?.locale),
    },
  });

  const data = getEntriesFromResponse<ListProduct>(response);

  return data;
};

export const getRelatedArticles = async (
  _ids: (string | number)[],
  option?: FetchOption
): Promise<StrapiEntry<ListArticle>[]> => {
  const ids = _ids.filter(Boolean);

  if (ids.length === 0) {
    return [];
  }

  const filters = qs.stringify(
    {
      filters: {
        id: {
          $in: [...ids],
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const query = qs.stringify(
    {
      populate: "*",
    },
    { encodeValuesOnly: true }
  );

  const response = await instance.get(`/api/articles?${query}&${filters}`, {
    params: {
      locale: getLocale(option?.locale),
    },
  });

  const data = getEntriesFromResponse<ListArticle>(response);

  return data;
};

export const getProduct = async (
  query: string,
  option?: {
    locale?: string;
  }
): Promise<ComposeWithMeta<StrapiEntry<ListProduct>[]>> => {
  const response = await instance.get(`/api/products?${query}`);

  const data = getEntriesFromResponse<ListProduct>(response);
  const meta = getMetaFromResponse(response);

  return { data, meta };
};

export const getTeaCategories = async (
  option?: FetchOption
): Promise<StrapiEntry<TeaCategory>[]> => {
  const response = await instance.get(`/api/tea-categories`, {
    params: {
      locale: getLocale(option?.locale),
    },
  });

  const data = getEntriesFromResponse<TeaCategory>(response);

  return data;
};

export const getTeaCategoryBySlug = async (
  slug: string,
  option?: FetchOption
): Promise<StrapiEntry<TeaCategory>[]> => {
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });

  const response = await instance.get(
    `/api/tea-categories?${query}&populate=banner,${SeoPopulate}`,
    {
      params: {
        locale: getLocale(option?.locale),
      },
    }
  );

  const data = getEntriesFromResponse<TeaCategory>(response);

  return data;
};

export const getProductCategories = async (
  option?: FetchOption
): Promise<StrapiEntry<ProductCategory>[]> => {
  const response = await instance.get(`/api/product-categories`, {
    params: {
      locale: getLocale(option?.locale),
    },
  });

  const data = getEntriesFromResponse<ProductCategory>(response);

  return data;
};

// This api will use offset pagination limit to 100.
export const getProductPath = async (
  option?: FetchOption
): Promise<StrapiEntry<ListProductWithoutPopulation>[]> => {
  const query = qs.stringify(
    {
      pagination: {
        start: 0,
        limit: 100,
      },
      populate: "localizations",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await instance.get(`/api/products?${query}`, {
    params: {
      locale: getLocale(option?.locale),
    },
  });

  const data = getEntriesFromResponse<ListProductWithoutPopulation>(response);

  return data;
};

export const getProductBySlug = async (
  slug: string,
  option?: FetchOption
): Promise<StrapiEntry<DetailProduct>[]> => {
  const query = qs.stringify({
    populate: [
      "productCategory,teaCategory,thumbnailImage,tags,defaultImages,packingMethod,productSpec,brewingMethod,rec.product",
      "packingMethod.packingImages,tags.productTag",
      SeoPopulate,
    ],
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });

  const response = await instance.get(`/api/products?${query}`, {
    params: {
      locale: getLocale(option?.locale),
    },
  });

  const data = getEntriesFromResponse<DetailProduct>(response);

  return data;
};

export const getNewsArchive = async (
  option?: FetchOption
): Promise<NewsArchive> => {
  const query = qs.stringify(
    {
      populate: ["banner", SeoPopulate],
    },
    { encodeValuesOnly: true }
  );

  const response = await instance.get(`/api/news-archive?${query}`, {
    params: {
      locale: getLocale(option?.locale),
    },
  });

  const { attributes } = getDataFromResponse<NewsArchive>(response);

  const { title, subtitle, banner, description, seo } = attributes;

  return {
    title,
    subtitle,
    banner,
    description,
    seo,
  };
};

/**
 * Get 5 articles once
 */
export const getArticles = async (
  query: string
): Promise<ComposeWithMeta<StrapiEntry<ListArticle>[]>> => {
  const response = await instance.get(query);

  const data = getEntriesFromResponse<ListArticle>(response);
  const meta = getMetaFromResponse(response);

  return { data, meta };
};

export const getArticleCategories = async (
  option?: FetchOption
): Promise<StrapiEntry<ArticleCategory>[]> => {
  const response = await instance.get(`/api/article-categories`, {
    params: {
      locale: getLocale(option?.locale),
    },
  });

  const data = getEntriesFromResponse<ArticleCategory>(response);

  return data;
};

export const getArticlePath = async (
  option?: FetchOption
): Promise<StrapiEntry<ListArticleWithoutPopulation>[]> => {
  const query = qs.stringify(
    {
      pagination: {
        start: 0,
        limit: 100,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await instance.get(`/api/articles?${query}`, {
    params: {
      locale: getLocale(option?.locale),
    },
  });

  const data = getEntriesFromResponse<ListArticleWithoutPopulation>(response);

  return data;
};

export const getArticleBySlug = async (
  slug: string,
  option?: FetchOption
): Promise<StrapiEntry<DetailArticle>[]> => {
  const query = qs.stringify({
    populate: ["banner,category,rec", "rec.rec", SeoPopulate],
    filters: {
      slug: {
        $eq: slug,
      },
    },
  });

  const response = await instance.get(`/api/articles?${query}`, {
    params: {
      locale: getLocale(option?.locale),
    },
  });

  const data = getEntriesFromResponse<DetailArticle>(response);

  return data;
};

export const getContactPage = async (
  option?: FetchOption
): Promise<ContactPage> => {
  const query = qs.stringify(
    {
      populate: ["archiveLayout.banner", SeoPopulate],
    },
    { encodeValuesOnly: true }
  );

  const response = await instance.get(`/api/contact?${query}`, {
    params: {
      locale: getLocale(option?.locale),
    },
  });

  const { attributes } = getDataFromResponse<ContactPage>(response);

  const { archiveLayout, seo } = attributes;

  return {
    archiveLayout,
    seo,
  };
};

export const getAboutPage = async (
  option?: FetchOption
): Promise<AboutPage> => {
  const query = qs.stringify(
    {
      populate: [
        "aboutHeader.banner,bannerLeft,bannerMiddle,bannerRight,paragraph,description1,imageText1.image,imageText2.image,bannerText.banner,imageText3.image,imageText4.image,aboutFooter.image",
        SeoPopulate,
      ],
    },
    { encodeValuesOnly: true }
  );

  const response = await instance.get(`/api/about?${query}`, {
    params: {
      locale: getLocale(option?.locale),
    },
  });

  const { attributes } = getDataFromResponse<AboutPage>(response);

  return {
    ...attributes,
  };
};

export const createContactForm = async (form: ContactFormParams) => {
  const response = await instance.post(`/api/contact-forms`, {
    data: { ...form },
  });

  return response;
};

export const getCopyright = async (
  option?: FetchOption
): Promise<CopyrightPage> => {
  const response = await instance.get(`/api/copyright`, {
    params: {
      locale: getLocale(option?.locale),
    },
  });

  const { attributes } = getDataFromResponse<CopyrightPage>(response);

  return {
    ...attributes,
  };
};
