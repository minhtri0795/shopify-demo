// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { CopyOptions } from "fs";
import {
  GetServerSideProps,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { getCopyright } from "../api";
import { CopyrightPage as CopyrightPageType } from "../api/types";

export default function CopyrightPage(
  props: InferGetStaticPropsType<typeof getServerSideProps>
) {
  return (
    <div className="max-w-[640px] m-auto">
      <h1 className="text-h3 font-serif text-center mb-10 mt-10">
        {props.title}
      </h1>
      <article
        className="text-body px-[2rem]"
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
    </div>
  );
}

export const getServerSideProps: GetStaticProps<CopyrightPageType> = async (
  ctx
) => {
  const locale = ctx.locale;
  const data = await getCopyright({ locale }); // your fetch function here

  return {
    props: {
      ...data,
    },
  };
};
