import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getContactPage } from "../api";
import { ContactPage } from "../api/types";
import ArchiveLayout from "../components/ArchiveLayout";
import ContactForm from "../components/ContactForm";
import Seo from "../components/Seo";

export default function contactPage(
  props: InferGetStaticPropsType<typeof getServerSideProps>
) {
  const { archiveLayout, seo } = props;

  return (
    <div>
      {seo && <Seo {...seo} />}
      <ArchiveLayout {...archiveLayout}>
        <ContactForm />
      </ArchiveLayout>
    </div>
  );
}

export const getServerSideProps: GetStaticProps<ContactPage> = async (ctx) => {
  const locale = ctx.locale;
  const { archiveLayout, seo } = await getContactPage({ locale }); // your fetch function here

  return {
    props: {
      archiveLayout,
      seo,
    },
  };
};
