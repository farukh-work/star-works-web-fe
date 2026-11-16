"use client";

import React, { useRef } from "react";
import { Star2Icon, StarIcon } from "../common/Icons";
import Link from "next/link";
import { useHeroAnimations } from "../about/useHeroAnimations";

type HeroProps = {
  data?: {
    tag?: string;
    title?: string;
    description?: string;
    linkText?: string;
    link?: string;
    afterLinkText?: string;
  };
};

const Hero = ({ data }: HeroProps) => {
  const container = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const star1Ref = useRef<HTMLSpanElement>(null);
  const star2Ref = useRef<HTMLSpanElement>(null);

  useHeroAnimations({ container, titleRef, paraRef, star1Ref, star2Ref, tagRef });

  return (
    <>
      <section
        ref={container}
        className="text-antiflash container-wrapper relative flex flex-col items-center justify-center px-4 pt-30 pb-16 text-center sm:pt-40 md:pb-20"
      >
        <h2
          ref={tagRef}
          className="font-voyage text-antiflash relative z-10 mt-4 w-full text-2xl leading-[120%] md:text-3xl xl:text-4xl"
          style={{ opacity: 0 }}
        >
          &mdash; {data?.tag}
        </h2>
        <h3
          ref={titleRef}
          className="hero-heading font-voyage relative z-10 my-6 leading-[110%] tracking-[-3%]"
          style={{ opacity: 0 }}
        >
          {data?.title}
        </h3>
        <p
          ref={paraRef}
          className="font-switzer hero-desc relative z-10 w-full max-w-220"
          style={{ opacity: 0 }}
        >
          {data?.description}{" "}
          <Link
            className="hover:text-primary inline-block underline decoration-1 underline-offset-4 transition-all duration-300 ease-in-out"
            href={data?.link ?? "/"}
          >
            {data?.linkText}
          </Link>{" "}
          {""}
          {data?.afterLinkText}
        </p>
        <span
          ref={star1Ref}
          className="absolute top-30 left-2 aspect-square max-w-16 sm:left-20 md:max-w-20"
        >
          <StarIcon />
        </span>
        <span
          ref={star2Ref}
          className="absolute right-2 -bottom-6 aspect-square max-w-16 sm:right-20 md:max-w-20 lg:bottom-0 xl:-bottom-15"
        >
          <Star2Icon />
        </span>
      </section>
    </>
  );
};
  
export default Hero;
