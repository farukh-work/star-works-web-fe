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
        <span className="font-switzer text-[15px] leading-none font-semibold tracking-[0.12em] text-black uppercase select-none sm:text-[18px]">
          {feature}
        </span>
        <SparkleStar />
      </div>
    ));

  return (
    <section className="relative w-full overflow-hidden bg-primary py-4 sm:py-5">
      {/* Custom CSS for continuous hardware-accelerated scroll */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee-scroll-left {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-50%, 0, 0); }
            }
            .animate-scroll-left {
              animation: marquee-scroll-left 60s linear infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .animate-scroll-left { animation: none; }
            }
          `,
        }}
      />
      <div className="animate-scroll-left flex w-max gap-8 whitespace-nowrap sm:gap-12">
        <div className="flex shrink-0 items-center gap-8 sm:gap-12">
          {renderItems()}
        </div>
        <div className="flex shrink-0 items-center gap-8 sm:gap-12" aria-hidden="true">
          {renderItems()}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
