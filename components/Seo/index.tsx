import Head from "next/head";
import { useRouter } from "next/router";
import { SEO } from "../../api/types";

export default function Seo(props: SEO) {
  const router = useRouter();

  const url = process.env.NEXT_PUBLIC_URL + router.asPath;

  const facebookSocial = props.metaSocial?.find(
    (social) => social.socialNetwork === "Facebook"
  );

  const twitterSocial = props.metaSocial?.find(
    (social) => social.socialNetwork === "Twitter"
  );

  return (
    <Head>
      <title>{props.metaTitle || "Page"}</title>
      <meta
        name="description"
        content={props.metaDescription}
        key="description"
      />
      <meta name="keywords" content={props.keywords} />
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      {facebookSocial && (
        <>
          <meta property="og:url" content={url} key="og:url" />
          {facebookSocial.title && (
            <meta
              property="og:title"
              content={facebookSocial.title}
              key="og:title"
            />
          )}
          {facebookSocial.description && (
            <meta
              property="og:description"
              content={facebookSocial.description}
              key="og:description"
            />
          )}
          {facebookSocial.image && (
            <meta
              property="og:image"
              content={
                process.env.NEXT_PUBLIC_URL +
                facebookSocial.image?.data?.attributes.url
              }
              key="og:image"
            />
          )}
        </>
      )}
      <link rel="canonical" href={url} />
    </Head>
  );
}
