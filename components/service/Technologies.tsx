"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef } from "react";

import SectionHeading from "../common/SectionHeading";

type Technology = {
  title: string;
  image: string;
};

type TechnologiesSectionData = {
  sectionHeading: string;
  technologies: Technology[];
};

type Props = {
  data: TechnologiesSectionData;
};

const Technologies: React.FC<Props> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const technologies = useMemo(() => {
    return data?.technologies || [];
  }, [data]);

  useEffect(() => {
    let ctx: any;

    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;

      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current) return;

      ctx = gsap.context(() => {
        // Heading Animation
        gsap.from(".technologies-heading", {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".technologies-heading",
                        toggleActions: "play none none reverse",
          },
        });

        const items = gsap.utils.toArray<HTMLElement>(".tech-item");
        const mm = gsap.matchMedia();

        const desktopOffsets = [
          { x: 0, y: 0 },
          { x: 20, y: 40 },
          { x: 40, y: 70 },
          { x: 60, y: 30 },
          { x: 30, y: 90 },
          { x: 40, y: 10 },
        ];

        const mobileOffsets = [
          { x: 0, y: 0 },
          { x: 5, y: 10 },
          { x: -5, y: 15 },
          { x: 10, y: 5 },
          { x: -8, y: 12 },
          { x: 6, y: 8 },
        ];

        mm.add(
          {
            isMobile: "(max-width: 767px)",
            isDesktop: "(min-width: 768px)",
          },
          (context) => {
            const { isMobile } = context?.conditions as { isMobile: boolean };
            const offsets = isMobile ? mobileOffsets : desktopOffsets;

            gsap.fromTo(
              items,
              {
                y: isMobile ? 60 : 120,
                opacity: 0,
                scale: 0.92,
              },
              {
                y: (index) => offsets[index % offsets.length].y,
                x: (index) => offsets[index % offsets.length].x,

                opacity: 1,
                scale: 1,

                duration: isMobile ? 0.8 : 1,
                stagger: 0.08,

                ease: "power3.out",

                scrollTrigger: {
                  trigger: containerRef.current,
                                    toggleActions: "play none none none",
                  once: true,
                },
              },
            );
          },
        );
      }, containerRef);
    };

    initGSAP();

    return () => {
      ctx?.revert();
    };
  }, []);

  if (!technologies.length) return null;

  return (
    <section className="section-spacing-top mx-auto w-full max-w-348 px-4">
      <div className="bg-english overflow-hidden rounded-2xl px-4 pt-10 pb-20 md:pt-24 md:pb-36 xl:rounded-3xl">
        <div className="technologies-heading">
          <SectionHeading className="w-full text-center">
            {data.sectionHeading}
          </SectionHeading>
        </div>

        <div
          ref={containerRef}
          className="flex flex-wrap justify-center gap-8 pt-8"
        >
          {technologies.map((item, index) => (
            <div key={index} className="tech-item group relative">
              <Image
                className="aspect-square w-full max-w-14 cursor-pointer object-cover md:max-w-16 lg:max-w-20 xl:max-w-25"
                width={100}
                height={100}
                loading="lazy"
                src={item.image}
                alt={item.title}
              />

              <div className="font-voyage text-refreshBlack pointer-events-none absolute top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 scale-75 rounded-full bg-white px-8 py-2 text-2xl leading-[120%] whitespace-nowrap opacity-0 duration-300 ease-out group-hover:scale-100 group-hover:opacity-100">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
