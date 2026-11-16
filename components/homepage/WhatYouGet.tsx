"use client";
import React, { useEffect, useRef } from "react";
import { initWhatYouGetAnimations } from "./animations";
import { processSteps } from "@/components/common/Helper";
import CurvedText from "../common/CurvedText";

export const WhatYouGet = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = initWhatYouGetAnimations(
      containerRef.current,
      lineRef.current,
      stepRefs.current,
      processSteps,
    );

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="section-spacing-top px-4 overflow-hidden relative bg-moss"
    >
      {/* Subtle background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(38,240,119,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative">
        {/* Title Section */}
        <div className="text-center relative z-10 curved-text-entrance">
          <CurvedText text="What You Get" className="max-sm:hidden" />
          <h2 className="curved-text text-white md:hidden my-6">
            What You Get
          </h2>
        </div>

        {/* Vertical Line Container */}
        <div className="absolute left-1/2 top-[350px] bottom-0 w-[2px] bg-moss -translate-x-1/2 hidden md:block">
          <div
            ref={lineRef}
            className="w-full h-full orange-gradient origin-top scale-y-0 shadow-[0_0_15px_rgba(253,137,0,0.3)]"
          />
        </div>

        {/* Steps Container */}
        <div className="relative">
          {processSteps.map((step, index) => (
            <div
              key={index}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className="relative mb-6 md:mb-8 last:mb-0"
            >
              {/* Pill - Centered on the line */}
              <div className="flex justify-center mb-5 xl:mb-25 relative z-20">
                <div className="bg-moss py-4">
                  {" "}
                  {/* Gap container */}
                  <div className="step-pill-indicator">{step.id}</div>
                </div>
              </div>

              {/* Content block - Offset to left or right */}
              <div
                className={`flex w-full ${
                  step.align === "left"
                    ? "justify-center md:justify-end md:pr-[55%]"
                    : "justify-center md:justify-start md:pl-[55%]"
                }`}
              >
                <div
                  className={`step-content-box ${
                    step.align === "left"
                      ? "items-center md:items-end text-center md:text-right"
                      : "items-center md:items-start text-center md:text-left"
                  }`}
                >
                  <h3 className="step-title-text  mb-5 md:mb-6">
                    {step.title}
                  </h3>
                  <p
                    className={`step-description-text text-center ${step.align === "left" ? "md:text-right" : "md:text-left"}`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
