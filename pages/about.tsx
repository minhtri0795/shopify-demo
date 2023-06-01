import Image from "next/image";
import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import ArchiveLayout from "../components/ArchiveLayout";
import { getAboutPage } from "../api";
import { AboutPage } from "../api/types";
import { appendBaseUrl, nl2br } from "../utils";
import Spacing from "../components/Spacing";
import Seo from "../components/Seo";
import DecorateLine from "../components/DecorateLine";

const ImageText = (props: AboutPage["imageText1"]) => {
  return (
    <div className="md:grid grid-cols-12 gap-[73px] items-center">
      <div className="col-span-7 relative h-[289px] mb-10 md:mb-0">
        {props.image && (
          <Image
            src={appendBaseUrl(props.image?.data.attributes.url)}
            layout="fill"
            objectFit="cover"
            alt={props.image?.data.attributes.alternativeText}
          />
        )}
      </div>
      <div className="col-span-4 md:col-span-5">
        <h3
          className="font-bold mb-5"
          dangerouslySetInnerHTML={{
            __html: nl2br(props.title || ""),
          }}
        />
        <p
          className="text-body"
          dangerouslySetInnerHTML={{
            __html: nl2br(props.description || ""),
          }}
        ></p>
      </div>
    </div>
  );
};

const SmallImageText = (props: AboutPage["imageText1"]) => {
  return (
    <div className="md:mx-[100px] md:grid grid-cols-12 gap-[73px] items-center">
      <div className="col-span-12 md:col-span-5 mb-10 md:mb-0">
        <h3
          className="font-bold mb-5"
          dangerouslySetInnerHTML={{
            __html: nl2br(props.title || ""),
          }}
        />
        <p
          className="text-body"
          dangerouslySetInnerHTML={{
            __html: nl2br(props.description || ""),
          }}
        ></p>
      </div>
      <div className="col-span-12 md:col-span-7 relative h-[289px]">
        {props.image && (
          <Image
            src={appendBaseUrl(props.image?.data.attributes.url)}
            layout="fill"
            objectFit="cover"
            alt={props.image?.data.attributes.alternativeText}
          />
        )}
      </div>
    </div>
  );
};

const About = (props: InferGetStaticPropsType<typeof getServerSideProps>) => {
  return (
    <>
      {props.seo && <Seo {...props.seo} />}
      <ArchiveLayout
        title={props.aboutHeader.title || ""}
        subtitle={props.aboutHeader.subtitle}
        banner={props.aboutHeader.banner}
      >
        <div className="container m-auto">
          <div className="md:grid grid-cols-12">
            <p
              className="col-span-6 text-body"
              dangerouslySetInnerHTML={{
                __html: nl2br(props.paragraph.left || ""),
              }}
            />
            <Spacing className="block md:hidden h-[40px]" />
            <p
              className="col-span-6 text-body"
              dangerouslySetInnerHTML={{
                __html: nl2br(props.paragraph.right || ""),
              }}
            />
          </div>
        </div>

        <Spacing className="h-[70px]" />

        <div className="w-full h-[100px] md:h-[300px] flex gap-[25px] relative">
          <div className="relative h-full w-[32.5%] flex">
            <Image
              layout="fill"
              src={appendBaseUrl(props.bannerLeft.data.attributes.url)}
              quality={100}
              objectFit="cover"
              alt={props.bannerLeft.data.attributes.alternativeText}
            />
          </div>
          <div className="relative h-full w-[45%] flex">
            <Image
              layout="fill"
              src={appendBaseUrl(props.bannerMiddle.data.attributes.url)}
              quality={100}
              objectFit="cover"
              alt={props.bannerMiddle.data.attributes.alternativeText}
            />
          </div>
          <div className="relative h-full w-[32.5%] flex">
            <Image
              layout="fill"
              src={appendBaseUrl(props.bannerRight.data.attributes.url)}
              quality={100}
              objectFit="cover"
              alt={props.bannerRight.data.attributes.alternativeText}
            />
          </div>
          <DecorateLine type={2} className="absolute right-[87px] -bottom-8" />
        </div>

        <Spacing className="h-[65px] md:h-[130px]" />

        <div className="container m-auto relative">
          <DecorateLine type={2} className="absolute -left-8" />
          <div className="max-w-[717px] m-auto">
            <h2 className="font-serif text-h3 leading-[2.125rem] mb-[34px]">
              {props.description1.title}
            </h2>
            <p
              className="text-body"
              dangerouslySetInnerHTML={{
                __html: nl2br(props.description1.description || ""),
              }}
            />
          </div>

          <Spacing className="h-[130px]" />

          <ImageText {...props.imageText1} />

          <Spacing className="h-[120px]" />

          <SmallImageText {...props.imageText2} />
        </div>

        <Spacing className="h-[130px]" />
        <div className="flex justify-end">
          <DecorateLine type={3} />
        </div>

        <div className="relative h-[300px] w-full">
          {props.bannerText.banner && (
            <Image
              layout="fill"
              src={appendBaseUrl(props.bannerText.banner.data.attributes.url)}
              quality={100}
              objectFit="cover"
              alt={props.bannerText.banner?.data.attributes.alternativeText}
            />
          )}
        </div>

        <div className="container m-auto relative">
          <div className="bg-white md:absolute -top-[7em] md:px-[85px] py-[55px] -left-[85px]">
            <h2 className="text-h3 leading-[2.125rem] font-serif mb-[34px]">
              {props.bannerText.title}
            </h2>
            <p
              className="text-body"
              dangerouslySetInnerHTML={{
                __html: nl2br(props.bannerText.description || ""),
              }}
            />
          </div>
        </div>
        <Spacing className="h-[180px]" />

        <div className="relative">
          <div className="container m-auto">
            <ImageText {...props.imageText3} />

            <Spacing className="h-[120px]" />

            <SmallImageText {...props.imageText4} />
          </div>

          <DecorateLine type={4} className="absolute left-0 bottom-[20px]" />
        </div>

        <Spacing className="h-[120px]" />

        <div className="w-full">
          {props.aboutFooter.image && props.aboutFooter.image.data && props.aboutFooter.image.data.attributes && props.aboutFooter.image.data.attributes.url && (
            <div className="w-full max-w-[1237px] md:grid grid-cols-12 items-center gap-[73px]">
              <div className="relative col-span-6 h-[300px] mb-10 md:mb-0">
                {props.aboutFooter.image && (
                  <Image
                    src={appendBaseUrl(
                      props.aboutFooter.image.data.attributes.url
                    )}
                    layout="fill"
                    objectFit="cover"
                    alt={props.aboutFooter.image.data.attributes.alternativeText}
                  />
                )}
              </div>
              <div className="px-[2rem] md:px-0 col-span-6">
                <h3 className="font-serif text-h3 mb-[34px]">
                  {props.aboutFooter.title}
                </h3>
                <p
                  className="text-body"
                  dangerouslySetInnerHTML={{
                    __html: nl2br(props.aboutFooter.description || ""),
                  }}
                ></p>
              </div>
            </div>
          )}
        </div>
      </ArchiveLayout>
    </>
  );
};

export const getServerSideProps: GetStaticProps<AboutPage> = async (ctx) => {
  const locale = ctx.locale;
  const data = await getAboutPage({ locale }); // your fetch function here

  return {
    props: { ...data },
  };
};

export default About;
