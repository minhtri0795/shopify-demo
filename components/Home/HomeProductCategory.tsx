import Image from "next/image";
import Link from "next/link";
import { HomeResponse } from "../../api/types";
import { appendBaseUrl } from "../../utils";
import SectionTitle from "../SectionTitle";

type HomeProductCategory = HomeResponse["productCategory"];

export default function HomeProductCategory({
  sectionTitle,
  categoryList,
}: HomeProductCategory) {
  return (
    <section className="container m-auto">
      <SectionTitle {...sectionTitle} />
      <div className="grid grid-cols-12 gap-5 mt-[30px]">
        {categoryList.map((item) => (
          <div
            key={item.id}
            className="relative col-span-12 md:col-span-6 h-[373px] overflow-hidden group cursor-pointer"
          >
            <Image
              className="group-hover:scale-125 transition-all duration-500"
              layout="fill"
              src={appendBaseUrl(item.image.data.attributes.url)}
              objectFit="cover"
              quality={100}
              alt={item.image.data.attributes.alternativeText}
            />
            <Link href={item.link || ""}>
              <a className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20 flex justify-center items-center">
                <span className="text-white font-serif text-h1">
                  {item.title}
                </span>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
