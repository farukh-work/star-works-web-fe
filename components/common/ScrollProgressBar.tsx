"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const ScrollProgressBar = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // `scrollHeight` is a layout-forcing read. Reading it on every scroll event
    // caused layout thrashing, so we cache the scrollable distance and only
    // recompute it when the document can actually change height.
    let docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const measure = () => {
      docHeight = document.documentElement.scrollHeight - window.innerHeight;
    };

    let ticking = false;

    const updateProgress = () => {
      ticking = false;

      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;

      gsap.to(barRef.current, {
        scaleX: progress,
        duration: 0.2,
        ease: "power2.out",
        transformOrigin: "left center",
      });
    };

    // Coalesce bursts of scroll events into a single write per frame.
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateProgress);
    };

    // Recompute the cached height when layout can shift (viewport resize or
    // content/images settling after load).
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("load", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[4px] z-[9999] bg-black/10">
      <div
        ref={barRef}
        className="h-full w-full bg-primary origin-left scale-x-0"
      />
    </div>
  );
};

export default ScrollProgressBar;
