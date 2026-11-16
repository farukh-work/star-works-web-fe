"use client";

import React, { useRef } from "react";
import { ArrowIcon } from "./Icons";
import ScrollRevealCard from "./ScrollRevealCard";
import { useButtonHover } from "./useButtonHover";

const Button = ({
  onClick,
  disabled,
  children,
  isIcon = true,
  variant = "primary",
  className,
  noScrollReveal = false,
}: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const liquidBgRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useButtonHover(buttonRef, liquidBgRef, textRef, variant);

  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-transparent border-2 border-primary/40 text-primary hover:text-black rounded-full";
      case "outline":
        return "bg-transparent border-2 border-white/40 text-white hover:text-black rounded-full";
      default:
        return "bg-transparent border-2 border-primary/40 text-primary hover:text-black rounded-full";
    }
  };

  const buttonContent = (
    <button
      ref={buttonRef}
      disabled={disabled}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center gap-2 px-8 h-12 overflow-hidden text-lg font-bold group ${className} ${getVariantClasses()}`}
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
        <span>{children}</span>
        {isIcon && <ArrowIcon />}
      </span>
    </button>
  );

  if (noScrollReveal) {
    return buttonContent;
  }

  return (
    <ScrollRevealCard>
      {buttonContent}
    </ScrollRevealCard>
  );
};

export default Button;
