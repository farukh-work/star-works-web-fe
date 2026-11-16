import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WorkCTA = ({ ctaGlow, isMobile }: WorkCTAProps) => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const btnWrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const pulseRef1 = useRef<HTMLDivElement>(null);
  const pulseRef2 = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ctaGlow || !btnWrapRef.current || !btnRef.current) return;

      // Entrance animation
      gsap.fromTo(
        btnWrapRef.current,
        { scale: 0.5, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: isMobile
            ? {
                trigger: ctaRef.current,
                                toggleActions: "play none none reverse",
              }
            : undefined,
        },
      );

      // Breathing pulse on button
      gsap.to(btnRef.current, {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        boxShadow:
          "0 0 50px var(--color-primary-glow-60), 0 0 100px var(--color-primary-glow-30)",
      });

      // Pulse rings
      gsap.to(pulseRef1.current, {
        scale: 2.2,
        opacity: 0,
        duration: 1.6,
        repeat: -1,
        ease: "power2.out",
      });
      gsap.to(pulseRef2.current, {
        scale: 2.5,
        opacity: 0,
        duration: 1.8,
        repeat: -1,
        delay: 0.7,
        ease: "power2.out",
      });
    },
    { scope: ctaRef, dependencies: [ctaGlow, isMobile] },
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ctaGlow || isMobile) return;
    const wrap = btnWrapRef.current;
    const btn = btnRef.current;
    if (!wrap || !btn) return;
    const rect = wrap.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    gsap.to(wrap, {
      x: dx * 0.35,
      y: dy * 0.35,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(btn, {
      x: dx * 0.15,
      y: dy * 0.15,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    gsap.to(btnWrapRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  };



  return (
    <div
      ref={ctaRef}
      className="flex justify-center pt-16 xl:pt-24 relative z-30 md:pb-6"
    >
      <div
        className="relative p-12 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={btnWrapRef}
          className="relative flex items-center justify-center opacity-0 scale-0"
        >
          {/* Pulse ring 1 */}
          <div
            ref={pulseRef1}
            className="absolute rounded-full bg-primary/20 pointer-events-none"
            style={{ width: "150px", height: "150px" }}
          />

          {/* Pulse ring 2 */}
          <div
            ref={pulseRef2}
            className="absolute rounded-full bg-primary/10 pointer-events-none"
            style={{ width: "150px", height: "150px" }}
          />

          {/* Spinning dashed border */}
          <svg
            className="absolute rounded-full animate-[spin_12s_linear_infinite] pointer-events-none"
            style={{ inset: "-8px" }}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="48.5"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="1.5"
              strokeDasharray="6, 14"
              strokeLinecap="round"
              strokeOpacity={ctaGlow ? 0.8 : 0.25}
            />
          </svg>

          {/* CTA Button */}
          <Link
            ref={btnRef}
            href="/portfolio"
            className={`size-30 md:size-35 xl:size-37.5 rounded-full bg-primary
                        flex items-center justify-center no-underline cursor-pointer
                        transition-all duration-500 relative z-10 hover:scale-110
                        ${
                          ctaGlow
                            ? "shadow-cta-glow-active"
                            : "shadow-cta-glow-base"
                        }`}
          >
            <span className="text-moss text-xs sm:text-sm md:text-base text-nowrap font-medium text-center leading-tight">
              View all projects
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkCTA;
