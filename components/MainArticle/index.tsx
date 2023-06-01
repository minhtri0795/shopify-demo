import Image from "next/image";
import { ListArticle } from "../../api/types";
import { appendBaseUrl } from "../../utils";
import ArticleInfo from "../ArticleInfo";

type MainArticle = ListArticle;

export default function MainArticle(props: ListArticle) {
  return (
    <div className="w-full flex flex-col-reverse md:flex-row gap-10 md:gap-20 h-[500px] items-center">
      <div className="w-full px-[2rem] md:px-0 md:w-[42%]">
        <ArticleInfo
          title={props.title}
          description={props.description}
          category={props.category}
          slug={props.slug}
        />
      </div>
      <div className="w-full md:w-[58%] relative h-[50%] md:h-[100%]">
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
    </div>
  );
}
