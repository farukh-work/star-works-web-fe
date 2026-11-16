"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { ArrowIcon } from "./Icons";
import ScrollRevealCard from "./ScrollRevealCard";
import { useButtonHover } from "./useButtonHover";

const formatButtonText = (text: React.ReactNode) => {
  if (typeof text === "string") {
    let formatted = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    formatted = formatted.replace(/\bfaqs\b/gi, "FAQs");
    return formatted;
  }
  return text;
};

const LinkPath = ({
  href,
  children,
  className,
  containerClassName,
  isIcon = true,
  variant = "primary",
  noScrollReveal = false,
}: LinkProps) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const liquidBgRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useButtonHover(buttonRef, liquidBgRef, textRef, variant);

  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-transparent border-primary/40 text-primary hover:text-black rounded-full";
      case "outline":
        return "bg-transparent border-white/40 text-white hover:text-black rounded-full";
      default:
        return "bg-transparent border-primary/40 text-primary hover:text-black rounded-full";
    }
  };

  const linkContent = (
    <Link
      ref={buttonRef}
      href={`${href}`}
      className={`relative overflow-hidden inline-flex transform items-center justify-center gap-2 border-2 px-8 py-2.5 text-sm font-medium! normal-case md:text-base group ${getVariantClasses()} ${className}`}
    >
      <span
        ref={liquidBgRef}
        className="absolute rounded-full pointer-events-none z-[-1] w-80 h-80 will-change-[transform,left,top] hidden lg:block"
        style={{ transform: "translate(-50%, -50%) scale(0)" }}
      />
      <span
        ref={textRef}
        className="relative z-10 flex items-center gap-2 pointer-events-none transition-colors duration-300 group-hover:text-black"
      >
        <span>{formatButtonText(children)}</span>
        {isIcon && <ArrowIcon />}
      </span>
    </Link>
  );

  if (noScrollReveal) {
    return linkContent;
  }

  return (
    <ScrollRevealCard className={`${containerClassName}`}>
      {linkContent}
    </ScrollRevealCard>
  );
};

export default LinkPath;
