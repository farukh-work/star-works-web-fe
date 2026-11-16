"use client";
import { useRef } from "react";
import { GlassIcon } from "../common/GlassIcon";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ServiceHeroProps = {
  data: {
    smallHeading?: string;
    heading?: string;
  };
};

const ServiceHero = ({ data }: ServiceHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const h3Ref = useRef<HTMLHeadingElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  useGSAP(
    () => {
      // Initial state for icons
      gsap.set(".glass-icon", { opacity: 0, scale: 0 });

      const tl = gsap.timeline();
      const navEl = document.querySelector("nav");

      if (navEl) {
        tl.fromTo(
          navEl,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        );
      }

      // 1. Text animations
      if (h3Ref.current) {
        tl.fromTo(
          h3Ref.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          navEl ? "-=0.4" : undefined,
        );
      }

      if (h2Ref.current) {
        tl.fromTo(
          h2Ref.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        ); // Start slightly before h3 finishes
      }

      // 2. Icon reveal (After text)
      tl.to(".glass-icon", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });

      // 3. Start floating animation only after reveal
      tl.add(() => {
        gsap.to(".glass-icon", {
          y: "random(20, 20)",
          x: "random(10, 10)",
          rotation: "random(5, 5)",
          duration: "random(2.5, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Mouse Parallax Effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        const icons = gsap.utils.toArray(".glass-icon");
        icons.forEach((icon: any, i) => {
          const depth = (i + 1) * 0.5;
          gsap.to(icon, {
            x: xPos * depth,
            y: yPos * depth,
            duration: 0.8,
            ease: "power2.out",
          });
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef as any },
  );

  return (
    <div
      ref={containerRef}
      className="container-wrapper relative pt-30 sm:pt-40"
    >
      <h3
        ref={h3Ref}
        className="font-voyage mb-2 text-center text-xl leading-[100%] tracking-[-4%] text-white opacity-80 sm:text-2xl md:text-4xl xl:text-[44px]"
        style={{ opacity: 0 }}
      >
        {data?.smallHeading}
      </h3>
      {/* COMPLETE DIGITAL SOLUTIONS */}
      <h2
        ref={h2Ref}
        className="font-voyage hero-heading text-center text-[36px] leading-[110%] tracking-[-3%] wrap-break-word text-white xl:leading-[120%]"
        style={{ opacity: 0 }}
      >
        {data?.heading}
      </h2>

      {/* Basket Icon */}
      <GlassIcon className="glass-icon absolute bottom-0 size-[50px] text-lg sm:text-[30px] xl:size-[90px] xl:text-[40px]">
        🛒
      </GlassIcon>

      {/* Laptop Icon (Larger) */}
      <GlassIcon
        className="glass-icon absolute top-20 right-6 text-[24px] sm:top-30 sm:text-[34px] xl:text-[50px]"
        size="size-[60px] sm:size-[70px] xl:size-[110px]"
      >
        💻
      </GlassIcon>
    </div>
  );
};
export default ServiceHero;
