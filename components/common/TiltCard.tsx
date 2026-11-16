"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const midX = rect.width / 2;
      const midY = rect.height / 2;

      const rotateY = ((x - midX) / midX) * 10; // 👈 intensity
      const rotateX = -((y - midY) / midY) * 10;

      gsap.to(el, {
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformOrigin: "center",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div ref={ref} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
};

export default TiltCard;
