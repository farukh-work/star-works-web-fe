"use client";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useGlobalLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return { isLoading };
};
