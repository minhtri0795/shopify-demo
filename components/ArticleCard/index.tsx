import format from "date-fns/format";
import Image from "next/image";
import Link from "next/link";
import { ListArticle, WithDateInfo } from "../../api/types";
import { appendBaseUrl } from "../../utils";
import ArticleInfo from "../ArticleInfo";

type ArticleCardProps = WithDateInfo<ListArticle> & {
  layoutType?: "horizontal" | "vertical";
};

export default function ArticleCard(props: ArticleCardProps) {
  const layoutType = props.layoutType || "horizontal";

  if (layoutType === "horizontal") {
    return (
      <div className="flex flex-col md:flex-row gap-5 md:gap-10">
        <div className="relative w-full md:w-[44%] aspect-[460/345]">
          {props.banner?.data?.attributes ? (
            <Image
              src={appendBaseUrl(props.banner.data.attributes.url)}
              alt={props.banner.data.attributes.alternativeText}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          ) : (
            <div className="w-full h-full bg-gray-400" />
          )}
        </div>
        <div className="my-3 flex flex-col justify-between md:w-[56%]">
          <ArticleInfo
            title={props.title}
            category={props.category}
            description={props.description}
            slug={props.slug}
          />

          <span>By {props.arthor}</span>
        </div>
      </div>
    );
  }

  // Vertical Layout
  return (
    <div>
      <div className="relative w-full h-[273px]">
        {props.banner && (
          <Image
            src={appendBaseUrl(props.banner.data.attributes.url)}
            alt={props.banner.data.attributes.alternativeText}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        )}
      </div>
      <div className="mx-[38px] mt-[15px]">
        <span className="block text-secondary text-body">
          {format(new Date(props.createdAt), "yyyy/MM/dd")}
        </span>
        <div className="my-[15px]">
          <span className="block text-secondary text-subtitle">
            {props.category?.data?.attributes.label}
          </span>
          <h2 className="text-h4 font-serif">
            <Link href={`/articles/${props.slug}`}>
              <a className="text-black hover:text-secondary transition-colors">
                {props.title}
              </a>
            </Link>
          </h2>
        </div>
        <p className="text-body line-clamp-3 mb-[15px]">{props.description}</p>
        <span className="text-subtitle text-[#828282]">{props.arthor}</span>
      </div>
    </div>
  );
}
