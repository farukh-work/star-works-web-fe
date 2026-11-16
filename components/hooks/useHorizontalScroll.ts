// hooks/useHorizontalScroll.ts

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

type HorizontalScrollProps = {
  sectionRef: RefObject<HTMLElement | HTMLDivElement | null>;
  wrapperRef: RefObject<HTMLElement | HTMLDivElement | null>;
  start?: string;
  scrub?: number;
  endExtra?: number;
};

export const useHorizontalScroll = ({
  sectionRef,
  wrapperRef,
  start = "top top",
  scrub = 1,
  endExtra = 0,
}: HorizontalScrollProps) => {
  useLayoutEffect(() => {
    if (!sectionRef.current || !wrapperRef.current) return;

    const section = sectionRef.current;
    const wrapper = wrapperRef.current;

    const ctx = gsap.context(() => {
      const getScrollAmount = () =>
        wrapper.scrollWidth - window.innerWidth + endExtra;

      gsap.to(wrapper, {
        x: () => -getScrollAmount(),
        ease: "none",
        force3D: true,

        scrollTrigger: {
          trigger: section,
          start,
          end: () => `+=${getScrollAmount()}`,
          scrub,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Defer refresh to avoid conflicts with React DOM mutations during render/mount phase
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 0);
    }, section);

    return () => ctx.revert();
  }, [sectionRef, wrapperRef, start, scrub, endExtra]);
};
