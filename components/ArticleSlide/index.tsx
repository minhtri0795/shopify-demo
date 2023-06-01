import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance, Navigation } from "swiper";
import { ListArticle, StrapiEntry } from "../../api/types";
import MainArticle from "../MainArticle";

type ArticleSliderProps = {
  articles: StrapiEntry<ListArticle>[];
};

const NavigationButton = ({
  type,
  onClick,
}: {
  type: "next" | "prev";
  onClick: () => void;
}) => {
  const buttonClass =
    "absolute fill-[#A4A4A4] hover:fill-secondary transition-colors";

  if (type === "next")
    return (
      <button
        className={`rotate-180 top-[50%] right-[10px] md:right-[42px] ${buttonClass}`}
        onClick={onClick}
      >
        <svg
          width="15"
          height="24"
          viewBox="0 0 15 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.41233 12L14.5 22.051L12.5438 24L0.499999 12L12.5438 1.73634e-06L14.5 1.94905L4.41233 12Z"
          />
        </svg>
      </button>
    );

  return (
    <button
      className={`absolute top-[50%] left-[10px] md:left-[42px] ${buttonClass}`}
      onClick={onClick}
    >
      <svg
        width="15"
        height="24"
        viewBox="0 0 15 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.41233 12L14.5 22.051L12.5438 24L0.499999 12L12.5438 1.73634e-06L14.5 1.94905L4.41233 12Z"
        />
      </svg>
    </button>
  );
};

export default function ArticleSlider({ articles }: ArticleSliderProps) {
  const swiperRef = useRef<SwiperInstance>();

  const onNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const onPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <div className="article-slide relative w-full">
      <div className="mx-[40px] md:mx-[143px]">
        <Swiper
          className="pb-10"
          modules={[Navigation]}
          pagination={true}
          spaceBetween={50}
          slidesPerView={1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {articles.map((article) => (
            <SwiperSlide key={article.id}>
              <MainArticle {...article.attributes} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="">
        <NavigationButton type="prev" onClick={onPrev} />
        <NavigationButton type="next" onClick={onNext} />
      </div>
    </div>
  );
}
