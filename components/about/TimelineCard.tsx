import { urlFor } from "@/sanity/image";
import Image from "next/image";
import React from "react";
interface TimelineCardProps {
  isEven: boolean;
  event: {
    year: string;
    title: string;
    description: string;
    image?: any;
  };
}

const TimelineCard = ({ isEven, event }: TimelineCardProps) => {
  return (
    <article className="timeline-item timeline-item-container">
      {/* Year Heading */}
      <h2 className="timeline-year text-antiflash lg:text-7 font-voyage my-4 w-full text-center text-5xl leading-none tracking-tighter sm:text-6xl md:my-8">
        {event.year}
      </h2>

      {/* Content Row */}
      <div className="flex w-full flex-col items-center gap-8 md:flex-row md:items-stretch xl:gap-14">
        {/* Image Section */}
        <div
          className={`timeline-image timeline-image-wrapper order-1 md:mt-20 ${
            isEven ? "md:justify-end" : "md:order-3 md:justify-start"
          }`}
        >
          <div className="bg-antiflash/10 group relative aspect-square w-full h-80 max-w-[440px] overflow-hidden rounded-xl">
            {event?.image && (
              <Image
                src={urlFor(event.image)
                  .width(400)
                  .height(400)
                  .quality(80)
                  .format("webp")
                  .url()}
                alt={event?.title || "timeline-image"}
                fill
                className="timeline-img object-cover opacity-90 transition-transform duration-700"
              />
            )}
          </div>
        </div>

        {/* Center Line */}
        <div className="relative order-2 hidden flex-col items-center md:flex">
          <div className="timeline-dot bg-antiflash z-10 h-2 w-2 rounded-full" />
          <div className="timeline-line from-antiflash via-antiflash h-full w-px bg-linear-to-b to-transparent" />
        </div>

        {/* Text Section */}
        <div
          className={`timeline-content timeline-text-wrapper order-3 text-center ${
            isEven
              ? "items-center md:items-start md:text-left"
              : "items-center md:order-1 md:items-end md:text-right"
          }`}
        >
          <h4
            className={`text-antiflash font-voyage mb-4 text-3xl leading-[120%] tracking-[-1px] sm:text-4xl md:tracking-[-3px] ${
              !isEven ? "w-full md:text-right" : ""
            }`}
          >
            {event.title}
          </h4>

          <p
            className={`font-switzer text-antiflash/70 line-clamp-2 max-w-lg text-sm leading-[160%] font-medium sm:text-base md:text-lg ${
              isEven
                ? "mx-auto md:mx-0"
                : "mx-auto md:mr-0 md:ml-auto md:text-right"
            }`}
          >
            {event.description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default TimelineCard;
