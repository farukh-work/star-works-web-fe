"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Point = {
  x: number;
  y: number;
};

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isTouchDevice || prefersReducedMotion) return;

    const arm = () => setArmed(true);
    // `once` auto-removes the listener after the first event; `passive` keeps it
    // off the scroll/pointer blocking path.
    window.addEventListener("pointermove", arm, { once: true, passive: true });

    return () => window.removeEventListener("pointermove", arm);
  }, []);

  useEffect(() => {
    if (!armed) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // Cache the viewport dimensions. They are only re-read on resize, never
    // inside the render loop, so the loop performs zero layout-reading work.
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // The glow is a constant — set it once on the context instead of
    // reassigning shadowBlur/shadowColor on every stroke of every frame.
    ctx.lineJoin = "round";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "white";

    const mouse = {
      x: width / 2,
      y: height / 2,
    };

    // SMOOTH GSAP FOLLOW
    const xTo = gsap.quickTo(mouse, "x", {
      duration: 0.35,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(mouse, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    // TRAIL LENGTH
    const total = 24;

    const points: Point[] = [];

    for (let i = 0; i < total; i++) {
      points.push({
        x: mouse.x,
        y: mouse.y,
      });
    }

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", move, { passive: true });

    const lerp = (start: number, end: number, amount: number) => {
      return start + (end - start) * amount;
    };

    let animationFrame: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // HEAD
      points[0].x = lerp(points[0].x, mouse.x, 0.3);

      points[0].y = lerp(points[0].y, mouse.y, 0.3);

      // FOLLOW
      for (let i = 1; i < points.length; i++) {
        points[i].x = lerp(points[i].x, points[i - 1].x, 0.24);

        points[i].y = lerp(points[i].y, points[i - 1].y, 0.24);
      }

      // DRAW
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];

        const opacity = 1 - i / points.length;

        ctx.beginPath();

        ctx.moveTo(lerp(p1.x, p2.x, -0.15), lerp(p1.y, p2.y, -0.05));

        ctx.lineTo(lerp(p1.x, p2.x, 1.15), lerp(p1.y, p2.y, 1.05));

        ctx.strokeStyle = `rgba(255,255,255,${opacity * 0.9})`;

        ctx.lineWidth = Math.max(opacity * 2, 0.2);

        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;

      // Resetting the canvas size clears its context state, so re-apply the
      // constant glow once here rather than per frame.
      ctx.lineJoin = "round";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "white";
    };

    window.addEventListener("resize", resize, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", resize);

      cancelAnimationFrame(animationFrame);
    };
  }, [armed]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-9999 hidden lg:block"
    />
  );
};

export default CursorTrail;
