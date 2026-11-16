"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const words = [
  "Hello",
  "Bonjour",
  "Ciao",
  "やあ",
  "Hallo",
  "नमस्ते",
  "السلام عليكم",
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const brandRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const bottomInfoRef = useRef<HTMLDivElement | null>(null);
  const exitStarted = useRef(false);

  // LOCK SCROLL on mount
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // WORD LOOP
  useEffect(() => {
    if (index === words.length - 1) return;

    const t = setTimeout(
      () => setIndex((prev) => prev + 1),
      index === 0 ? 250 : 100,
    );

    return () => clearTimeout(t);
  }, [index]);

  // PROGRESS COUNTER & PROGRESS BAR ANIMATION
  useEffect(() => {
    const counter = { value: 0 };
    const tl = gsap.timeline();
    
    tl.to(counter, {
      value: 100,
      duration: 0.75,
      ease: "power2.out",
      onUpdate: () => {
        if (progressRef.current) {
          progressRef.current.textContent = Math.floor(counter.value).toString().padStart(2, "0");
        }
      }
    });

    if (progressBarRef.current) {
      tl.to(progressBarRef.current, {
        scaleX: 1,
        duration: 0.75,
        ease: "power2.out",
      }, 0);
    }
  }, []);

  // TEXT ENTRANCE ANIMATION (3D cinematic flip)
  useEffect(() => {
    if (!textRef.current || index === words.length - 1) return;

    gsap.fromTo(
      textRef.current,
      { 
        opacity: 0, 
        y: 20, 
        rotateX: -20,
        scale: 0.95 
      },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        scale: 1,
        duration: 0.2, 
        ease: "power3.out" 
      },
    );
  }, [index]);

  // EXIT ANIMATION — triggered on the last word
  useEffect(() => {
    if (index !== words.length - 1 || !containerRef.current) return;

    // Guard to prevent Strict Mode double-firing
    if (exitStarted.current) return;
    exitStarted.current = true;

    const el = containerRef.current;
    const text = textRef.current;
    const brand = brandRef.current;
    const bottomInfo = bottomInfoRef.current;

    // Show last word with beautiful entrance
    if (text) {
      gsap.fromTo(
        text,
        { 
          opacity: 0, 
          y: 20, 
          rotateX: -20,
          scale: 0.95 
        },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          scale: 1,
          duration: 0.2, 
          ease: "power3.out" 
        },
      );
    }

    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => {
        document.body.style.overflow = "";
        setVisible(false);
        window.dispatchEvent(new Event("preloader:done"));
      },
    });

    // Phase 1: Fade out center elements & bottom info
    tl.to([text, brand, bottomInfo], {
      y: -20,
      opacity: 0,
      duration: 0.2,
      stagger: 0.03,
      ease: "power3.in",
    })
    // Phase 2: Slight dip down (simulate spring loading)
    .to(el, {
      yPercent: 3,
      duration: 0.15,
      ease: "power2.out",
    }, "-=0.1") 
    // Phase 3: Shoot upward off screen, pulling the curved SVG along
    .to(el, {
      yPercent: -110,
      duration: 0.5,
      ease: "power4.inOut",
    });

  }, [index]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="bg-black fixed inset-0 z-99999 flex flex-col justify-between p-8 sm:p-12 overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Background Radial Glow */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(38,240,119,0.06)_0%,transparent_65%)] pointer-events-none"
        style={{ willChange: "transform" }}
      />

      {/* Top Header Branding */}
      <div 
        ref={brandRef} 
        className="w-full flex items-center justify-between text-xs tracking-[4px] uppercase font-switzer font-semibold text-white/40 select-none relative z-10"
      >
        <span>STAR WORKS</span>
        <span>CREATIVE STUDIO ©2026</span>
      </div>

      {/* Center Multilingual Greetings */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <p 
          ref={textRef} 
          className="font-voyage text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase text-primary select-none will-change-transform filter drop-shadow-[0_0_15px_rgba(38,240,119,0.2)]"
        >
          {words[index]}
        </p>
      </div>

      {/* Bottom Info & Progress Counter */}
      <div 
        ref={bottomInfoRef}
        className="w-full flex flex-col gap-4 relative z-10 select-none"
      >
        <div className="w-full flex items-end justify-between font-switzer text-xs sm:text-sm text-white/50 tracking-[2px] uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Initializing Studio</span>
          </div>
          <div>
            <span ref={progressRef} className="font-medium text-primary text-base sm:text-lg">00</span>
            <span className="text-white/20"> / 100</span>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full h-px bg-white/10 relative overflow-hidden">
          <div 
            ref={progressBarRef} 
            className="absolute top-0 left-0 h-full w-full bg-primary origin-left scale-x-0 will-change-transform" 
          />
        </div>
      </div>

      {/* Curved bottom edge — blends with body bg-moss below */}
      <svg
        className="absolute -bottom-px left-0 w-full pointer-events-none"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ height: "clamp(60px, 8vw, 120px)" }}
      >
        <path
          d="M0,0 Q720,120 1440,0 L1440,120 L0,120 Z"
          className="fill-moss"
        />
      </svg>
    </div>
  );
}
