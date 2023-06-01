import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import { styled } from "@stitches/react";
import { appendBaseUrl } from "../../utils";
import { HomeResponse } from "../../api/types";
import DecorateLine from "../DecorateLine";

const VerticalBannerText = styled("div", {
  writingMode: "vertical-rl",
  textOrientation: "upright",
});

type HomeBannerProps = HomeResponse["banner"];

export default function HomeBanner({
  textTop,
  textBottom,
  image,
}: HomeBannerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const animation = useAnimation();

  useEffect(() => {
    if (!isInView) return;

    animation.start((i) => ({
      opacity: 1,
      y: 0,
      transform: "translateY(0px)",
      transition: {
        duration: 1,
        delay: i * 1,
      },
    }));
  }, [animation, isInView]);

  return (
    <motion.div
      ref={ref}
      custom={0}
      initial={{ opacity: 0, y: -20 }}
      animate={animation}
      viewport={{ once: true }}
      className="bg-white relative h-[500px] overflow-hidden"
    >
      <Image
        className="z-0"
        src={appendBaseUrl(image.data.attributes.url)}
        layout="fill"
        objectFit="cover"
        quality={100}
        alt={image.data.attributes.alternativeText}
      />
      <div className="w-full left-10 md:left-0 md:max-w-[840px] relative md:m-auto h-full">
        <VerticalBannerText
          as={motion.div}
          custom={1}
          initial={{ opacity: 0, y: -20 }}
          animate={animation}
          className="z-10 absolute top-[50px] tracking-[4px] font-serif text-[24px]"
        >
          {textTop}
        </VerticalBannerText>
        <VerticalBannerText
          as={motion.div}
          custom={2}
          initial={{ opacity: 0, y: -20 }}
          animate={animation}
          className="z-10 absolute left-10 bottom-[80px] tracking-[4px] font-serif text-[24px]"
        >
          {textBottom}
        </VerticalBannerText>
      </div>
    </motion.div>
  );
}
