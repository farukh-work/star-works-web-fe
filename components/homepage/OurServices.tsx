"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import SectionDescription from "../common/SectionDescription";
import SectionHeading from "../common/SectionHeading";
import ServicesCard from "../common/ServicesCard";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
gsap.registerPlugin(ScrollTrigger);

const OurServices = ({ data }: OurServicesProps) => {
  const headerRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const slides = data?.slides || [];

  useGSAP(
    () => {
      if (!headerRef.current) return;

      // Heading (small + main) Entrance
      gsap.from([".our-services-small-heading", ".our-services-main-heading"], {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".our-services-small-heading",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Description Entrance (from right)
      gsap.from(".our-services-description", {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".our-services-description",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: headerRef }
  );

  useHorizontalScroll({
    sectionRef,
    wrapperRef: cardsRef,
    start: "top 22%",
    scrub: 0.5,
    endExtra: 0,
  });
  return (
    <section ref={headerRef} className="relative overflow-hidden">
      <div className="container-wrapper">
        <div className="mb-14 text-center">
          <div className="our-services-small-heading">  
            <SectionDescription isline={true}>
              {data?.smallHeading}
            </SectionDescription>
          </div>
          <div className="our-services-main-heading">
            <SectionHeading className="mx-auto my-6 lg:max-w-[70%]">
              {data?.heading}
            </SectionHeading>
          </div>
          <p className="our-services-description about-description mx-auto max-w-192.25 leading-[1.6]">
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
export default OurServices;
