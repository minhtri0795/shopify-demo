import { HomeResponse } from "../../api/types";
import ArticleCard from "../ArticleCard";
import SectionTitle from "../SectionTitle";

type HomeArticlesProps = HomeResponse["homeArticles"];

export default function HomeArticles(props: HomeArticlesProps) {
  const { sectionTitle, articles } = props;

  return (
    <div>
      <div>
        <SectionTitle {...sectionTitle} />
      </div>
      <div className="grid grid-cols-4 gap-10 md:gap-0 md:grid-cols-12 mt-10">
        {articles.map((article) => (
          <div className="col-span-4" key={article.id}>
            {article.rec.data && (
              <ArticleCard
                layoutType="vertical"
                {...article.rec.data.attributes}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
