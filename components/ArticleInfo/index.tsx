import Link from "next/link";
import { ListArticle } from "../../api/types";

type ArticleInfo = {
  category: ListArticle["category"];
  slug: ListArticle["slug"];
  description: ListArticle["description"];
  title: ListArticle["title"];
};

export default function ArticleInfo({
  category,
  slug,
  description,
  title,
}: ArticleInfo) {
  return (
    <div>
      {category?.data?.attributes && (
        <span className="text-body text-secondary">
          {category.data.attributes.label}
        </span>
      )}

      <h2 className="text-h3 leading-[121%] font-serif mt-1 mb-5">
        <Link href={`/articles/${slug}`}>
          <a className="text-black hover:text-secondary transition-colors">
            {title}
          </a>
        </Link>
      </h2>

      <p className="text-body line-clamp-3">{description}</p>
    </div>
  );
}
