"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "../hooks/useInView";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealCardProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  x?: number;
  y?: number;
}

const ScrollRevealCard = ({
  children,
  delay = 0,
  duration = 0.8,
  className = "",
  x = 0,
  y = 60,
}: ScrollRevealCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const inView = useInView(cardRef, "1000px");

  useGSAP(
    () => {
      if (!inView) return;

      const el = cardRef.current;
      if (!el) return;

      gsap.set(el, {
        autoAlpha: 0,
        x,
        y,
        force3D: true,
      });

      // =====================================
      // ANIMATION
      // =====================================

      const animation = gsap.to(el, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: el,
                    once: true,
        },
      });

      return () => {
        animation?.scrollTrigger?.kill();
        animation?.kill();
      };
    },
    {
      scope: cardRef,
      dependencies: [delay, duration, x, y, inView],
    },
  );

  return (
    <div
      ref={cardRef}
      className={`${className} will-change-[transform,opacity] transform-[translateZ(0)]`}
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  );
};

export default ScrollRevealCard;
