import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

export const useButtonHover = (
  btnRef: RefObject<HTMLElement | null>,
  liquidRef: RefObject<HTMLElement | null>,
  textRef: RefObject<HTMLElement | null>,
  variant: "primary" | "secondary" | "outline"
) => {
  useGSAP(
    () => {
      const btn = btnRef.current;
      const liquid = liquidRef.current;
      const text = textRef.current;

      if (!btn || !liquid || !text) return;

      // Determine colors based on variant
      let liquidColor = "#26f077"; // Default green
      let borderDefaultColor = "rgba(38, 240, 119, 0.4)";
      let borderHoverColor = "#26f077";
      let shadowHoverColor = "rgba(38, 240, 119, 0.5)";

      if (variant === "outline") {
        liquidColor = "#ffffff";
        borderDefaultColor = "rgba(255, 255, 255, 0.4)";
        borderHoverColor = "#ffffff";
        shadowHoverColor = "rgba(255, 255, 255, 0.3)";
      } else if (variant === "secondary") {
        liquidColor = "#26f077";
        borderDefaultColor = "rgba(38, 240, 119, 0.4)";
        borderHoverColor = "#26f077";
        shadowHoverColor = "rgba(38, 240, 119, 0.5)";
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const handleMouseEnter = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Start expansion coordinate at mouse point, resetting scale to 0 to prevent visual jump from previous state
          gsap.set(liquid, { left: x, top: y, scale: 0, xPercent: -50, yPercent: -50, backgroundColor: liquidColor });
          gsap.to(liquid, {
            scale: 3.8,
            xPercent: -50,
            yPercent: -50,
            duration: 3,  
            ease: "sine.out",
            overwrite: "auto",
          });
          gsap.to(btn, {
            scale: 1.025,
            boxShadow: `0 0 25px ${shadowHoverColor}`,
            borderColor: borderHoverColor,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const handleMouseMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distanceX = e.clientX - centerX;
          const distanceY = e.clientY - centerY;

          // Micro shift of text/arrow toward cursor (magnetic)
          gsap.to(text, {
            x: distanceX * 0.12,
            y: distanceY * 0.12,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const handleMouseLeave = (e: MouseEvent) => {
          // Liquid background exit (scale down at the current position to avoid slippery sliding glitches)
          gsap.to(liquid, {
            scale: 0,
            xPercent: -50,
            yPercent: -50,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(text, {
            x: 0,
            y: 0,
            duration: 0.4,
            overwrite: "auto",
          });
          gsap.to(btn, {
            scale: 1,
            boxShadow: "0 0 0px rgba(0, 0, 0, 0)",
            borderColor: borderDefaultColor,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const handleMouseDown = () => {
          gsap.to(btn, {
            scale: 0.96,
            duration: 0.15,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const handleMouseUp = () => {
          gsap.to(btn, {
            scale: 1.025,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        btn.addEventListener("mouseenter", handleMouseEnter);
        btn.addEventListener("mousemove", handleMouseMove);
        btn.addEventListener("mouseleave", handleMouseLeave);
        btn.addEventListener("mousedown", handleMouseDown);
        btn.addEventListener("mouseup", handleMouseUp);

        return () => {
          btn.removeEventListener("mouseenter", handleMouseEnter);
          btn.removeEventListener("mousemove", handleMouseMove);
          btn.removeEventListener("mouseleave", handleMouseLeave);
          btn.removeEventListener("mousedown", handleMouseDown);
          btn.removeEventListener("mouseup", handleMouseUp);
        };
      });

      // Mobile touch scaling feedback
      mm.add("(max-width: 1023px)", () => {
        const handleTouchStart = () => {
          gsap.to(btn, { scale: 0.96, duration: 0.1 });
        };
        const handleTouchEnd = () => {
          gsap.to(btn, { scale: 1, duration: 0.2 });
        };

        btn.addEventListener("touchstart", handleTouchStart, { passive: true });
        btn.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
          btn.removeEventListener("touchstart", handleTouchStart);
          btn.removeEventListener("touchend", handleTouchEnd);
        };
      });

      return () => mm.revert();
    },
    { dependencies: [variant], scope: btnRef }
  );
};
