import { Fragment, HTMLProps, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Swiper, SwiperSlide } from "swiper/react";
import { getProductBySlug, getRelatedProducts } from "../../api";
import { InferGetStaticPropsType } from "next";
import { DetailProduct } from "../../api/types";
import Image from "next/image";
import { appendBaseUrl, renderPackingText } from "../../utils";
import Spacing from "../../components/Spacing";
import SocialMediaList from "../../components/SocialMediaList";
import ProductTag from "../../components/ProductTag";
import SectionTitle from "../../components/SectionTitle";
import useSWR from "swr";
import ListProductCard from "../../components/ListProductCard";
import Seo from "../../components/Seo";
import { useRouter } from "next/router";

export const BlockTitle = ({ text }: { text: string }) => (
  <h2 className="mb-[10px] text-body font-bold">{text}</h2>
);
//產品敘述
export const Description = ({ children, locale }: { children: React.ReactNode, locale: string }) => (
  <div>
    <BlockTitle text={locale} />
    <p className="text-body">{children}</p>
  </div>
);
//產品規格
export const Spec = ({ children, locale }: { children: React.ReactNode, locale: string }) => (
  <div>
    <BlockTitle text={locale} />
    <ul className="text-body mb-1">{children}</ul>
  </div>
);

export const BuyButton = ({
  label,
  link,
}: {
  label?: string;
  link?: string;
}) => (
  <div>
    <a
      href={link}
      className="inline-block text-center bg-secondary text-body text-white py-[6px] min-w-[140px] hover:bg-secondary-hover active:bg-secondary-active transition-colors"
    >
      {label}
    </a>
  </div>
);
//包裝方式
export const PackingMethod = ({ children, locale }: { children: React.ReactNode, locale: string }) => (
  <div>
    <BlockTitle text={locale} />
    <div className="flex gap-2">{children}</div>
  </div>
);
//產品特色
export const Tags = ({ children, locale }: { children: React.ReactNode, locale: string }) => (
  <div>
    <BlockTitle text={locale} />
    <ul className="flex flex-col gap-2">{children}</ul>
  </div>
);
//其他注意事項
export const Notice = ({ children, locale }: { children: React.ReactNode, locale: string }) => (

  <div>
    <BlockTitle text={locale} />
    <p className="text-body">{children}</p>
  </div>
);

export const BrewingMethod = ({
  brewingMethod,
}: {
  brewingMethod: DetailProduct["brewingMethod"];
}) => {
  const Cell = (props: HTMLProps<HTMLDivElement>) => (
    <td
      className={`border border-[#DDD] pl-5 py-[10px] text-body ${props.className}`}
    >
      {props.children}
    </td>
  );

  const router = useRouter();
  const locale = router.locale;

  const i18nText = {
    category: locale === 'en' ? "Tea type" : "種類",
    Amount: locale === 'en' ? "Amount of Tea leaves" : "置茶量",
    termperature: locale === 'en' ? "Water Temperature" : "水溫",
    wateramount: locale === 'en' ? "Water amount" : "水量",
    time: locale === 'en' ? "Duration" : "時間",
    tips: locale === 'en' ? "Tips" : "貼心小提醒",
  }



  return (
    <div>
      <BlockTitle text={locale === 'en' ? "Tea preparation" : "沖泡方式"} />
      <table className="hidden md:table table-auto w-full">
        <thead>
          <tr className="text-left bg-secondary text-white font-bold">
            <Cell>{i18nText.category}</Cell>
            <Cell>{i18nText.Amount}</Cell>
            <Cell>{i18nText.termperature}</Cell>
            <Cell>{i18nText.wateramount}</Cell>
            <Cell>{i18nText.time}</Cell>
            <Cell>{i18nText.tips}</Cell>
          </tr>
        </thead>
        <tbody>
          {brewingMethod.map((method) => (
            <tr key={method.id} className="border-b border-[#DDD]">
              <Cell>{method.type}</Cell>
              <Cell>{method.amount}</Cell>
              <Cell>{method.temp}</Cell>
              <Cell>{method.water}</Cell>
              <Cell>{method.time}</Cell>
              <Cell className="max-w-[300px]">{method.notice}</Cell>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="block md:hidden">
        {brewingMethod.map((method) => (
          <table key={method.id} className="table-auto w-full mb-10">
            <tbody>
              <tr className="border-b border-[#DDD]">
                <Cell className="text-left bg-secondary text-white font-bold w-[120px]">
                  {i18nText.category}
                </Cell>
                <Cell>{method.type}</Cell>
              </tr>
              <tr className="border-b border-[#DDD]">
                <Cell className="text-left bg-secondary text-white font-bold w-[120px]">
                  {i18nText.Amount}
                </Cell>
                <Cell>{method.amount}</Cell>
              </tr>
              <tr className="border-b border-[#DDD]">
                <Cell className="text-left bg-secondary text-white font-bold w-[120px]">
                  {i18nText.termperature}
                </Cell>
                <Cell>{method.temp}</Cell>
              </tr>
              <tr className="border-b border-[#DDD]">
                <Cell className="text-left bg-secondary text-white font-bold w-[120px]">
                  {i18nText.wateramount}
                </Cell>
                <Cell>{method.water}</Cell>
              </tr>
              <tr className="border-b border-[#DDD]">
                <Cell className="text-left bg-secondary text-white font-bold w-[120px]">
                  {i18nText.time}
                </Cell>
                <Cell>{method.time}</Cell>
              </tr>
              <tr className="border-b border-[#DDD]">
                <Cell className="text-left bg-secondary text-white font-bold w-[120px]">
                  {i18nText.tips}
                </Cell>
                <Cell>{method.notice}</Cell>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};

export default function ProductPage(
  props: InferGetStaticPropsType<typeof getServerSideProps>
) {
  const {
    slug,
    defaultImages,
    teaCategory,
    productCategory,
    brewingMethod,
    name,
    price,
    packingMethod,
    description,
    productSpec,
    tags,
    notice,
    rec,
    currency,
    buyButtonText,
    buyButtonLink,
  } = props;

  const relatedIds = rec.map((item) => item.product?.data?.id);
  const router = useRouter();

  const locale = router.locale;
  const pathName = router;

  const { data } = useSWR(`relatedProduct-${slug}-${locale}`, () =>
    getRelatedProducts([...relatedIds], { locale })
  );

  const [firstPackingMethod, setFirstPackingMethod] = useState(() => {
    if (!packingMethod) {
      return undefined;
    }

    const firstPacking = packingMethod[0];
    if (
      firstPacking &&
      firstPacking.packingImages.data &&
      firstPacking.packingImages.data.attributes.url
    ) {
      return {
        image: firstPacking.packingImages.data,
        price: firstPacking.packingPrice || price,
      };
    }
  });

  const basePath = `${process.env.NEXT_PUBLIC_URL}${locale === "zh" ? "/zh" : ""
    }/products`;

  return (
    <>
      {props.seo && <Seo {...props.seo} />}
      <div className="container m-auto">
        <div className="w-full block md:hidden">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {firstPackingMethod?.image && (
              <SwiperSlide>
                <Image
                  className="w-full"
                  src={appendBaseUrl(firstPackingMethod?.image.attributes.url)}
                  quality={100}
                  width={firstPackingMethod?.image.attributes.width}
                  height={firstPackingMethod?.image.attributes.height}
                  alt={firstPackingMethod?.image.attributes.alternativeText}
                />
              </SwiperSlide>
            )}
            {defaultImages.data.map((image) => (
              <SwiperSlide key={image.id}>
                <Image
                  className="w-full"
                  quality={100}
                  src={appendBaseUrl(image.attributes.url)}
                  width={image.attributes.width}
                  height={image.attributes.height}
                  alt={image.attributes.alternativeText}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-full md:grid grid-cols-12 gap-[60px]">
          <div className="col-span-6 hidden md:block">
            {firstPackingMethod?.image && (
              <Image
                className="w-full"
                src={appendBaseUrl(firstPackingMethod?.image.attributes.url)}
                quality={100}
                width={firstPackingMethod?.image.attributes.width}
                height={firstPackingMethod?.image.attributes.height}
                alt={firstPackingMethod?.image.attributes.alternativeText}
              />
            )}
            {defaultImages.data.map((image) => (
              <Image
                className="w-full"
                key={image.id}
                quality={100}
                src={appendBaseUrl(image.attributes.url)}
                width={image.attributes.width}
                height={image.attributes.height}
                alt={image.attributes.alternativeText}
              />
            ))}
          </div>
          <Spacing className="block h-10 md:hidden" />
          <div className="col-span-6 relative">
            <div className="md:sticky top-[60px]">
              <div>
                {teaCategory.data && (
                  <span className="block text-subtitle">
                    {teaCategory.data.map(
                      (category, index) =>
                        `${category.attributes.title} ${index == teaCategory.data.length - 1 ? "" : " / "
                        }`
                    )}
                  </span>
                )}
                <h1 className="text-h2 text-secondary font-serif mt-[10px]">
                  {name}
                </h1>
                <span aria-label="price" className="block text-h4 mt-5">
                  {currency}
                  {firstPackingMethod ? firstPackingMethod.price : price}
                </span>
              </div>

              {packingMethod?.length !== 0 && (
                <>
                  <Spacing className="h-4" />

                  <PackingMethod locale={locale === 'en' ? 'Packing method' : '包裝方式'}>
                    {packingMethod.map((method) => {
                      const active =
                        method.packingImages.data.id ===
                        firstPackingMethod?.image?.id;

                      return (
                        <button
                          key={method.id}
                          onClick={() =>
                            setFirstPackingMethod({
                              image: method.packingImages.data,
                              price: method.packingPrice || price,
                            })
                          }
                          className={`inline-block border border-black text-body px-[23px] py-1 hover:bg-transparent-hover active:bg-transparent-active transition-colors ${active
                            ? "bg-black text-white hover:bg-black-hover active:bg-black-active"
                            : ""
                            }`}
                        >
                          {renderPackingText(method.packingMethod, locale)}
                        </button>
                      );
                    })}
                  </PackingMethod>
                </>
              )}

              <Spacing className="h-6" />

              {buyButtonText && (
                <BuyButton label={buyButtonText} link={buyButtonLink} />
              )}

              <Spacing className="h-[38px]" />

              <Description
                locale={locale === 'en' ? 'Description' : '產品描述'}>{description}</Description>

              <Spacing className="h-[30px]" />

              <Spec locale={locale === 'en' ? 'Packing' : '產品規格'}>
                {productSpec.map((spec) => (
                  <li key={spec.id}>
                    {spec.label}：{spec.value}
                  </li>
                ))}
              </Spec>

              <Spacing className="h-[56px]" />

              <SocialMediaList
                fill="black"
                facebookLink={`https://www.facebook.com/sharer.php?u=${basePath}/${props.slug}`}
                copyLink={`${basePath}/${props.slug}`}
                messengerLink={`fb-messenger://share?link=${basePath}/${props.slug}`}
              />

              <Spacing className="h-[30px]" />

              <Tags locale={locale === 'en' ? 'Feature' : '產品特色'}>
                {tags?.map((tag) => (
                  <>
                    {tag.productTag.data && tag.showInPage && (
                      <ProductTag
                        key={tag.id}
                        label={tag.productTag.data.attributes.label}
                        value={tag.value}
                      />
                    )}
                  </>
                ))}
              </Tags>

              <Spacing className="h-[30px]" />

              <Notice locale={locale === 'en' ? 'Note' : '其他注意事項'}>{notice}</Notice>
            </div>
          </div>
        </div>
        <Spacing className="h-6" />

        <BrewingMethod brewingMethod={brewingMethod} />

        <Spacing className="h-16" />

        {data && data.length !== 0 && (
          <>
            <SectionTitle subtitle={locale === 'en' ? "MuaYik Tea" : "相關種類"} title={locale === 'en' ? "More recommendation" : "推薦茶品"} />

            <Spacing className="h-16" />
            <div className="flex flex-col gap-10 md:grid grid-cols-12 md:gap-[44px]">
              {data.map((product) => (
                <div key={product.id} className="col-span-4">
                  <ListProductCard {...product.attributes} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

// export const getStaticPaths: GetStaticPaths = async (ctx) => {
//   const locales = ctx.locales as string[];
//   const data: StrapiEntry<ListProductWithoutPopulation>[] = [];

//   const fetchers = locales.map(async (locale) => {
//     const entries = await getProductPath({ locale });
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
  DetailProduct,
  { slug: string }
> = async ({ params, locale }) => {
  const { slug } = params!;
  const data = await getProductBySlug(slug, { locale });

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
