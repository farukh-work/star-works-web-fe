"use client";

import React, { useRef } from "react";
import { Star2Icon, StarIcon } from "../common/Icons";
import { useHeroAnimations } from "../about/useHeroAnimations";

interface CaseStudiesHeroProps {
  data?: {
    tag?: string;
    title?: string;
    description?: string;
  };
}

const CaseStudiesHero = ({ data }: CaseStudiesHeroProps) => {
  const container = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const star1Ref = useRef<HTMLSpanElement>(null);
  const star2Ref = useRef<HTMLSpanElement>(null);

  useHeroAnimations({ container, titleRef, paraRef, star1Ref, star2Ref, tagRef });

  const tag = data?.tag || "CASE STUDIES";
  const title = data?.title || "Case Studies";
  const description =
    data?.description ||
    "Explore our latest case studies and success stories. See how we help brands build powerful digital presence — from bold brand identities to conversion-focused websites.";

  return (
    <section
      ref={container}
      className="text-antiflash container-wrapper relative flex flex-col items-center justify-center px-4 pt-30 pb-16 text-center sm:pt-40 md:pb-20"
    >
      <h2
        ref={tagRef}
        className="font-voyage text-antiflash relative z-10 mt-4 w-full text-2xl leading-[120%] md:text-3xl xl:text-4xl"
        style={{ opacity: 0 }}
      >
        &mdash; {tag}
      </h2>
      <h3
        ref={titleRef}
        className="hero-heading font-voyage relative z-10 my-6 leading-[110%] tracking-[-3%]"
        style={{ opacity: 0 }}
      >
        {title.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {i > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </h3>
      <p
        ref={paraRef}
        className="font-switzer hero-desc relative z-10 w-full max-w-200"
        style={{ opacity: 0 }}
      >
        {description}
      </p>
      <span
        ref={star1Ref}
        className="absolute top-30 left-2 aspect-square max-w-16 sm:left-20 md:max-w-20"
      >
        <StarIcon />
      </span>
      <span
        ref={star2Ref}
        className="absolute right-2 -bottom-6 aspect-square max-w-16 sm:right-20 md:-bottom-15 md:max-w-20 lg:bottom-0"
      >
        <Star2Icon />
      </span>
    </section>
  );
};

export default CaseStudiesHero;
