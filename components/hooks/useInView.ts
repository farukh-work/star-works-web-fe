"use client";

import { RefObject, useEffect, useState } from "react";

/**
 * Returns `true` once `ref` scrolls within `rootMargin` of the viewport, then
 * stays `true` (the observer disconnects after the first intersection).
 *
 * Used to defer expensive below-the-fold work — GSAP/ScrollTrigger setup,
 * SplitType splitting, layout-reading — out of the initial load window that
 * Lighthouse measures Total Blocking Time over. The generous default margin
 * means the work still runs well before the section is actually visible.
 */
export function useInView(
  ref: RefObject<Element | null>,
  rootMargin = "800px",
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    // No IntersectionObserver (very old browsers / SSR edge) → run immediately
    // so behavior degrades to the previous "init on mount" path.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin, inView]);

  return inView;
}
