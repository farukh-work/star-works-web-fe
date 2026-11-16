import { useEffect, useRef } from "react";
import gsap from "gsap";

interface UseImageTrailOptions {
  images: string[];
  containerRef: React.RefObject<HTMLDivElement | null>;
  distanceThreshold?: number;
  maxImages?: number;
  imageSize?: number;
}

export const useImageTrail = ({
  images,
  containerRef,
  distanceThreshold = 70,
  maxImages = 10,
  imageSize = 140,
}: UseImageTrailOptions) => {
  const lastMousePos = useRef({ x: 0, y: 0 });
  const activeImages = useRef<HTMLImageElement[]>([]);
  const imageIndex = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const parent = container.parentElement;
    if (!parent) return;

    // Disable on mobile/tablet (viewport width <= 1024px)
    const isMobileOrTablet = () => {
      return typeof window !== "undefined" && window.innerWidth <= 1024;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobileOrTablet()) return;

      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const lastX = lastMousePos.current.x;
      const lastY = lastMousePos.current.y;
      const distance = Math.hypot(x - lastX, y - lastY);

      if (lastX === 0 && lastY === 0) {
        lastMousePos.current = { x, y };
        return;
      }

      if (distance >= distanceThreshold) {
        lastMousePos.current = { x, y };
        spawnImage(x, y);
      }
    };

    const spawnImage = (x: number, y: number) => {
      if (images.length === 0) return;

      const imgUrl = images[imageIndex.current];
      imageIndex.current = (imageIndex.current + 1) % images.length;

      const img = document.createElement("img");
      img.src = imgUrl;
      img.style.position = "absolute";
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      img.style.width = `${imageSize}px`;
      img.style.height = `${imageSize}px`;
      img.style.objectFit = "cover";
      img.style.borderRadius = "12px";
      img.style.transform = "translate(-50%, -50%) scale(0.8)";
      img.style.opacity = "1";
      img.style.pointerEvents = "none";
      img.style.zIndex = "10";
      img.className = "image-trail-item shadow-2xl border border-white/10";

      container.appendChild(img);
      activeImages.current.push(img);

      const randomRotation = (Math.random() - 0.5) * 16; // -8deg to +8deg

      gsap.fromTo(
        img,
        {
          scale: 0.8,
          opacity: 1,
          rotation: randomRotation,
        },
        {
          scale: 1,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          onComplete: () => {
            img.remove();
            activeImages.current = activeImages.current.filter((item) => item !== img);
          },
        }
      );

      // Enforce max active images (10)
      if (activeImages.current.length > maxImages) {
        const oldestImg = activeImages.current.shift();
        if (oldestImg) {
          gsap.to(oldestImg, {
            opacity: 0,
            scale: 0.5,
            duration: 0.3,
            onComplete: () => {
              oldestImg.remove();
            },
          });
        }
      }
    };

    parent.addEventListener("mousemove", handleMouseMove);

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
      activeImages.current.forEach((img) => img.remove());
      activeImages.current = [];
    };
  }, [images, containerRef, distanceThreshold, maxImages, imageSize]);
};
