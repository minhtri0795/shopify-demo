import Image from "next/image";
import { HomeResponse } from "../../api/types";
import { appendBaseUrl, nl2br } from "../../utils";
import DecorateLine from "../DecorateLine";
import SectionTitle from "../SectionTitle";

type HomeIntroductionProps = HomeResponse["introduction"];

export default function HomeIntroduction({
  sectionTitle,
  content,
  image,
}: HomeIntroductionProps) {
  return (
    <section className="w-full relative">
      <div className="container m-auto text-center">
        <SectionTitle {...sectionTitle} />
        <div
          className="text-center text-body font-sans mt-[46px] mb-[90px]"
          dangerouslySetInnerHTML={{ __html: nl2br(content) }}
        />
        <div className="relative">
          <Image
            src={appendBaseUrl(image.data.attributes.url)}
            width={720}
            height={301}
            objectFit="cover"
            quality={100}
            alt={image.data.attributes.alternativeText}
          />
          <DecorateLine type={2} className="absolute top-20 left-0" />
          <DecorateLine type={2} className="absolute top-16 right-0" />
          <DecorateLine type={2} className="absolute bottom-20 right-[120px]" />
        </div>
      </div>
    </section>
  );
}
