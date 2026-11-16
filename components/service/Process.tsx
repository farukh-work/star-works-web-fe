"use client";

import React, { useEffect, useMemo, useRef } from "react";

import SectionHeading from "../common/SectionHeading";
import ProcessCard from "./ProcessCard";

import Image from "next/image";

// =====================================
// TYPES
// =====================================

type ProcessCardType = {
  number: string;
  title: string;
  description: string;
  align?: "left" | "right" | "center";
};

type ProcessSectionData = {
  sectionHeading: string;
  centerImage: string;
  processCards: ProcessCardType[];
};

type Props = {
  data: ProcessSectionData;
};

// =====================================
// COMPONENT
// =====================================

const Process: React.FC<Props> = ({ data }) => {
  const imageRef = useRef<HTMLDivElement | null>(null);

  const gsapRef = useRef<typeof import("gsap").default | null>(null);

  const timelineRef = useRef<any>(null);

  // =====================================
  // DATA
  // =====================================

  const cards = data?.processCards || [];

  const leftCards = useMemo(() => {
    return cards.filter((item) => item.align === "left");
  }, [cards]);

  const rightCards = useMemo(() => {
    return cards.filter((item) => item.align === "right");
  }, [cards]);

  const centerCard = useMemo(() => {
    return cards.find((item) => item.align === "center");
  }, [cards]);

  // =====================================
  // GSAP
  // =====================================

  useEffect(() => {
    let mounted = true;

    const initGSAP = async () => {
      const gsapModule = (await import("gsap")).default;

      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsapModule.registerPlugin(ScrollTrigger);

      if (!mounted || !imageRef.current) return;

      gsapRef.current = gsapModule;

      const ctx = gsapModule.context(() => {
        // Heading Animation
        gsapModule.from(".process-heading", {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-heading",
                        toggleActions: "play none none reverse",
          },
        });

        timelineRef.current = gsapModule.fromTo(
          imageRef.current,
          {
            rotationY: -12,
            rotationX: 4,
            scale: 0.92,
            transformPerspective: 1200,
            transformOrigin: "center center",
            force3D: true,
          },
          {
            rotationY: 0,
            rotationX: -2,
            scale: 1,
            ease: "none",
            force3D: true,

            scrollTrigger: {
              trigger: imageRef.current,
                            end: "bottom center",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      return () => {
        ctx.revert();
      };
    };

    const cleanup = initGSAP();

    return () => {
      mounted = false;

      timelineRef.current?.scrollTrigger?.kill();
      timelineRef.current?.kill();

      Promise.resolve(cleanup).then((fn) => {
        if (typeof fn === "function") fn();
      });
    };
  }, []);

  // =====================================
  // EMPTY STATE
  // =====================================

  if (!cards.length) return null;

  // =====================================
  // UI
  // =====================================

  return (
    <section className="container-wrapper relative overflow-hidden">
      {/* BG */}

      <Image
        className="w-full absolute pointer-events-none z-0 left-0 h-full"
        src="/images/svg/our-procees-bg.svg"
        alt="process-bg"
        fill
      />

      {/* HEADING */}

      <div className="process-heading">
        <SectionHeading className="text-center w-full">
          {data.sectionHeading}
        </SectionHeading>
      </div>

      <div className="flex md:flex-row flex-col justify-between mt-8 gap-6">
        {/* LEFT SIDE */}

        <div className="flex flex-col justify-center xl:gap-20 lg:gap-16 md:gap-12 sm:gap-8 gap-6 h-fit mx-auto sm:max-w-[80%] md:max-w-full">
          {leftCards.map((item, index) => (
            <ProcessCard key={index} data={item} />
          ))}
        </div>

        {/* CENTER */}

        <div className="md:max-w-[384px] sm:max-w-[80%] mx-auto w-full">
          {/* CENTER IMAGE */}

          <div
            ref={imageRef}
            className="w-full flex items-center justify-center mb-10 md:max-w-full sm:max-w-[60%] mx-auto transform-[translateZ(0)] will-change-transform"
          >
            <Image
              className="object-cover w-full"
              src={data.centerImage || ""}
              width={384}
              height={600}
              loading="lazy"
              alt="process-image"
            />
          </div>

          {/* CENTER CARD */}

          {centerCard && <ProcessCard align="center" data={centerCard} />}
        </div>

        {/* RIGHT SIDE */}

        <div className="flex flex-col justify-center xl:gap-20 lg:gap-16 md:gap-12 sm:gap-8 gap-6 h-fit mx-auto sm:max-w-[80%] md:max-w-full">
          {rightCards.map((item, index) => (
            <ProcessCard key={index} data={item} align="right" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
