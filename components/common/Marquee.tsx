"use client";

import React from "react";

interface MarqueeProps {
  features: string[];
}

const SparkleStar = ({
  className = "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white shrink-0",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M50 0 C50 35, 65 50, 100 50 C65 50, 50 65, 50 100 C50 65, 35 50, 0 50 C35 50, 50 35, 50 0 Z"
      fill="currentColor"
    />
  </svg>
);

const Marquee = ({ features = [] }: MarqueeProps) => {
  const safeFeatures =
    features.length > 0
      ? features
      : [
          "Branding",
          "Designing",
          "Development",
          "E-Commerce",
          "Marketing",
          "Animation",
        ];

  // Repeat features to ensure they overflow the viewport width
  const displayFeatures = [
    ...safeFeatures,
    ...safeFeatures,
    ...safeFeatures,
    ...safeFeatures,
  ];

  const renderItems = () =>
    displayFeatures.map((feature, index) => (
      <div key={index} className="flex shrink-0 items-center gap-6 sm:gap-10">
        <span className="font-switzer text-[20px] leading-none font-bold tracking-wide text-black uppercase select-none sm:text-[28px] md:text-[34px] lg:text-[40px]">
          {feature}
        </span>
        <SparkleStar />
      </div>
    ));

  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden py-12 sm:py-16 md:py-24 lg:py-28">
      {/* Custom CSS for continuous hardware-accelerated scroll */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee-scroll-left {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-50%, 0, 0); }
            }
            @keyframes marquee-scroll-right {
              0% { transform: translate3d(-50%, 0, 0); }
              100% { transform: translate3d(0, 0, 0); }
            }
            .animate-scroll-left {
              animation: marquee-scroll-left 80s linear infinite;
            }
            .animate-scroll-right {
              animation: marquee-scroll-right 80s linear infinite;
            }
          `,
        }}
      />

      {/* Row 1: Tilted Upwards, scrolls Left */}
      <div className="bg-primary absolute left-[-15vw] z-10 flex w-[130vw] -rotate-4 overflow-hidden border-y border-black/10 py-3 whitespace-nowrap shadow-[0_10px_30px_rgba(0,0,0,0.15)] sm:py-4">
        <div className="animate-scroll-left flex gap-6 whitespace-nowrap sm:gap-10">
          <div className="flex shrink-0 items-center gap-6 sm:gap-10">
            {renderItems()}
          </div>
          <div
            className="flex shrink-0 items-center gap-6 sm:gap-10"
            aria-hidden="true"
          >
            {renderItems()}
          </div>
        </div>
      </div>

      {/* Row 2: Tilted Downwards, scrolls Right */}
      <div className="bg-primary absolute left-[-15vw] z-20 flex w-[130vw] rotate-4 overflow-hidden border-y border-black/10 py-3 whitespace-nowrap shadow-[0_10px_30px_rgba(0,0,0,0.15)] sm:py-4">
        <div className="animate-scroll-right flex gap-6 whitespace-nowrap sm:gap-10">
          <div className="flex shrink-0 items-center gap-6 sm:gap-10">
            {renderItems()}
          </div>
          <div
            className="flex shrink-0 items-center gap-6 sm:gap-10"
            aria-hidden="true"
          >
            {renderItems()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
