import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const animateAchievements = (sectionRef: HTMLElement) => {
  const ctx = gsap.context(() => {
    // Heading Entrance
    gsap.from(".achievements-main-heading", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".achievements-main-heading",
        toggleActions: "play none none reverse",
      },
    });

    // Subtitle Entrance (slides from right like homepage descriptions)
    gsap.from(".achievements-subtitle-wrapper", {
      x: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".achievements-subtitle-wrapper",
        toggleActions: "play none none reverse",
      },
    });

    // Vision and Mission articles reveal
    gsap.from("article", {
      x: (index) => (index === 0 ? -100 : 100),
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".vision-mission-container",
      },
    });

  }, sectionRef);

  return ctx;
};
