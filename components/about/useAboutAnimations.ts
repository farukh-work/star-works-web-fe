"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useAboutAnimations = (sectionRef: React.RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Heading Reveal
      gsap.from(".custom-heading", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".custom-heading",
        },
      });

      // Curved Text / Mobile Heading Reveal
      const everythingHeadings = sectionRef.current.querySelectorAll(".custom-everything-heading");
      everythingHeadings.forEach((heading) => {
        gsap.from(heading, {
          opacity: 0,
          scale: 0.9,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: heading,
          },
        });
      });

      // Image Parallax/Reveal
      gsap.from("img", {
        scale: 1.2,
        opacity: 0,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "img",
        },
      });

      // Heading (small + main) Entrance
      gsap.from([".about-page-small-heading", ".about-page-main-heading"], {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-page-small-heading",
          toggleActions: "play none none reverse",
        },
      });

      // Description Entrance (from right)
      gsap.from(".about-page-description", {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".about-page-description",
          toggleActions: "play none none reverse",
        },
      });

      // Paragraph Line Reveal (Removed as requested)
      /*
      const paragraphs = sectionRef.current.querySelectorAll("p");
      paragraphs.forEach((p) => {
        const split = new SplitType(p as HTMLElement, { types: "lines" });
        
        gsap.from(split.lines, {
          opacity: 0,
          y: 30,
          rotationX: -10,
          stagger: 0.15,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: p,
                        toggleActions: "play none none reverse",
          },
        });
      });
      */

      // Force a refresh after splitting to account for DOM changes
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    },
    { scope: sectionRef }
  );
};

