import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getProductBySlug } from "../../api";
import Spacing from "../../components/Spacing";
import { ShopContext } from "../../context/shopContext";
import { parseShopifyResponse, shopifyClient } from "../../lib/shopify";
export const BlockTitle = ({ text }: { text: string }) => (
  <h2 className="mb-[10px] text-body font-bold">{text}</h2>
);
//產品敘述
export const Description = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) => (
  <div>
    <BlockTitle text={locale} />
    <p className="text-body">{children}</p>
  </div>
);

export default function ProductPage(
  props: InferGetStaticPropsType<typeof getServerSideProps>
) {
  const { product }: any = props;
  const { title, images, description, variants } = product;
  const { price } = variants[0];

  const router = useRouter();
  const { addItemTocheckout, openCart } = useContext(ShopContext);
  const locale = router.locale;

  const basePath = `${process.env.NEXT_PUBLIC_URL}${
    locale === "zh" ? "/zh" : ""
  }/products`;
  return (
    <>
      <div className="container m-auto">
        <div className="w-full block md:hidden">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
          >
            {images.map((image: any) => (
              <SwiperSlide key={image.id}>
                <Image
                  className="w-full"
                  key={image.id}
                  quality={100}
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={image.altText}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-full md:grid grid-cols-12 gap-[60px]">
          <div className="col-span-6 hidden md:block">
            {images.map((image: any) => (
              <Image
                className="w-full"
                key={image.id}
                quality={100}
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.altText}
              />
            ))}
          </div>
          <Spacing className="block h-10 md:hidden" />
          <div className="col-span-6 relative">
            <div className="md:sticky top-[60px]">
              <div>
                <span className="block text-subtitle">{"{{teaCategory}}"}</span>
                <h1 className="text-h2 text-secondary font-serif mt-[10px]">
                  {title}
                </h1>
                <span aria-label="price" className="block text-h4 mt-5">
                  {price.currencyCode} {price.amount}
                </span>
              </div>

              <Spacing className="h-6" />

              <button
                onClick={() => {
                  addItemTocheckout(product.variants[0].id, 1);
                  
                }}
                className="cursor-pointer inline-block text-center bg-secondary text-body text-white py-[6px] min-w-[140px] hover:bg-secondary-hover active:bg-secondary-active transition-colors"
              >
                Buy now
              </button>

              <Spacing className="h-[38px]" />

              <Description
                locale={locale === "en" ? "Description" : "產品描述"}
              >
                {description}
              </Description>

              <Spacing className="h-[56px]" />

              <Spacing className="h-[30px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ params, locale }: any) => {
  const { slug } = params!;
  const data = await getProductBySlug(slug, { locale });
  const product = await shopifyClient.product.fetchByHandle(slug);
  if (product.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: parseShopifyResponse(product),
    },
  };
};
