"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, initGSAP } from "@/lib/gsap";

// =====================================
// TYPES
// =====================================

type Props = {
  text: string;
  className?: string;
  textClassName?: string;
  hoverTextClassName?: string;
  duration?: number;
  stagger?: number;
};

// =====================================
// COMPONENT
// =====================================

const HoverSplitText = ({
  text,
  className = "",
  textClassName = "",
  hoverTextClassName = "",
  duration = 0.35,
  stagger = 0.02,
}: Props) => {
  // =====================================
  // REFS
  // =====================================

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // =====================================
  // EFFECT
  // =====================================

  useGSAP(
    () => {
      initGSAP();

      if (!mainRef.current || !overlayRef.current || !containerRef.current)
        return;

      const mainChars = mainRef.current.querySelectorAll(".char");
      const overlayChars = overlayRef.current.querySelectorAll(".char-overlay");

      // =====================================
      // INITIAL STATES
      // =====================================

      gsap.set(mainChars, {
        yPercent: 0,
        force3D: true,
      });

      gsap.set(overlayChars, {
        yPercent: 100,
        force3D: true,
      });

      // =====================================
      // ELEMENT
      // =====================================

      const container = containerRef.current;

      // =====================================
      // MOUSE ENTER
      // =====================================

      const mouseEnter = () => {
        gsap.to(mainChars, {
          yPercent: -100,
          duration,
          stagger,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(overlayChars, {
          yPercent: 0,
          duration,
          stagger,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      // =====================================
      // MOUSE LEAVE
      // =====================================

      const mouseLeave = () => {
        gsap.to(mainChars, {
          yPercent: 0,
          duration,
          stagger,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(overlayChars, {
          yPercent: 100,
          duration,
          stagger,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      // =====================================
      // EVENTS
      // =====================================

      container.addEventListener("mouseenter", mouseEnter);
      container.addEventListener("mouseleave", mouseLeave);

      // =====================================
      // CLEANUP
      // =====================================

      return () => {
        container.removeEventListener("mouseenter", mouseEnter);
        container.removeEventListener("mouseleave", mouseLeave);
      };
    },
    { scope: containerRef, dependencies: [text, duration, stagger] }
  );

  // =====================================
  // UI
  // =====================================

  const chars = text ? text.split("") : [];

  return (
    <div
      ref={containerRef}
      className={`relative inline-block overflow-hidden ${className}`}
    >
      {/* MAIN TEXT */}
      <div
        ref={mainRef}
        className={`block transform-[translateZ(0)] will-change-transform ${textClassName}`}
      >
        {chars.map((char, index) => (
          <span key={index} className="char inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* HOVER TEXT */}
      <div
        ref={overlayRef}
        className={`absolute inset-0 block transform-[translateZ(0)] will-change-transform ${hoverTextClassName}`}
      >
        {chars.map((char, index) => (
          <span key={index} className="char-overlay inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HoverSplitText;
