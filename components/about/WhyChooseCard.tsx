import { urlFor } from "@/sanity/image";
import Image from "next/image";
import React from "react";

type WhyChooseCardProps = {
  item: {
    icon?: any;
    title: string;
    description: string;
  };
};

const WhyChooseCard = ({ item }: WhyChooseCardProps) => {
  return (
    <article className="group core-value-card shadow-s3 relative flex h-80 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/40 bg-white/6 p-8 backdrop-blur-[14px] transition-all duration-700 hover:bg-white/10 sm:h-95.5 md:max-w-[384px]">
      {/* Normal State Content */}
      <div className="flex flex-col items-center transition-all duration-500 group-hover:-translate-y-10 group-hover:scale-95 group-hover:opacity-0">
        {item?.icon && (
          <Image
            src={urlFor(item.icon)
              .width(80)
              .height(80)
              .quality(80)
              .format("webp")
              .url()}
            alt={item?.title || "icon"}
            width={80}
            height={80}
            className="object-contain"
          />
        )}
        <h4 className="text-antiflash font-voyage mt-13 text-center text-3xl leading-[120%] lg:tracking-[-3px] xl:text-5xl">
          {item.title}
        </h4>
      </div>

      {/* Hover State Paragraph */}
      <div className="absolute inset-0 flex translate-y-10 items-center justify-center p-8 opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-antiflash font-switzer text-center text-lg leading-[160%] font-medium md:text-lg">
          {item.description}
        </p>
      </div>
    </article>
  );
};

export default WhyChooseCard;
