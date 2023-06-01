import Image from "next/image";
import { Fragment, useRef, useState } from "react";
import ProductTag from "../ProductTag";
import { ListProduct } from "../../api/types";
import { appendBaseUrl, renderPackingText } from "../../utils";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import Spacing from "../Spacing";
import { Description, PackingMethod, Spec } from "../../pages/products/[slug]";
import SocialMediaList from "../SocialMediaList";
import { useRouter } from "next/router";

type ListProductCardProps = ListProduct;

export default function ListProductCard(props: ListProductCardProps) {
  const {
    defaultImages,
    teaCategory,
    name,
    price,
    packingMethod,
    productSpec,
    description,
  } = props;
  const router = useRouter();
  const locale = router.locale;

  const firstPrice = useRef<number>(price);
  const [isOpen, setIsOpen] = useState(false);
  const [packingImage, setPackingImage] = useState(() => {
    if (!packingMethod || packingMethod.length === 0) {
      if (defaultImages) {
        return defaultImages.data[0];
      }

      return undefined;
    }

    const firstPacking = packingMethod[0];
    if (
      firstPacking &&
      firstPacking.packingImages.data &&
      firstPacking.packingImages.data.attributes.url
    ) {
      return firstPacking.packingImages.data;
    }
  });
  const [packingPrice, setPackingPrice] = useState(() => {
    if (!packingMethod || packingMethod.length === 0) {
      return undefined;
    }

    const firstPacking = packingMethod[0];
    if (firstPacking && firstPacking.packingPrice) {
      firstPrice.current = firstPacking.packingPrice;
      return firstPacking.packingPrice;
    }
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const basePath = `${process.env.NEXT_PUBLIC_URL}${locale === "zh" ? "/zh" : ""
    }/products`;

  return (
    <>
      <div className="w-full">
        <div className="group relative aspect-[317/313]">
          {props.thumbnailImage && (
            <Link href={`/products/${props.slug}`}>
              <a className="block relative w-full h-full">
                <Image
                  src={appendBaseUrl(props.thumbnailImage.data.attributes.url)}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  alt={props.thumbnailImage.data.attributes.alternativeText}
                />
              </a>
            </Link>
          )}
          <div className="hidden md:flex absolute left-0 right-0 justify-center opacity-0 bottom-3 group-hover:opacity-100 group-hover:bottom-6 transition-all duration-500">
            <div className="px-[30px] flex gap-[24px] py-[6px] rounded-[2px] bg-white">
              <button
                onClick={openModal}
                className="fill-secondary hover:fill-secondary-hover active:fill-secondary-active transition-all"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.71 16.29L14.31 12.9C15.407 11.5025 16.0022 9.77666 16 8C16 6.41775 15.5308 4.87103 14.6518 3.55544C13.7727 2.23985 12.5233 1.21447 11.0615 0.608967C9.59966 0.00346625 7.99113 -0.15496 6.43928 0.153721C4.88743 0.462403 3.46197 1.22433 2.34315 2.34315C1.22433 3.46197 0.462403 4.88743 0.153721 6.43928C-0.15496 7.99113 0.00346625 9.59966 0.608967 11.0615C1.21447 12.5233 2.23985 13.7727 3.55544 14.6518C4.87103 15.5308 6.41775 16 8 16C9.77666 16.0022 11.5025 15.407 12.9 14.31L16.29 17.71C16.383 17.8037 16.4936 17.8781 16.6154 17.9289C16.7373 17.9797 16.868 18.0058 17 18.0058C17.132 18.0058 17.2627 17.9797 17.3846 17.9289C17.5064 17.8781 17.617 17.8037 17.71 17.71C17.8037 17.617 17.8781 17.5064 17.9289 17.3846C17.9797 17.2627 18.0058 17.132 18.0058 17C18.0058 16.868 17.9797 16.7373 17.9289 16.6154C17.8781 16.4936 17.8037 16.383 17.71 16.29ZM2 8C2 6.81332 2.3519 5.65328 3.01119 4.66658C3.67047 3.67989 4.60755 2.91085 5.7039 2.45673C6.80026 2.0026 8.00666 1.88378 9.17055 2.11529C10.3344 2.3468 11.4035 2.91825 12.2426 3.75736C13.0818 4.59648 13.6532 5.66558 13.8847 6.82946C14.1162 7.99335 13.9974 9.19975 13.5433 10.2961C13.0892 11.3925 12.3201 12.3295 11.3334 12.9888C10.3467 13.6481 9.18669 14 8 14C6.4087 14 4.88258 13.3679 3.75736 12.2426C2.63214 11.1174 2 9.5913 2 8Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <h2 className="text-productCardTitle mt-3">
          <Link href={`/products/${props.slug}`}>
            <a className="hover:text-secondary transition-colors">
              {props.name}
            </a>
          </Link>
        </h2>
        <span className="block text-secondary-1 text-body">
          {props.currency}
          {firstPrice.current}
        </span>
        {props.tags && (
          <ul className="flex flex-col gap-2 mt-[10px]">
            {props.tags.map((tag) => {
              if (tag.showInThumbnail) {
                return (
                  <ProductTag
                    key={tag.id}
                    label={tag.productTag.data?.attributes?.label}
                    value={tag.value}
                  />
                );
              }

              return null;
            })}
          </ul>
        )}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[800px] max-h-[650px] transform overflow-y-scroll rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="w-full md:grid grid-cols-12 gap-[60px]">
                    <div className="col-span-6">
                      {packingImage && (
                        <Image
                          className="w-full"
                          key={packingImage.id}
                          src={appendBaseUrl(packingImage.attributes.url)}
                          width={packingImage.attributes.width}
                          height={packingImage.attributes.height}
                          alt={packingImage.attributes.alternativeText}
                        />
                      )}
                    </div>
                    <Spacing className="block h-10 md:hidden" />
                    <div className="col-span-6 relative">
                      <div className="md:sticky top-[60px]">
                        <div>
                          {teaCategory?.data && (
                            <span className="block text-subtitle">
                              {teaCategory.data.map(
                                (category, index) =>
                                  `${category.attributes.title} ${index == teaCategory.data.length - 1
                                    ? ""
                                    : " / "
                                  }`
                              )}
                            </span>
                          )}
                          <h1 className="text-h2 text-secondary font-serif mt-[10px]">
                            {name}
                          </h1>
                          <span
                            aria-label="price"
                            className="block text-h4 mt-5"
                          >
                            {props.currency}
                            {packingPrice ? packingPrice : price}
                          </span>
                        </div>

                        {packingMethod?.length !== 0 && (
                          <>
                            <Spacing className="h-4" />

                            <PackingMethod locale={locale === 'en' ? 'Packing method' : '包裝方式'}>
                              {packingMethod?.map((method) => {
                                const active =
                                  method.packingImages.data.id ===
                                  packingImage?.id;

                                return (
                                  <button
                                    key={method.id}
                                    onClick={() => {
                                      setPackingImage(
                                        method.packingImages.data
                                      );
                                      setPackingPrice(method.packingPrice);
                                    }}
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

                        <Description locale={locale === 'en' ? 'Description' : '產品描述'}>{description}</Description>

                        <Spacing className="h-[30px]" />

                        <Spec locale={locale === 'en' ? 'Packing' : '產品規格'}>
                          {productSpec?.map((spec) => (
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

                        <Link href={`/products/${props.slug}`}>
                          <button className="bg-secondary text-body text-white py-[6px] min-w-[140px] hover:bg-secondary-hover active:bg-secondary-active transition-colors">
                            查看產品細節
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
