"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SubHeadingProps {
  subheadingone: string;
  subheadingtwo: string;
  center?: string;
}

const SubHeading = ({
  subheadingone,
  subheadingtwo,
  center = "",
}: SubHeadingProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray(".char");

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 30,
          x: -10,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.03,
          scrollTrigger: {
            trigger: headingRef.current,
                      },
        },
      );
    }, headingRef);

    return () => ctx.revert(); // cleanup (important)
  }, []);

  // 👉 WORD → CHAR split
  const renderText = (text: string) => {
    return text.split(" ").map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block">
        {word.split("").map((char, charIndex) => (
          <span key={charIndex} className="char inline-block">
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <h2
      ref={headingRef}
      className={`text-white font-black text-3d text-3xl sm:text-4xl md:text-[50px]   lg:text-[60px] font-kaint leading-[50px] md:leading-[80px] uppercase ${center}`}
    >
      {renderText(subheadingone)} {""}
      <br />
      <span className="text-primary">{renderText(subheadingtwo)}</span>
    </h2>
  );
};

export default SubHeading;
