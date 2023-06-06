import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ListProductCard(props: any) {
  const router = useRouter();
  const locale = router.locale;
  const basePath = `${process.env.NEXT_PUBLIC_URL}${locale === "zh" ? "/zh" : ""
    }/products`;

  return (
    <>
      <div className="w-full">
        <div className="group relative aspect-[317/313]">
          {props.images && (
            <Link href={`/products/${props.handle}`}>
              <a className="block relative w-full h-full">
                <Image
                  src={props.images[0].src}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  alt={props.images[0].altText}
                />
              </a>
            </Link>
          )}
        </div>
        <h2 className="text-productCardTitle mt-3">
          <Link href={`/products/${props.handle}`}>
            <a className="hover:text-secondary transition-colors">
              {props.title}
            </a>
          </Link>
        </h2>
        <span className="block text-secondary-1 text-body">
          {props?.variants[0]?.price?.currencyCode || ""} {" "}
          {props?.variants[0]?.price?.amount || ""}
        </span>
        
      </div>
    </>
  );
}
