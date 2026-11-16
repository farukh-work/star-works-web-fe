"use client";

import { useGSAP } from "@gsap/react";
import { RefObject } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Params {
  imageRef: RefObject<HTMLElement | null>;
  sectionRef: RefObject<HTMLElement | null>;
  textRef: RefObject<HTMLElement | null>;
  titleRef: RefObject<HTMLElement | null>;
}

export const useImageClipReveal = ({
  imageRef,
  sectionRef,
  textRef,
  titleRef,
}: Params) => {
  useGSAP(
    () => {
      if (!imageRef.current || !sectionRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      // Respect users who prefer reduced motion: keep the hero image
      // fully visible and skip the scroll-driven clip/pin entirely.
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        gsap.set(imageRef.current, { clearProps: "clipPath" });
        return;
      }

      // =========================
      // 🔥 RESPONSIVE ARCH PATHS
      // Re-measured on every ScrollTrigger refresh (resize / orientation /
      // late image load) via function-based values + invalidateOnRefresh,
      // so the reveal is always correct and never collapses to an empty clip.
      // =========================
      const buildPaths = () => {
        const el = imageRef.current;
        const section = sectionRef.current;
        if (!el || !section) return null;

        const w = el.offsetWidth;
        const h = el.offsetHeight;
        if (!w || !h) return null;

        const width = section.offsetWidth || window.innerWidth;
        const isMobile = width < 640;
        const isTablet = width >= 640 && width < 1024;

        let archW: number;
        let archTop: number;

        if (isMobile) {
          archW = w * 0.7;
          archTop = h * 0.6;
        } else if (isTablet) {
          archW = w * 0.35;
          archTop = h * 0.75;
        } else {
          archW = w * 0.25;
          archTop = h * 0.6;
        }

        const archX1 = (w - archW) / 2;
        const archX2 = archX1 + archW;
        const archR = archW / 2;

        const from = `path("M ${archX1} ${h} L ${archX1},${archTop} A ${archR},${archR} 0,0,1 ${archX2},${archTop} L ${archX2} ${h} z")`;
        const to = `path("M 0 ${h} L 0,0 A ${archR},${archR} 0,0,1 ${w},0 L ${w} ${h} z")`;

        return { from, to };
      };

      // Fallback covering the whole element so the image is never hidden
      // if a measurement transiently fails.
      const fullClip = 'path("M 0 0 L 100% 0 L 100% 100% L 0 100% z")';

      // =========================
      // 🔥 TIMELINE
      // =========================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 🔥 IMAGE CLIP
      tl.fromTo(
        imageRef.current,
        { clipPath: () => buildPaths()?.from ?? fullClip },
        { clipPath: () => buildPaths()?.to ?? fullClip, ease: "none" },
        0,
      );

      // 🔥 TEXT
      if (textRef?.current) {
        tl.fromTo(
          textRef.current,
          { yPercent: 0, opacity: 1 },
          { yPercent: -100, opacity: 0, ease: "power2.out" },
          0,
        );
      }

      // 🔥 TITLE
      if (titleRef?.current) {
        tl.fromTo(
          titleRef.current,
          { yPercent: 0, opacity: 1 },
          { yPercent: 100, opacity: 0, ease: "power2.out" },
          0,
        );
      }

      // useGSAP automatically reverts everything created in this scope
      // (timeline + ScrollTrigger) on cleanup, preventing duplicate/leaked
      // pinned triggers across re-renders and Strict Mode double-invokes.
    },
    { scope: sectionRef },
  );
};
