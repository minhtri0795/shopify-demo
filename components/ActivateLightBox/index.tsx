import GLightBox from "glightbox";
import { RefObject, useEffect } from "react";

export default function ActivateLightBox({
  contentRef,
}: {
  contentRef: RefObject<HTMLDivElement>;
}) {
  useEffect(() => {
    const images = contentRef.current?.querySelectorAll("img");

    images?.forEach((image) => {
      const wrapperElement = document.createElement("a");
      wrapperElement.classList.add("glightbox");
      wrapperElement.href = image.src;
      image.parentElement?.insertBefore(wrapperElement, image);
      wrapperElement.appendChild(image);
    });

    const lightBox = GLightBox({
      selector: ".glightbox",
    });
  }, []);

  return <></>;
}
