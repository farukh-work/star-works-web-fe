"use client";

import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
};

const SplitTextAnimation = ({
  children,
  className,
  delay = 0,
  stagger = 0.05,
  duration = 0.6,
  once = true,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let split: any;

      let animation: any;

      const initAnimation = async () => {
        const gsap = (await import("gsap")).default;

        const { ScrollTrigger } = await import("gsap/ScrollTrigger");

        const SplitType = (await import("split-type")).default;

        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current) return;

        // =====================================
        // SPLIT
        // =====================================

        split = new SplitType(containerRef.current, {
          types: "words,chars",
        });

        // =====================================
        // INITIAL STATE
        // =====================================

        gsap.set(split.chars, {
          yPercent: 110,
          autoAlpha: 0,
          force3D: true,
          color: "inherit",
        });

        // =====================================
        // ANIMATION
        // =====================================

        animation = gsap.to(split.chars, {
          yPercent: 0,
          autoAlpha: 1,
          color: "inherit",
          duration,
          delay,
          stagger,

          ease: "power3.out",

          force3D: true,

          scrollTrigger: {
            trigger: containerRef.current,
                        once,
            toggleActions: once
              ? "play none none none"
              : "play none none reverse",
          },
        });
      };

      initAnimation();

      return () => {
        animation?.scrollTrigger?.kill();
        animation?.kill();

        split?.revert();
      };
    },
    {
      scope: containerRef,
    },
  );

  return (
    <div className={`overflow-hidden perspective-[1000px] ${className || ""}`}>
      <div
        ref={containerRef}
        className="transform-[translateZ(0)] will-change-[transform,opacity]"
      >
        {children}
      </div>
    </div>
  );
};

export default SplitTextAnimation;
