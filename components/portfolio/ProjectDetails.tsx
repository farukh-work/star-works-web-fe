"use client";

import Image from "next/image";
import React, { useRef } from "react";
import SectionHeading from "../common/SectionHeading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ProjectDetailsProps = {
  data: {
    image: string;
    overview: {
      label: string;
      value: string;
    }[];
    heading: string;
    description: string[];
  };
};

const ProjectDetails = ({ data }: ProjectDetailsProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Heading Entrance
      gsap.from(".project-details-heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".project-details-heading",
                    toggleActions: "play none none reverse",
        },
      });

      // Description Entrance
      gsap.from(".project-details-description", {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".project-details-description",
                    toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  if (!data) return null;

  return (
    <section ref={containerRef} className="container-wrapper section-spacing">
      {data.image && (
        <Image
          className="h-fit max-h-125 rounded-2xl object-cover md:rounded-2xl xl:rounded-3xl"
          src={data.image}
          alt={data.heading || "Project details image"}
          width={1200}
          height={500}
          priority={true}
          unoptimized={true}
        />
      )}
      <div className="mt-14 flex flex-col gap-10 md:flex-row md:justify-between">
        {/* Animated vertical divider */}
        <style>{`
          @keyframes dash-scroll {
            from { background-position: 0 0; }
            to   { background-position: 0 14px; }
          }
          .animated-divider {
            background: repeating-linear-gradient(
              to bottom,
              rgba(38, 240, 119, 0.4) 0px,
              rgba(38, 240, 119, 0.4) 6px,
              transparent 6px,
              transparent 14px
            );
            background-size: 1px 14px;
            animation: dash-scroll 0.55s linear infinite;
          }
        `}</style>

        {/* LEFT */}
        {data.overview && data.overview.length > 0 && (
          <div className="w-full max-w-fit pr-10 lg:max-w-102.5">
            <div className="flex h-full flex-col justify-between gap-4">
              {data.overview.map((item, index) => (
                <div key={index}>
                  <p className="text-antiflash font-switzer text-sm uppercase">
                    {item?.label}
                  </p>

                  <h3 className="mt-2 text-sm font-semibold text-white uppercase">
                    {Array.isArray(item?.value)
                      ? item.value.join(" • ")
                      : item?.value}
                  </h3>
                </div>
              ))}

              {/* Decorative animated wavy line — fills empty space on large screens */}
              <div className="hidden md:block" aria-hidden="true">
                <style>{`
                  @keyframes wave-flow {
                    0%   { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -40; }
                  }
                  .wavy-animated {
                    stroke-dasharray: 12 8;
                    animation: wave-flow 1.4s linear infinite;
                  }
                `}</style>
                <svg
                  viewBox="0 0 220 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full max-w-[220px] opacity-40"
                >
                  <path
                    className="wavy-animated"
                    d="M2 18 C20 4, 40 32, 60 18 S100 4, 120 18 S160 32, 180 18 S210 4, 218 10"
                    stroke="#26f077"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Animated vertical divider — hidden on mobile */}
        <div className="hidden self-stretch md:block">
          <div className="animated-divider h-full w-px" />
        </div>

        {/* RIGHT */}
        <div className="w-full md:max-w-175">
          {data.heading && (
            <div className="project-details-heading">
              <SectionHeading className="font-voyage">
                {data.heading}
              </SectionHeading>
            </div>
          )}

          <div className="project-details-description mt-8 space-y-6 text-sm leading-[190%] text-white/60 md:text-base">
            {data.description?.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
