/**
 * Strapi Component
 */
export type ArchiveLayoutComponent = {
  subtitle?: string;
  title: string;
  banner?: {
    data: Media;
  };
  description?: string;
};

/**
 * Strapi bulit in
 */
export type Media = {
  id: number;
  attributes: MediaAttributes;
};

export type StrapiEntry<TResponse> = {
  id: number;
  attributes: TResponse & {
    locale: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    localizations: {
      data: StrapiEntry<TResponse>[];
    };
  };
};

export type ContactFormParams = {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  remark: string;
};

export type SEO = {
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: {
    data: Media;
  };
  metaSocial?: {
    id: number;
    socialNetwork?: "Facebook" | "Twitter";
    title?: string;
    description?: string;
    image?: { data: Media };
  }[];
  keywords?: string;
};

export type WithDateInfo<TEntry> = TEntry & {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type StrapiPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type StrapiMeta = {
  pagination: StrapiPagination;
};

export type ComposeWithMeta<TType> = {
  data: TType;
  meta: StrapiMeta;
};

export type MediaAttributes = {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: any;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    large: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: any;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    medium: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: any;
      width: number;
      height: number;
      size: number;
      url: string;
    };
    small: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path: any;
      width: number;
      height: number;
      size: number;
      url: string;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
};

/**
 * Header
 */
export type HeaderResponse = {
  enableHeaderNotification: boolean;
  headerNotificationText: string;
  menu: {
    id: number;
    label: string;
    link?: string;
    subMenu?: {
      id: number;
      title: string;
      list: {
        id: number;
        label: string;
        link?: string;
      }[];
    }[];
  }[];
};

type SectionTitle = {
  id: number;
  title: string;
  subtitle: string;
};
/**
 * Home
 */
export type HomeResponse = {
  banner: {
    textTop: string;
    textBottom: string;
    image: { data: Media };
  };
  introduction: {
    id: number;
    sectionTitle: SectionTitle;
    content: string;
    image: {
      data: Media;
    };
  };
  features: {
    id: number;
    image: {
      data: Media;
    };
    featureList: {
      id: number;
      title: string;
      content: string;
    }[];
  };
  productCategory: {
    id: number;
    sectionTitle: SectionTitle;
    categoryList: {
      id: number;
      title: string;
      link?: string;
      image: {
        data: Media;
      };
    }[];
  };
  homeProduct: {
    id: number;
    sectionTitle: SectionTitle;
    productTab: {
      id: number;
      label: string;
      products: {
        id: number;
        product: { data: StrapiEntry<ListProduct> };
      }[];
    }[];
  };
  homeArticles: {
    id: number;
    sectionTitle: SectionTitle;
    articles: {
      id: number;
      rec: {
        data: StrapiEntry<ListArticle>;
      };
    }[];
  };
  seo: SEO;
};

/**
 * Footer
 */
export type Footer = {
  logoSubtitle: string;
  footerMenu: {
    id: string;
    label: string;
    subMenu: {
      id: number;
      label: string;
      link: string;
    }[];
  }[];
  mailchimpSectionTitle: {
    id: number;
    subtitle: string;
    title: string;
  };
  copyrightText?: string;
  copyrightLabel?: string;
  copyrightLink?: string;
  followText?: string;
  facebookLink?: string;
  instagramLink?: string;
  twitterLink?: string;
  lineLink?: string;
};

/**
 * Category Page
 */
export type CategoryPageResponse = {
  subtitle?: string;
  title: string;
  banner?: {
    data: Media;
  };
  description?: string;
  seo?: SEO;
  products?:any;
};

/**
 * Contact Page
 */
export type ContactPage = {
  archiveLayout: ArchiveLayoutComponent;
  seo: SEO;
};

/**
 * Product
 */
export type ProductTag = {
  label: string;
  slug: string;
};

export type ListProduct = {
  name: string;
  slug: string;
  currency?: string;
  defaultImages: {
    data: Media[];
  };
  teaCategory: { data: StrapiEntry<TeaCategory>[] };
  bakingMethod?: string;
  packingMethod: {
    id: number;
    packingMethod: "Tea can" | "Tea bag";
    packingImages: { data: Media };
    packingPrice: number;
  }[];
  productSpec: {
    id: number;
    label: string;
    value: string;
  }[];
  price: number;
  description?: string;
  thumbnailImage?: {
    data: Media;
  };
  notice?: string;
  tags?: {
    id: number;
    value: string;
    productTag: {
      data: StrapiEntry<ProductTag>;
    };
    showInThumbnail: boolean;
    showInPage: boolean;
  }[];
};

export type DetailProduct = {
  seo?: SEO;
  isSoldOut: boolean;
  buyButtonText?: string;
  buyButtonLink?: string;
  name: string;
  slug: string;
  bakingMethod?: string;
  price: number;
  currency?: string;
  description?: string;
  thumbnailImage?: {
    data: Media;
  };
  notice?: string;
  tags?: {
    id: number;
    value: string;
    productTag: {
      data: StrapiEntry<ProductTag>;
    };
    showInThumbnail: boolean;
    showInPage: boolean;
  }[];
  defaultImages: {
    data: Media[];
  };
  teaCategory: { data: StrapiEntry<TeaCategory>[] };
  productCategory: { data: StrapiEntry<ProductCategory> };
  packingMethod: {
    id: number;
    packingMethod: "Tea can" | "Tea bag";
    packingImages: { data: Media };
    packingPrice?: number;
  }[];
  productSpec: {
    id: number;
    label: string;
    value: string;
  }[];
  brewingMethod: {
    id: number;
    type: string;
    temp: string;
    water: string;
    notice: string;
    time: string;
    amount: string;
  }[];
  // rec means Recommand product
  rec: {
    id: string;
    label: string;
    product: {
      data: {
        id: string;
        attributes: never;
      };
    };
  }[];
  product:any;
};

export type ProductCategory = {
  label: string;
  slug: string;
  sort: number;
};

export type ListProductWithoutPopulation = {
  name: string;
  slug: string;
  bakingMethod?: string;
  price: number;
  description?: string;
  notice?: string;
};

export type ProductsResponse = {
  data: StrapiEntry<ListProduct>[];
};

export type TeaCategory = {
  title: string;
  slug: string;
  subtitle?: string;
  banner?: {
    data: Media;
  };
  description?: string;
  seo?: SEO;
};

/**
 * Articles
 */

export type NewsArchive = {
  title: string;
  subtitle?: string;
  banner?: {
    data: Media;
  };
  description?: string;
  seo?: SEO;
};

export type ListArticle = {
  title: string;
  slug: string;
  description?: string;
  arthor?: string;
  content?: string;
  banner?: {
    data: Media;
  };
  category?: {
    data?: StrapiEntry<ArticleCategory>;
  };
};

export type DetailArticle = {
  seo?: SEO;
  title: string;
  slug: string;
  description?: string;
  arthor?: string;
  content?: string;
  banner?: {
    data?: Media;
  };
  category?: {
    data?: StrapiEntry<ArticleCategory>;
  };
  rec: {
    id: string;
    rec: { data: StrapiEntry<ListArticleWithoutPopulation> };
  }[];
};

export type ListArticleWithoutPopulation = {
  title: string;
  slug: string;
  description?: string;
  arthor?: string;
  content?: string;
};

export type ArticleCategory = {
  label: string;
  slug: string;
};

export type CopyrightPage = {
  title: string;
  content: string;
};

export type AboutPage = {
  seo?: SEO;
  aboutHeader: {
    id: number;
    title?: string;
    subtitle?: string;
    banner?: {
      data: Media;
    };
  };
  paragraph: {
    id: number;
    left?: string;
    right?: string;
  };
  bannerLeft: {
    data: Media;
  };
  bannerMiddle: {
    data: Media;
  };
  bannerRight: {
    data: Media;
  };
  description1: {
    id: number;
    title?: string;
    description?: string;
  };
  imageText1: {
    id: number;
    description?: string;
    title?: string;
    image?: {
      data: Media;
    };
  };
  imageText2: {
    id: number;
    description?: string;
    title?: string;
    image?: {
      data: Media;
    };
  };
  bannerText: {
    id: number;
    title?: string;
    description?: string;
    banner?: {
      data: Media;
    };
  };
  imageText3: {
    id: number;
    description?: string;
    title?: string;
    image?: {
      data: Media;
    };
  };
  imageText4: {
    id: number;
    description?: string;
    title?: string;
    image?: {
      data: Media;
    };
  };
  aboutFooter: {
    id: number;
    title?: string;
    description?: string;
    image?: {
      data: Media;
    };
  };
};

export type FetchOption = {
  locale?: string;
};
