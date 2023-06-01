import Image from "next/image";
import { Media } from "../../api/types";
import { appendBaseUrl, nl2br } from "../../utils";
import DecorateLine from "../DecorateLine";

type ArchiveBannerProps = {
  title: string;
  subtitle?: string;
  description?: string;
  banner?: { data: Media };
};

export default function ArchiveBanner({
  title,
  subtitle,
  description,
  banner,
}: ArchiveBannerProps) {
  return (
    <header>
      <div className="relative">
        <div className="relative w-full h-[300px] md:h-[500px]">
          {banner && banner.data && (
            <Image
              src={appendBaseUrl(banner.data.attributes.url)}
              layout="fill"
              objectFit="cover"
              quality={100}
              alt={banner.data.attributes.alternativeText}
            />
          )}
          <DecorateLine
            type={1}
            className="z-10 absolute -bottom-20 right-[30px]"
          />
        </div>
        <div className="container lg:px-0 static w-full lg:absolute lg:block justify-end z-10 bg-white lg:w-1/2 left-0 -bottom-[9em]">
          <div className="lg:mr-[120px] py-7 lg:py-14 lg:ml-[calc((100vw-1040px)/2)]">
            <span className="text-secondary text-subtitle">{subtitle}</span>
            <h1
              dangerouslySetInnerHTML={{ __html: nl2br(title) }}
              className="font-serif text-categoryTitle mt-4 mb-6"
            />
            {description && (
              <p
                className="text-body"
                dangerouslySetInnerHTML={{ __html: nl2br(description) }}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
