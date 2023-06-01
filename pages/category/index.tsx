import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getCategoryPage } from "../../api";
import { CategoryPageResponse } from "../../api/types";
import CategoryPage from "../../components/CategoryPage";
import Seo from "../../components/Seo";

export default function Category(
  props: InferGetStaticPropsType<typeof getServerSideProps>
) {
  return (
    <>
      {props.seo && <Seo {...props.seo} />}
      <CategoryPage {...props} />
    </>
  );
}

export const getServerSideProps: GetStaticProps<CategoryPageResponse> = async (
  ctx
) => {
  const locale = ctx.locale;
  const { title, subtitle, banner, description, seo } = await getCategoryPage({
    locale,
  });

  return {
    props: {
      title,
      subtitle,
      banner,
      description,
      seo,
    },
  };
};
