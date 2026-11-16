"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import LinkPath from "@/components/common/LinkPath";
import SlideDownButton from "./SlideDownButton";

const HeroBg = "/images/homepage/hero-bg.webp";
const HeroIcon = "/images/homepage/hero-icon.png";

type HeroProps = {
  data?: {
    Description?: string;
    heading?: string;
    heroImage?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    animatedHeadings?: Array<{ text: string }>;
    lastHeading?: string;
  };
};

const Hero = ({ data }: HeroProps) => {
  const words = data?.animatedHeadings?.map((h) => h.text).filter(Boolean) || [
    "Experiences",
    "Platforms",
    "Products",
    "Systems",
    "Interfaces",
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  const longestWord = words.reduce(
    (a, b) => (a.length > b.length ? a : b),
    ""
  );

  return (
    <>
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 pb-10 max-md:pt-32 md:h-dvh">
        {/* Custom CSS Keyframe Animations */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes float-left {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(2deg); }
          }
          @keyframes float-right {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-6px) rotate(-3deg); }
          }
          @keyframes glow-pulse-green {
            0%, 100% { filter: drop-shadow(0 0 8px rgba(38, 240, 119, 0.4)); opacity: 0.5; }
            50% { filter: drop-shadow(0 0 20px rgba(38, 240, 119, 0.85)); opacity: 0.85; }
          }
          @keyframes glow-pulse-white {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.3)); opacity: 0.4; }
            50% { filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.75)); opacity: 0.75; }
          }
          .animate-custom-left {
            animation: float-left 9s ease-in-out infinite, glow-pulse-green 7s ease-in-out infinite;
          }
          .animate-custom-right {
            animation: float-right 11s ease-in-out infinite, glow-pulse-white 9s ease-in-out infinite;
          }
          .spin-clockwise {
            animation: spin 24s linear infinite;
          }
          .spin-counter {
            animation: spin 30s linear reverse infinite;
          }
          /* Entrance animation runs as pure CSS so the LCP text paints at first
             paint instead of waiting for the GSAP bundle to parse and hydrate. */
          @keyframes hero-enter {
            from { opacity: 0; transform: translateY(50px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .hero-icon, .hero-heading, .hero-desc, .hero-buttons {
            animation: hero-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
          }
          .hero-heading  { animation-delay: 0.15s; }
          .hero-desc     { animation-delay: 0.3s; }
          .hero-buttons  { animation-delay: 0.45s; }
          @media (prefers-reduced-motion: reduce) {
            .hero-icon, .hero-heading, .hero-desc, .hero-buttons,
            .animate-custom-left, .animate-custom-right,
            .spin-clockwise, .spin-counter {
              animation: none;
              opacity: 1;
              transform: none;
            }
          }
          @keyframes chevron-bounce {
            0%, 100% { transform: translateY(0); opacity: 0.5; }
            50% { transform: translateY(8px); opacity: 1; }
          }
          .chevron-1 {
            animation: chevron-bounce 1.4s ease-in-out infinite;
          }
          .chevron-2 {
            animation: chevron-bounce 1.4s ease-in-out infinite 0.2s;
          }
          .slide-down-indicator {
            animation: hero-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
            animation-delay: 0.7s;
          }
        `,
          }}
        />

        {/* Custom Created Animated Star Icons for Mobile/Tablet layout */}
        <div className="animate-custom-left absolute top-26 left-6 z-10 w-16 md:w-20 lg:hidden">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
          >
            {/* Outer morphing star */}
            <path
              d="M50 0 C50 35, 65 50, 100 50 C65 50, 50 65, 50 100 C50 65, 35 50, 0 50 C35 50, 50 35, 50 0 Z"
              fill="#26f077"
            />
            {/* Inner glowing white core */}
            <path
              d="M50 16 C50 40, 60 50, 84 50 C60 50, 50 60, 50 84 C50 60, 40 50, 16 50 C40 50, 50 40, 50 16 Z"
              fill="#ffffff"
              opacity="0.85"
            />
          </svg>
        </div>

        <div className="animate-custom-right absolute top-30 right-6 z-10 w-16 md:w-20 lg:hidden">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full overflow-visible"
          >
            {/* Clockwise rotating green star */}
            <g
              className="spin-clockwise"
              style={{ transformOrigin: "50px 50px" }}
            >
              <path
                d="M50 4 L53 47 L96 50 L53 53 L50 96 L47 53 L4 50 L47 47 Z"
                fill="#26f077"
              />
            </g>
            {/* Counter-clockwise rotating inner white star rotated by 45 degrees */}
            <g
              className="spin-counter"
              style={{ transformOrigin: "50px 50px" }}
            >
              <path
                d="M50 18 L52.5 47.5 L82 50 L52.5 52.5 L50 82 L47.5 52.5 L18 50 L47.5 47.5 Z"
                fill="#ffffff"
                transform="rotate(45 50 50)"
              />
            </g>
          </svg>
        </div>

        <div className="pointer-events-none absolute top-0 left-0 h-full w-full">
          <Image
            src={data?.heroImage || HeroBg}
            alt="HeroBg"
            width={1920}
            height={1080}
            sizes="100vw"
            priority
            fetchPriority="high"
            className="hidden h-dvh w-full object-contain lg:block"
          />
        </div>
        <Image
          src={HeroIcon}
          alt="HeroIcon"
          width={90}
          height={90}
          priority
          fetchPriority="high"
          sizes="90px"
          className="hero-icon relative z-20 mt-4"
        />
        <h2 className="hero-heading relative z-20 mt-4 max-w-280! text-center text-white">
          <span className="block">{data?.heading || "Building Future-Ready"}</span>
          <span className="block mt-1 sm:mt-2">
            <span className="relative inline-flex justify-center overflow-hidden align-bottom text-primary min-w-[3ch] max-w-full pb-1">
              {/* Invisible placeholder of the longest word to preserve layout width */}
              <span className="invisible select-none pointer-events-none">
                {longestWord}
              </span>
              {words.map((word, idx) => (
                <span
                  key={idx}
                  className={`absolute left-1/2 -translate-x-1/2 top-0 transition-all duration-700 ease-in-out whitespace-nowrap`}
                  style={{
                    transform: `translateY(${
                      idx === currentIdx
                        ? "0%"
                        : idx === (currentIdx - 1 + words.length) % words.length
                        ? "-100%"
                        : "100%"
                    })`,
                    opacity: idx === currentIdx ? 1 : 0,
                  }}
                >
                  {word}
                </span>
              ))}
            </span>{" "}
            <span>{data?.lastHeading || "For Ambitious Brands"}</span>
          </span>
        </h2>
        <p className="hero-desc relative z-20 max-w-261 pt-4 sm:mt-6">
          {data?.Description ||
            "Design-driven. Technology-focused. Experience-centered. Starworks builds digital products that look exceptional and perform even better."}
        </p>
        <div className="hero-buttons relative z-20 mt-8 flex flex-row flex-wrap items-center justify-center gap-4">
          <LinkPath
            href={data?.primaryButtonLink || "/contact-us"}
            isIcon={false}
            className="normal-case"
            noScrollReveal={true}
          >
            {data?.primaryButtonText || "Start your project"}
          </LinkPath>
          <LinkPath
            href={data?.secondaryButtonLink || "/services"}
            variant="outline"
            isIcon={false}
            className="normal-case"
            noScrollReveal={true}
          >
            {data?.secondaryButtonText || "Explore services"}
          </LinkPath>
        </div>
        <SlideDownButton />
      </section>
    </>
  );
};

export default Hero;
