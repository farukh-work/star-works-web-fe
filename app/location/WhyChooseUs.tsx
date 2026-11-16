import React from "react";
import { whyChooseUsData } from "@/components/common/Helper";

interface WhyChooseUsProps {
  data?: {
    tag?: string;
    heading?: string;
    items?: Array<{
      icon?: string;
      title?: string;
      description?: string;
    }>;
  };
}

const WhyChooseUs = ({ data }: WhyChooseUsProps) => {
  const tag = data?.tag || "--WHY CHOOSE US";
  const heading = data?.heading || "Why [ Hisar ] Businesses Choose Star Works";
  const itemsList = data?.items || whyChooseUsData;

  return (
    <section className="px-4">
      <div className="container-wrapper px-0!">
        <h5 className="font-voyage text-antiflash mb-6 w-full text-center text-2xl leading-[100%]! md:text-3xl xl:text-4xl">
          {tag}
        </h5>
        <h3 className="font-voyage text-antiflash w-full gap-2 text-center text-5xl leading-[120%]! capitalize xl:text-6xl">
          {heading}
        </h3>
        <div className="mt-10 flex w-full flex-wrap justify-center gap-6 md:mt-16 lg:flex-nowrap">
          {itemsList.map((item, index) => (
            <article
              key={index}
              className="group core-value-card shadow-s3 relative flex h-80 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/40 bg-white/6 p-8 backdrop-blur-[14px] transition-all duration-700 hover:bg-white/10 sm:h-95.5 md:max-w-[384px]"
            >
              {/* Normal State Content */}
              <div className="flex flex-col items-center transition-all duration-500 group-hover:-translate-y-10 group-hover:scale-95 group-hover:opacity-0">
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={item.title || "icon"}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
