"use client";
import React, { useEffect, useRef, useState } from "react";
import { initOurWorkAnimations } from "./animations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../common/SectionHeading";
import SectionDescription from "../common/SectionDescription";
import ProjectCard from "./ProjectCard";
import WorkCTA from "./WorkCta";
import { useInView } from "../hooks/useInView";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const OurWork = ({ data }: OurWorkProps) => {
  const projects = data?.projects || [];

  const sectionRef = useRef<HTMLElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeCards, setActiveCards] = useState<Set<number>>(new Set());
  const [ctaGlow, setCtaGlow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isMobileRef = useRef(false);

  // Defer all GSAP setup until the section nears the viewport, so it
  // stays out of the initial load window that Lighthouse measures TBT over.
  const inView = useInView(sectionRef, "800px");

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    isMobileRef.current = mobile;
    if (mobile) setCtaGlow(true);
    const handleResize = () => {
      const mob = window.innerWidth < 768;
      setIsMobile(mob);
      isMobileRef.current = mob;
      if (mob) setCtaGlow(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!inView) return;
    const ctx = initOurWorkAnimations(
      sectionRef.current,
      lineFillRef.current,
      cardRefs.current,
      (glow) => {
        if (!isMobileRef.current) {
          setCtaGlow(glow);
        }
      },
      setActiveCards,
    );
    return () => ctx?.revert();
  }, [inView]);

  return (
    <section
      className="section-spacing font-switzer relative overflow-hidden max-md:px-4"
      ref={sectionRef}
      id="our-work"
    >
      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center sm:mb-20">
          <div className="our-work-small-heading">
            <SectionDescription isline={true}>
              {data?.smallHeading}
            </SectionDescription>
          </div>
          <div className="our-work-main-heading">
            <SectionHeading className="my-6">{data?.heading}</SectionHeading>
          </div>
          <p className="our-work-description about-description mx-auto max-w-239.25 normal-case">
            {data?.description}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto">
          {/* Vertical line track */}
          <div className="connector-line absolute top-0 bottom-30 left-1/2 hidden w-0.5 -translate-x-1/2 md:block">
            <div
              ref={lineFillRef}
              className="from-primary to-primary/40 shadow-s2 absolute inset-x-0 top-0 h-full origin-top scale-y-0 bg-linear-to-b"
            />
          </div>

          {/* Project rows */}
          <div className="relative flex flex-col gap-8 md:gap-0">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                isActive={isMobile ? true : activeCards.has(index)}
                cardRef={(el) => (cardRefs.current[index] = el)}
              />
            ))}
          </div>

          {/* CTA */}
          <WorkCTA ctaGlow={ctaGlow} isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
};

export default OurWork;
