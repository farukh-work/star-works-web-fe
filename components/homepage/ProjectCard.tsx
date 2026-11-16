import { urlFor } from "@/sanity/image";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RightIcon } from "../common/Icons";

const getProjectHref = (path?: string) => {
  const target = (path || "").trim();
  if (target.startsWith("http://") || target.startsWith("https://")) {
    return target;
  }
  const cleanPath = target
    .replace(/^\/?portfolio\/?/, "")
    .replace(/^\//, "")
    .trim();
  return `/portfolio/${cleanPath}`;
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectCard = ({
  project,
  index,
  isActive,
  cardRef,
}: ProjectCardProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  // Alternating layout: index 0 (Image Left), index 1 (Image Right), etc.
  const imageOnLeft = index % 2 === 0;
  const details = {
    category: project.category,
    description: project.description,
    techStack: project.techStack || [],
    stats: project.stats,
    year: project.year,
    features: project.features || [],
  };
  useGSAP(
    () => {
      if (!rowRef.current) return;

      // Row fade-up and enter reveal
      gsap.from(rowRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rowRef.current,
                    toggleActions: "play none none reverse",
        },
      });

      // Staggered text reveal for elements in the content block
      const animateElements = rowRef.current.querySelectorAll(".animate-el");
      if (animateElements.length > 0) {
        gsap.from(animateElements, {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rowRef.current,
                        toggleActions: "play none none reverse",
          },
        });
      }

      // Parallax scroll effect for the project image
      const bgImage = rowRef.current.querySelector(".parallax-img");
      if (bgImage) {
        gsap.fromTo(
          bgImage,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: rowRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: rowRef },
  );

  return (
    <div
      ref={rowRef}
      className={`relative flex w-full flex-col items-center ${
        imageOnLeft ? "md:flex-row" : "md:flex-row-reverse"
      } gap-8 py-3 md:gap-0 md:py-12`}
    >
      {/* Project Image Column (Alternating position, centered alignment) */}
      <div
        className={`flex w-full justify-center md:w-1/2 ${
          imageOnLeft
            ? "md:justify-end md:pr-8 lg:pr-12 xl:pr-16"
            : "md:justify-start md:pl-8 lg:pl-12 xl:pl-16"
        }`}
      >
        <div
          ref={cardRef}
          className={`group bg-deep-forest relative z-20 h-90 w-full max-w-123.5 cursor-pointer overflow-hidden rounded-3xl border transition-all duration-700 hover:-translate-y-2 hover:scale-[1.01] md:h-125 ${
            isActive ? "border-primary/40 shadow-s1" : "border-transparent"
          }`}
        >
          {/* Background image wrapper with parallax */}
          <div className="absolute inset-0 overflow-hidden transition-transform duration-1000 group-hover:scale-110">
            <Image
              fill
              src={urlFor(project.image).width(493).format("webp").url()}
              alt={project.title ?? ""}
              className="parallax-img h-full w-full scale-110 object-cover will-change-transform"
              loading="lazy"
              sizes="(max-width: 640px) 90vw,
              (max-width: 1024px) 70vw,
             50vw"
            />
          </div>

          {/* Overlay with title */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center bg-linear-to-t from-black/80 via-black/20 to-transparent p-6 text-center transition-opacity duration-500 ${
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <span
              className={`font-voyage mb-3 text-[32px] text-white italic transition-transform duration-500 md:text-[54px] ${
                isActive
                  ? "translate-y-0"
                  : "translate-y-4 group-hover:translate-y-0"
              }`}
            >
              {project.title ?? ""}
            </span>
            <span
              className={`text-primary text-[10px] font-bold tracking-[0.5em] uppercase transition-transform delay-75 duration-500 ${
                isActive
                  ? "translate-y-0"
                  : "translate-y-4 group-hover:translate-y-0"
              }`}
            >
              {project.buttonText ?? "View Projects"}
            </span>
          </div>
        </div>
      </div>

      {/* Premium Content Column (Alternating position, centered alignment) */}
      <div
        className={`mt-4 flex w-full flex-col justify-center text-center md:mt-0 md:w-1/2 md:text-left ${
          imageOnLeft
            ? "md:pl-8 lg:pl-12 xl:pl-16"
            : "md:pr-8 lg:pr-12 xl:pr-16"
        }`}
      >
        <div className="mx-auto flex max-w-140 flex-col gap-4 md:mx-0">
          {/* Category Label */}
          <div className="animate-el flex items-center justify-center gap-2 md:justify-start">
            <span className="text-primary bg-primary/10 border-primary/20 w-fit rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase sm:text-[11px]">
              {details.category}
            </span>
            <span className="font-mono text-xs font-medium text-white/30">
              {details.year}
            </span>
          </div>

          {/* Large Elegant Heading */}
          <h3 className="animate-el font-voyage text-3xl leading-[115%] tracking-wide text-white sm:text-4xl lg:text-[44px] xl:text-[50px]">
            {project.title}
          </h3>

          {/* Short Premium Description */}
          <p className="animate-el font-switzer text-sm leading-[160%] text-white/60 sm:text-base">
            {details.description}
          </p>

          {/* 3 Feature Highlights with Icons */}
          <ul className="animate-el mx-auto my-1 flex w-fit flex-col items-center justify-center gap-3 md:mx-0 md:items-start">
            {details.features.map((feature, idx) => (
              <li
                key={idx}
                className="group/item flex items-start gap-3 max-md:text-center md:text-left"
              >
                {/* SVG Icon with Neon Glow */}
                <span className="bg-primary/10 border-primary/20 text-primary group-hover/item:border-primary/50 mt-1 hidden size-5 shrink-0 items-center justify-center rounded border shadow-[0_0_8px_rgba(38,240,119,0.15)] transition-all duration-300 group-hover/item:shadow-[0_0_12px_rgba(38,240,119,0.35)] md:flex">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5L4 7L8 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span className="group-hover/item:text-primary text-sm leading-tight font-semibold text-white/95 transition-colors duration-300">
                    {feature.title}
                  </span>
                  <span className="mt-0.5 text-xs leading-normal text-white/50">
                    {feature.desc}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* Technology Tags/Chips */}
          <div className="animate-el mt-1 flex flex-wrap justify-center gap-2 md:justify-start">
            {details.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-moss-accent/60 text-primary/80 border-primary/10 hover:border-primary/30 rounded border px-2.5 py-1 font-mono text-xs transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Key Metric & CTA Button */}
          <div className="animate-el mt-3 flex items-center justify-between gap-4 border-t border-white/5 pt-4">
            <div className="flex flex-col items-center md:items-start">
              <span className="font-mono text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                Performance Metric
              </span>
              <span className="text-primary font-switzer text-base font-bold sm:text-lg">
                {details.stats}
              </span>
            </div>

            <Link
              href={getProjectHref(project.path)}
              target={project.path?.startsWith("http") ? "_blank" : undefined}
              rel={
                project.path?.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group/btn hover:text-primary hover:border-primary inline-flex items-center gap-2 border-b border-white/20 pb-1 text-sm font-semibold text-white transition-all duration-300"
            >
              <span>{project.buttonText || "View Case Study"}</span>
              <RightIcon />
            </Link>
          </div>
        </div>
      </div>

      {/* Timeline Connector */}
      <div
        className={`connector-line absolute top-1/2 left-1/2 z-10 hidden h-px w-8 -translate-y-1/2 md:block lg:w-12 xl:w-16 ${
          imageOnLeft ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div
          className={`bg-primary shadow-s1 absolute inset-0 transition-transform duration-700 ease-out ${
            imageOnLeft ? "origin-right" : "origin-left"
          }`}
          style={{ transform: `scaleX(${isActive ? 1 : 0})` }}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
