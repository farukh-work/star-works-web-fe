"use client";

import { useEffect } from "react";

import Lenis from "@studio-freight/lenis";

import { gsap, ScrollTrigger, initGSAP } from "@/lib/gsap";

// =====================================
// GLOBAL REF
// =====================================

export const lenisRef: {
  current: Lenis | null;
} = {
  current: null,
};

// requestIdleCallback isn't available in Safari — fall back to a timeout so the
// boot still happens shortly after load instead of synchronously on mount.
type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

const onIdle = (cb: () => void): number => {
  const w = window as IdleWindow;
  if (typeof w.requestIdleCallback === "function") {
    return w.requestIdleCallback(cb, { timeout: 2000 });
  }
  return window.setTimeout(cb, 1) as unknown as number;
};

const cancelIdle = (id: number) => {
  const w = window as IdleWindow;
  if (typeof w.cancelIdleCallback === "function") {
    w.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};

// =====================================
// COMPONENT
// =====================================

const SmoothScrollProvider = () => {
  useEffect(() => {
    initGSAP();

    let lenis: Lenis | null = null;
    let tickerUpdate: ((time: number) => void) | null = null;
    let booted = false;

    const initLenis = () => {
      if (window.innerWidth < 1024) {
        if (lenis) {
          lenis.destroy();
          lenis = null;
          lenisRef.current = null;
        }
        return;
      }

      if (lenis) return;

      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      lenis.on("scroll", () => {
        ScrollTrigger.update();
      });

      tickerUpdate = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(tickerUpdate);
    };

    const handleResize = () => {
      initLenis();
      ScrollTrigger.refresh();
    };

    // Smooth scrolling is a progressive enhancement — booting Lenis spins up a
    // GSAP ticker RAF loop, so we keep it off the critical path. It starts when
    // the main thread first goes idle, OR the moment the user shows scroll
    // intent (wheel/touch/pointer/key), whichever comes first.
    const boot = () => {
      if (booted) return;
      booted = true;
      initLenis();
      window.addEventListener("resize", handleResize);
    };

    const idleId = onIdle(boot);
    const intentOpts = { once: true, passive: true } as AddEventListenerOptions;
    window.addEventListener("wheel", boot, intentOpts);
    window.addEventListener("touchstart", boot, intentOpts);
    window.addEventListener("pointerdown", boot, intentOpts);
    window.addEventListener("keydown", boot, { once: true });

    // Recalculate ScrollTrigger positions once the layout is actually final.
    // The preloader locks body scroll for several seconds and images load
    // asynchronously, so the initial measurements are stale — without these
    // refreshes pinned sections jump and the hero clip path is miscalculated.
    const refresh = () => ScrollTrigger.refresh();

    refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("preloader:done", refresh);
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(refresh).catch(() => {});
    }

    return () => {
      cancelIdle(idleId);
      window.removeEventListener("wheel", boot);
      window.removeEventListener("touchstart", boot);
      window.removeEventListener("pointerdown", boot);
      window.removeEventListener("keydown", boot);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", refresh);
      window.removeEventListener("preloader:done", refresh);
      if (tickerUpdate) {
        gsap.ticker.remove(tickerUpdate);
      }
      if (lenis) {
        lenis.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return null;
};

export default SmoothScrollProvider;
