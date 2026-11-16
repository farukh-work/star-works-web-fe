"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import "swiper/css";
import SectionHeading from "../common/SectionHeading";
import ServicesCard from "../common/ServicesCard";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";

gsap.registerPlugin(ScrollTrigger);
type ExploreProps = {
  data: {
    heading?: string;
    description?: string;

    slides?: {
      title?: string;
      slug?: {
        current?: string;
      };
      image?: string;
    }[];
  };
  className?: string;
};
import { useGSAP } from "@gsap/react";

const Explore = ({ data, className = "section-spacing-top" }: ExploreProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const slides = data?.slides || [];

  useHorizontalScroll({
    sectionRef,
    wrapperRef: cardsRef,
    start: "top 22%",
    scrub: 0.5,
    endExtra: 0,
  });

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Heading Entrance
      gsap.from(".explore-main-heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".explore-main-heading",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Description Entrance
      gsap.from(".explore-description", {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".explore-description",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className={`${className} relative overflow-hidden`}>
      {/* Background Decoration */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full">
        <svg
          className="absolute top-[-20%] left-[-15%] h-[400px] w-[400px] opacity-30 md:h-[800px] md:w-[800px]"
          viewBox="0 0 800 800"
          fill="none"
        >
          <circle
            cx="400"
            cy="400"
            r="399"
            stroke="var(--color-primary)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="container-wrapper relative z-10">
        {/* Heading Section */}
        <div className="mb-10 text-center md:mb-20">
          <div className="explore-main-heading">
            <SectionHeading className="mx-auto lg:max-w-[70%]">
              {data?.heading}
            </SectionHeading>
          </div>
          <p className="explore-description about-description mx-auto mt-4 max-w-150">
            {data?.description}
          </p>
        </div>
      </div>
      <div
        ref={sectionRef}
        className="flex flex-col justify-center overflow-hidden"
      >
        {/* Horizontal Scroll */}
        <div
          ref={cardsRef}
          className="explore-slider flex w-max gap-6 pr-[20vw] pl-[5vw]"
        >
          {slides.map((slide, index) => (
            <ServicesCard slide={slide} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;
