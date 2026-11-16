import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { RefObject } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useTimelineAnimations = (
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  useGSAP(
    () => {
      if (!containerRef.current) return;

      // 👇 Add this here
      if (window.innerWidth < 768) return;

      // Heading (small + main) Entrance
      gsap.from([".timeline-small-heading", ".timeline-main-heading"], {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline-small-heading",
                    toggleActions: "play none none reverse",
        },
      });

      const items = containerRef.current.querySelectorAll(".timeline-item");

      items.forEach((item, index) => {
        const isEven = index % 2 === 0;

        // Image reveal
        gsap.from(item.querySelector(".timeline-image"), {
          x: isEven ? -150 : 150,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
                        toggleActions: "play none none reverse",
          },
        });

        // Content reveal
        gsap.from(item.querySelector(".timeline-content"), {
          x: isEven ? 150 : -150,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
                        toggleActions: "play none none reverse",
          },
        });

        // Year reveal
        gsap.from(item.querySelector(".timeline-year"), {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
                        toggleActions: "play none none reverse",
          },
        });

        // Active State Highlight Callbacks
        ScrollTrigger.create({
          trigger: item,
          start: index === 0 ? "top top" : "top 60%",
          end: "bottom 40%",
          onEnter: () => activateMilestone(item),
          onLeave: () => deactivateMilestone(item),
          onEnterBack: () => activateMilestone(item),
          onLeaveBack: () => deactivateMilestone(item),
        });

        // Scrubbing growth for vertical lines
        const lines = item.querySelectorAll(".timeline-line");

        lines.forEach((line) => {
          gsap.from(line, {
            scaleY: 0,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: line,
                            end: "bottom 60%",
              scrub: 1.2,
            },
          });
        });
      });

      function activateMilestone(item: Element) {
        const year = item.querySelector(".timeline-year");

        gsap.to(year, {
          backgroundImage: "linear-gradient(to bottom, #26f077, #159c4b)",
          webkitBackgroundClip: "text",
          color: "transparent",
          scale: 1.1,
          duration: 0.8,
          ease: "power3.out",
          force3D: true,
        });

        gsap.to(item.querySelectorAll(".timeline-dot"), {
          backgroundImage: "linear-gradient(to bottom, #26f077, #159c4b)",
          scale: 1.3,
          duration: 0.6,
          ease: "back.out(2)",
        });

        gsap.to(item.querySelectorAll(".timeline-line"), {
          backgroundImage:
            "linear-gradient(to bottom, #26f077, #159c4b, transparent)",
          duration: 0.6,
        });

        gsap.to(item.querySelector(".timeline-img"), {
          scale: 1.1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      function deactivateMilestone(item: Element) {
        const year = item.querySelector(".timeline-year");

        gsap.to(year, {
          color: "#f3f3f3",
          scale: 1,
          duration: 0.8,
          ease: "power3.inOut",
          force3D: true,
          onComplete: () => {
            gsap.set(year, {
              backgroundImage: "none",
              webkitBackgroundClip: "none",
            });
          },
        });

        gsap.to(item.querySelectorAll(".timeline-dot"), {
          backgroundImage: "none",
          backgroundColor: "#f3f3f3",
          scale: 1,
          duration: 0.6,
          ease: "power2.inOut",
        });

        gsap.to(item.querySelectorAll(".timeline-line"), {
          backgroundImage:
            "linear-gradient(to bottom, #f3f3f3, #f3f3f3, transparent)",
          duration: 0.6,
        });

        gsap.to(item.querySelector(".timeline-img"), {
          scale: 1,
          opacity: 0.9,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }
    },
    { scope: containerRef },
  );
};
