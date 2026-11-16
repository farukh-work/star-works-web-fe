"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SectionDescription from "../common/SectionDescription";
import SectionHeading from "../common/SectionHeading";
import CoreValueCard from "./CoreValueCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CoreValue = ({ data }: { data?: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // =========================
      // Desktop Animation
      // =========================

      // Heading (small + main) Entrance
      gsap.from([".core-values-small-heading", ".core-values-main-heading"], {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".core-values-small-heading",
                    toggleActions: "play none none reverse",
        },
      });

      const desktopCards = gsap.utils.toArray<HTMLElement>(".desktop-card");

      gsap.set(desktopCards, {
        y: 400,
        scale: 0.4,
        opacity: 0,
        rotate: 0,
      });

      const desktopPositions = [
        { x: 20, y: 20, rotate: -10 },
        { x: 20, y: -10, rotate: -4 },
        { x: 25, y: 40, rotate: 4 },
        { x: -20, y: -20, rotate: 10 },
      ];

      const desktopTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
                    end: "bottom 55%",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      desktopCards.forEach((card, index) => {
        desktopTl.to(
          card,
          {
            ...desktopPositions[index],
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
          },
          0,
        );
      });

      // =========================
      // Mobile Animation
      // =========================

      const mobileCards = gsap.utils.toArray<HTMLElement>(".mobile-card");

      gsap.set(mobileCards, {
        y: 200,
        scale: 0.7,
        opacity: 0,
        rotate: 0,
      });

      const mobilePositions = [
        { x: 0, y: 0, rotate: -6 },
        { x: 8, y: 0, rotate: 6 },
        { x: 8, y: 0, rotate: -6 },
        { x: 0, y: 0, rotate: 6 },
      ];

      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
                    once: true,
        },
      });

      mobileCards.forEach((card, index) => {
        mobileTl.to(
          card,
          {
            ...mobilePositions[index],
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          index * 0.1,
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="container-wrapper section-spacing relative overflow-hidden"
    >
      <div className="core-values-small-heading">
        <SectionDescription isline={true} className="mb-6 text-center">
          {data?.smallHeading}
        </SectionDescription>
      </div>

      <div className="core-values-main-heading">
        <SectionHeading className="text-center">{data?.heading}</SectionHeading>
      </div>

      {/* ========================= */}
      {/* Desktop */}
      {/* ========================= */}

      <div className="hidden gap-0 px-4 pt-16 md:grid md:grid-cols-2 lg:grid-cols-4 xl:px-0">
        {data?.cards?.map((item: any, index: number) => (
          <div
            key={index}
            className="desktop-card w-full origin-bottom"
            style={{
              zIndex: data?.cards?.length - index,
            }}
          >
            <CoreValueCard item={item} />
          </div>
        ))}
      </div>

      {/* ========================= */}
      {/* Mobile */}
      {/* ========================= */}

      <div className="grid grid-cols-1 gap-6 px-4 pt-16 md:hidden">
        {data?.cards?.map((item: any, index: number) => (
          <div key={index} className="mobile-card w-full origin-bottom">
            <CoreValueCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValue;
