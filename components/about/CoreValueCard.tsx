import { urlFor } from "@/sanity/image";
import Image from "next/image";
import React from "react";
interface CoreValueCardProps {
  item: {
    icon?: any;
    title?: string;
    description?: string;
  };
}

const CoreValueCard = ({ item }: CoreValueCardProps) => {
  return (
    <div className="shadow-s3 rounded-3xl border border-white/40 bg-white/6 p-4">
      {item?.icon && (
        <Image
          className="aspect-square w-full max-w-11 object-cover"
          src={urlFor(item.icon)
            .width(44)
            .height(44)
            .quality(80)
            .format("webp")
            .url()}
          alt={item?.title || "icon"}
          width={44}
          height={44}
        />
      )}

      <h3 className="text-antiflash font-voyage mt-2 text-3xl leading-[120%] lg:tracking-[-3px] xl:text-[44px]">
        {item?.title}
      </h3>

      <p className="text-antiflash mt-1.5 text-sm leading-[160%] lg:text-base">
        {item?.description}
      </p>
    </div>
  );
};

export default CoreValueCard;
