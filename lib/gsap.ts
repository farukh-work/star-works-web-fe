"use client";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useGSAP } from "@gsap/react";

let initialized = false;

export const initGSAP = () => {
  if (initialized) return;

  gsap.registerPlugin(ScrollTrigger, useGSAP);

  // Ignore the viewport resize fired when mobile browser toolbars show/hide.
  // Without this, pinned sections (e.g. the service hero) recalculate
  // mid-scroll and visibly jump on mobile because 100dvh keeps changing.
  ScrollTrigger.config({ ignoreMobileResize: true });

  initialized = true;
};

export { gsap, ScrollTrigger };
