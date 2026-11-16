"use client";
import React, { useRef, useState } from "react";
import FaqList from "./FaqList";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionDescription from "./SectionDescription";
import SectionHeading from "./SectionHeading";
import LinkPath from "./LinkPath";
import ScrollRevealCard from "./ScrollRevealCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// =====================================
// TYPES
// =====================================

type FaqItem = {
  title: string;
  desc: string;
};

type FaqSectionData = {
  tag: string;
  heading: string;
  buttonText: string;
  buttonLink: string;
  items: FaqItem[];
};

type Props = {
  data: FaqSectionData;
  className?: string;
};

// =====================================
// COMPONENT
// =====================================

const Faq: React.FC<Props> = ({ data, className = "" }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const faqs = data?.items || [];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Heading (small + main) Entrance
      gsap.from([".faq-small-heading", ".faq-main-heading"], {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-small-heading",
                    toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className={`section-spacing-top pb-20 md:pb-32 px-4 overflow-hidden container-wrapper flex flex-col justify-center items-center ${className}`}
    >
      {/* HEADING */}

      <div className="flex flex-col items-center mb-14 justify-center w-full mx-auto text-center">
        <div className="faq-small-heading">
          <SectionDescription isline={true}>{data.tag}</SectionDescription>
        </div>
        <div className="faq-main-heading">
          <SectionHeading className="mt-6">{data.heading}</SectionHeading>
        </div>
      </div>

      {/* FAQ LIST */}

      <div className="border-t border-antiflash/20 w-full">
        {faqs.map((item, index) => (
          <ScrollRevealCard
            delay={0.04 * index}
            duration={0.45}
            key={index}
            className="faq-item-anim"
          >
            <FaqList
              item={item}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </ScrollRevealCard>
        ))}
      </div>

      {/* BUTTON */}

      <LinkPath className="mt-14 w-fit! mx-auto!" href={data.buttonLink || "/"}>
        {data.buttonText}
      </LinkPath>
    </section>
  );
};
export default Faq;
