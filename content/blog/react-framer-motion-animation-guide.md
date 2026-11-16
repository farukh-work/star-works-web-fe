---
slug: react-framer-motion-animation-guide
title: "Mastering Animations in React with GSAP"
excerpt: "Create stunning, performant animations in your React applications with GSAP. From basic transitions to complex gesture-based interactions."
author:
  name: "Neha Verma"
  role: "Frontend Developer"
  avatar: "/images/team/neha.jpg"
category: "Frontend Development"
tags: ["React", "Animation", "GSAP", "UI/UX"]
publishedAt: "2025-02-28"
readTime: "9 min read"
coverImage: "/blog-cover-image.png"
featured: false
---

# Mastering Animations in React with GSAP

Animations breathe life into web applications, transforming static interfaces into engaging experiences. GSAP provides powerful animation capabilities.

## Getting Started

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

/* =========================
   1. BASIC FADE
========================= */
export function FadeIn() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
  }, []);

  return <div ref={ref}>Content fades in</div>;
}

/* =========================
   2. HERO ENTRANCE
========================= */
export function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-h1", { opacity: 0, y: 20, delay: 0.2 });
      gsap.from(".hero-p", { opacity: 0, y: 20, delay: 0.4 });
      gsap.from(".hero-btn", { opacity: 0, scale: 0.8, delay: 0.6 });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <h1 className="hero-h1">Welcome to Star Works</h1>
      <p className="hero-p">Transform your digital presence</p>

      <button
        className="hero-btn"
        onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05 })}
        onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1 })}
        onMouseDown={(e) => gsap.to(e.currentTarget, { scale: 0.95 })}
        onMouseUp={(e) => gsap.to(e.currentTarget, { scale: 1 })}
      >
        Get Started
      </button>
    </div>
  );
}

/* =========================
   3. SCROLL REVEAL
========================= */
export function ScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 70%",
      },
    });
  }, []);

  return <div ref={ref}>Scroll reveal</div>;
}

/* =========================
   4. STAGGER LIST
========================= */
export function StaggeredList() {
  const items = ["Item 1", "Item 2", "Item 3"];

  useEffect(() => {
    gsap.from(".list-item", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
    });
  }, []);

  return (
    <ul>
      {items.map((item, i) => (
        <li key={i} className="list-item">
          {item}
        </li>
      ))}
    </ul>
  );
}

/* =========================
   5. HOVER CARD
========================= */
export function InteractiveCard() {
  return (
    <div
      className="card"
      onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05 })}
      onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1 })}
      onMouseDown={(e) => gsap.to(e.currentTarget, { scale: 0.98 })}
      onMouseUp={(e) => gsap.to(e.currentTarget, { scale: 1 })}
    >
      Hover me
    </div>
  );
}

/* =========================
   6. DRAG
========================= */
export function DraggableElement() {
  useEffect(() => {
    Draggable.create(".drag-box", {
      bounds: { left: -100, right: 100, top: -100, bottom: 100 },
    });
  }, []);

  return <div className="drag-box">Drag me</div>;
}

/* =========================
   7. EXPAND
========================= */
export function ExpandableCard() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (open) {
      gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1 });
    }
  }, [open]);

  return (
    <div onClick={() => setOpen(!open)}>
      <h2>Title</h2>
      {open && <div ref={ref}>Content</div>}
    </div>
  );
}

/* =========================
   8. SVG
========================= */
export function AnimatedLogo() {
  useEffect(() => {
    gsap.fromTo(
      "#path",
      { strokeDasharray: 300, strokeDashoffset: 300 },
      { strokeDashoffset: 0, duration: 2 },
    );
  }, []);

  return (
    <svg width="200" height="200">
      <path id="path" d="M10 10 L190 190" stroke="#C3F00F" fill="transparent" />
    </svg>
  );
}

/* =========================
   9. NAV
========================= */
export function AnimatedNav() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);

    gsap.to(".menu", {
      x: open ? "100%" : "0%",
      duration: 0.6,
    });

    gsap.from(".menu-item", {
      y: 50,
      opacity: 0,
      stagger: 0.07,
    });
  };

  return (
    <>
      <button onClick={toggle}>Menu</button>

      <nav className="menu">
        <ul>
          {["Home", "About", "Contact"].map((item, i) => (
            <li key={i} className="menu-item">
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
```
