"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({
  sectiontitle,
  className,
  containerClassName,
}: sectionTitleProps) => {
  const characters = sectiontitle.split("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const chars = containerRef.current?.querySelectorAll(".char");

      if (!chars) return;

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 30,
          x: -10,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          stagger: 0.01,
          ease: "cubic-bezier(0.12, 0.49, 0.33, 0.79)",
          scrollTrigger: {
            trigger: containerRef.current,
                        once: true,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${containerClassName} flex items-center gap-2 overflow-hidden uppercase`}
    >
      <span className="inline-block h-[1px] bg-primary w-8"></span>

      <h3 className={`${className ?? ""} text-2xl font-bold text-white  `}>
        {characters.map((char, index) => (
          <span key={index} className="inline-block char">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h3>
    </div>
  );
};

export default SectionTitle;
