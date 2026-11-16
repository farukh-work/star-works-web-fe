"use client";

import React, { useRef } from "react";
import { useHeroAnimations } from "./useHeroAnimations";
import LeftSvg from "../common/LeftSvg";
import RightSvg from "../common/RightSvg";
import LinkPath from "../common/LinkPath";

type HeroProps = {
  data?: {
    smallHeading?: string;
    heading?: string;
    description?: string;
    backgroundImage?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };
};

const AboutHero = ({ data }: HeroProps) => {
  const container = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const star1Ref = useRef<HTMLSpanElement>(null);
  const star2Ref = useRef<HTMLSpanElement>(null);

  useHeroAnimations({ container, titleRef, paraRef, star1Ref, star2Ref, tagRef });

  const smallHeading = data?.smallHeading || "ABOUT US";
  const heading = data?.heading || "ABOUT ERATECH";
  const description =
    data?.description ||
    "Transforming Ideas Into Digital Reality Since 2018. We Are A Team Of Passionate";
  const backgroundImage = data?.backgroundImage || "/images/webp/hero-bg-about.png";
  const primaryButtonText = data?.primaryButtonText || "Meet Our Team";
  const primaryButtonLink = data?.primaryButtonLink || "#team";
  const secondaryButtonText = data?.secondaryButtonText || "Explore Services";
  const secondaryButtonLink = data?.secondaryButtonLink || "/services";

  return (
    <section
      ref={container}
      className="relative flex flex-col items-center px-4 pt-30 pb-20 sm:pt-40"
    >
      <img
        className="pointer-events-none absolute top-0 left-0 -z-10 h-full w-full object-cover"
        src={backgroundImage}
        alt="hero-bg-about"
      />

      {/* Small tag/heading */}
      <h3
        ref={tagRef}
        className="font-voyage text-antiflash mb-4 text-center text-2xl leading-[100%]! md:text-3xl xl:text-4xl z-20 uppercase"
        style={{ opacity: 0 }}
      >
        — {smallHeading}
      </h3>

      <LeftSvg
        ref={star1Ref}
        className="absolute top-[20%]! left-5 aspect-square max-w-16 sm:top-[35%] sm:left-[20%] md:left-[15%] md:max-w-20"
      />
      <RightSvg
        ref={star2Ref}
        className="absolute top-[50%]! right-5 aspect-square max-w-16 sm:top-full sm:right-[20%] md:max-w-20"
      />

      <h2
        ref={titleRef}
        className="hero-heading relative z-20 text-center text-antiflash"
        style={{ opacity: 0 }}
      >
        {heading.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {i > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </h2>

      <p
        ref={paraRef}
        className="hero-desc relative z-20 max-w-125 pt-4 text-center sm:mt-6"
        style={{ opacity: 0 }}
      >
        {description}
      </p>

      <div className="relative z-20 mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <LinkPath
          href={primaryButtonLink}
          className="bg-primary border-primary hover:text-primary rounded-full px-8 py-2.5 text-black hover:bg-transparent max-sm:w-full!"
          isIcon={false}
        >
          <>{primaryButtonText}</>
        </LinkPath>
        <LinkPath
          href={secondaryButtonLink}
          className="rounded-full px-8 py-2.5 max-sm:w-full!"
          variant="outline"
          isIcon={false}
        >
          <>{secondaryButtonText}</>
        </LinkPath>
      </div>
    </section>
  );
};

export default AboutHero;
