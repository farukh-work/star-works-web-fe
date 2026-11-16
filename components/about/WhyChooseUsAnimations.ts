import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const animateWhyChooseUs = (container: HTMLElement) => {
  const ctx = gsap.context(() => {
    // Force immediate refresh
    ScrollTrigger.refresh();

    // Heading (small + main) Entrance
    gsap.from([".why-choose-small-heading", ".why-choose-main-heading"], {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".why-choose-small-heading",
                toggleActions: "play none none reverse",
      },
    });

    // Staggered Card Entrance
    gsap.from(".why-choose-item", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
              },
    });
  }, container);

  return ctx;
};
