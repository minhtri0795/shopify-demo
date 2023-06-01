import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getTeaCategories, getTeaCategoryBySlug } from "../../api";
import { StrapiEntry, TeaCategory, WithDateInfo } from "../../api/types";
import CategoryPage from "../../components/CategoryPage";
import Seo from "../../components/Seo";

export default function SingleCategory(
  props: InferGetStaticPropsType<typeof getServerSideProps>
) {
  return (
    <>
      {props.seo && <Seo {...props.seo} />}
      <CategoryPage teaCategory={props.slug} {...props} />
    </>
  );
}

// export const getStaticPaths: GetStaticPaths = async (ctx) => {
//   const locales = ctx.locales as string[];
//   const data: StrapiEntry<TeaCategory>[] = [];
//   // const data = await getTeaCategories();

//   const fetchers = locales.map(async (locale) => {
//     const entries = await getTeaCategories({ locale });
//     entries.forEach((entry) => {
//       data.push(entry);
//     });
//   });

//   await Promise.all(fetchers);

//   const paths = data.map((entry) => ({
//     params: {
//       slug: entry.attributes.slug,
//     },
//     locale:
//       entry.attributes.locale === "zh-Hant" ? "zh" : entry.attributes.locale,
//   }));

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

export const getServerSideProps: GetStaticProps<
  WithDateInfo<TeaCategory>,
  { slug: string }
> = async ({ params, locale }) => {
  const { slug } = params!;
  const data = await getTeaCategoryBySlug(slug, { locale });

  if (data.length === 0) {
    return {
      notFound: true,
    };
  }

  const detailProduct = data[0].attributes;

  return {
    props: {
      ...detailProduct,
    },
  };
};
