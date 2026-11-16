"use client";

import LeftSvg from "@/components/common/LeftSvg";
import RightSvg from "@/components/common/RightSvg";
import React, { useRef } from "react";
import ImageTrail from "@/components/animations/ImageTrail";
import { imageTrailImages } from "@/data/imageTrailImages";
import { useHeroAnimations } from "@/components/about/useHeroAnimations";
import LinkPath from "@/components/common/LinkPath";

const stats = [
  {
    number: "200+",
    title: "Projects Completed",
  },
  {
    number: "50+",
    title: "Cities",
  },
  {
    number: "8",
    title: "Years",
  },
  {
    number: "5★",
    title: "Rating",
  },
];

interface HeroProps {
  data?: {
    heading?: string;
    description?: string;
    stats?: Array<{ number: string; title: string }>;
  };
}

const Hero = ({ data }: HeroProps) => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const star1Ref = useRef<HTMLSpanElement>(null);
  const star2Ref = useRef<HTMLSpanElement>(null);

  useHeroAnimations({ container, titleRef, paraRef, star1Ref, star2Ref });

  const heading = data?.heading || "Top Web Design \n Agency in [ Hisar ]";
  const description =
    data?.description ||
    "we help Hisar businesses build powerful digital presence — from bold brand identities to conversion-focused websites.";
  const statsList = data?.stats || stats;

  return (
    <section
      ref={container}
      className="relative flex flex-col items-center px-4 pt-30 sm:pt-40"
    >
      <ImageTrail images={imageTrailImages} />
      <img
        className="pointer-events-none absolute top-0 left-0 -z-10 h-full w-full object-cover"
        src="/images/webp/hero-bg-location.webp"
        alt="hero-bg-location"
      />

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
        className="hero-heading relative z-20 text-center text-white"
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
        className="hero-desc relative z-20 max-w-125 pt-4 sm:mt-6"
      >
        {description}
      </p>
      <div className="relative z-20 mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <LinkPath
          href="/contact-us"
          className="max-sm:w-full!"
          isIcon={false}
        >
          Get a free quote
        </LinkPath>
        <LinkPath
          href="/portfolio"
          className="max-sm:w-full!"
          variant="outline"
          isIcon={false}
        >
          See our work
        </LinkPath>
      </div>
      <div className="container-wrapper relative z-20 my-8 px-0! md:my-10 xl:my-20">
        <div className="flex items-center justify-between">
          {statsList.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex-1 text-center">
                <h3 className="font-voyage text-3xl leading-[88%] text-white md:text-4xl xl:text-5xl">
                  {item.number}
                </h3>

                <h4 className="font-switzer mt-2 text-[16px] leading-[110%] text-white md:text-[20px] xl:text-2xl">
                  {item.title}
                </h4>
              </div>

              {index !== statsList.length - 1 && (
                <div className="mx-4 h-16 w-px shrink-0 bg-white/30 md:h-20" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
