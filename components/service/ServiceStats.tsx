"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ServiceStatsProps = {
  data: {
    stats?: {
      number?: number;
      suffix?: string;
      title?: string;
    }[];
  };
  className?: string;
};

const ServiceStats = ({ data, className }: ServiceStatsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stats = data?.stats || [];
  const StarMarker = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="star-marker pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
    >
      <path
        d="M20 10L11.2728 8.72721L10 0L8.72721 8.72721L0 10L8.72721 11.2728L10 20L11.2728 11.2728L20 10Z"
        fill="white"
      />
    </svg>
  );

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Line animations
      gsap.from(".stat-line", {
        scaleX: 0,
        scaleY: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
                  },
      });

      // Star marker animations
      gsap.from(".star-marker", {
        scale: 0,
        rotate: 180,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
                  },
      });

      // Number counting animation
      const stats = gsap.utils.toArray(".stat-number");
      stats.forEach((stat: any) => {
        if (!stat) return;

        const targetValue = parseFloat(stat.getAttribute("data-value") || "0");
        const suffix = stat.getAttribute("data-suffix") || "";

        if (targetValue > 0) {
          const obj = { value: 0 };
          gsap.to(obj, {
            value: targetValue,
            duration: 2.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
                          },
            onUpdate: () => {
              stat.innerText = Math.floor(obj.value) + suffix;
            },
          });
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
    >
      <div className="relative mx-auto w-full max-w-218.5">
        {/* Central Cross Borders with Gap */}
        <div className="stat-line absolute top-0 left-1/2 hidden h-[calc(50%-20px)] w-px origin-top -translate-x-1/2 bg-white md:block" />
        <div className="stat-line absolute bottom-0 left-1/2 hidden h-[calc(50%-20px)] w-px origin-bottom -translate-x-1/2 bg-white md:block" />
        <div className="stat-line absolute top-1/2 left-0 hidden h-px w-[calc(50%-20px)] origin-left -translate-y-1/2 bg-white md:block" />
        <div className="stat-line absolute top-1/2 right-0 hidden h-px w-[calc(50%-20px)] origin-right -translate-y-1/2 bg-white md:block" />

        <div className="hidden md:block">
          <div className="absolute top-0 left-1/2">
            <StarMarker />
          </div>
          <div className="absolute bottom-0 left-1/2">
            <StarMarker />
          </div>
          <div className="absolute top-1/2 left-0">
            <StarMarker />
          </div>
          <div className="absolute top-1/2 right-0 translate-x-full">
            <StarMarker />
          </div>
        </div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col border-white py-10 md:py-12 ${
                index === 0
                  ? "items-center justify-center border-b md:items-start md:justify-end md:border-b-0 md:pt-25 md:pr-10 md:pb-12"
                  : ""
              } ${
                index === 1
                  ? "items-center justify-center border-b md:items-end md:justify-end md:border-b-0 md:pt-24 md:pb-12 md:pl-10"
                  : ""
              } ${
                index === 2
                  ? "items-center justify-center border-b md:items-start md:justify-start md:border-b-0 md:pt-12 md:pr-10 md:pb-24"
                  : ""
              } ${
                index === 3
                  ? "items-center justify-center md:items-end md:justify-start md:pt-12 md:pb-24 md:pl-10"
                  : ""
              } `}
            >
              <div
                className={`w-full ${
                  index % 2 === 1
                    ? "text-center md:text-right"
                    : "text-center md:text-left"
                }`}
              >
                <h3
                  className="stat-number font-voyage w-full text-2xl leading-[88%] text-white md:text-3xl lg:text-5xl xl:text-6xl"
                  data-value={item.number}
                  data-suffix={item.suffix}
                >
                  0{item.suffix}
                </h3>

                <h4 className="font-switzer mt-2 text-sm leading-[110%] text-white md:text-base lg:text-lg xl:text-xl">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ServiceStats;
