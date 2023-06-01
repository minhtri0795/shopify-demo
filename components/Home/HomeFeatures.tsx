import Image from "next/image";
import { HomeResponse } from "../../api/types";
import { appendBaseUrl } from "../../utils";

type HomeFeaturesProps = HomeResponse["features"];

export default function HomeFeatures({
  featureList,
  image,
}: HomeFeaturesProps) {
  return (
    <section className="flex flex-wrap gap-10 md:flex-nowrap md:gap-20">
      <div className="relative w-full md:w-[585px] h-[289px]">
        <Image
          src={appendBaseUrl(image.data.attributes.url)}
          layout="fill"
          objectFit="cover"
          alt={image.data.attributes.alternativeText}
        />
      </div>
      <ul className="container md:px-0 gap-5 md:gap-0 flex flex-col justify-between py-[30px]">
        {featureList.map((item) => (
          <li key={item.id}>
            <h3 className="font-bold font-sans text-body mb-1">{item.title}</h3>
            <span>{item.content}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
