import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ButtonArrowIcon } from "./Icons";

const ServicesCard = ({ slide }: { slide: any }) => {
  return (
    <Link
      href={`/services/${slide.slug?.current}`}
      className="shadow-card-heavy group relative flex aspect-4/5 w-[85vw] flex-none items-end overflow-hidden rounded-xl sm:w-[60vw] md:rounded-2xl lg:w-[38vw] xl:w-[25vw]"
    >
      <Image
        src={slide.image || ""}
        alt={slide.title || "service-image"}
        fill
        loading="lazy"
        sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 38vw, 25vw"
        className="absolute top-0 left-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="bg-card-gradient relative z-20 flex w-full items-center justify-between gap-6 px-4 pt-35.25 pb-5">
        <h4 className="font-voyage text-[40px] leading-[90%] text-white lg:text-5xl">
          {slide.title}
        </h4>

        <span className="bg-greenGlass group/btn flex size-12 flex-none cursor-pointer items-center justify-center rounded-full p-1.5 transition-colors hover:bg-white">
          <ButtonArrowIcon className="w-full transition-transform duration-300 group-hover/btn:rotate-45" />
        </span>
      </div>
    </Link>
  );
};

export default ServicesCard;
