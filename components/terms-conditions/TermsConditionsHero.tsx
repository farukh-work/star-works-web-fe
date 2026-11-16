"use client";

import React, { useRef } from "react";
import ScrollRevealCard from "../common/ScrollRevealCard";
import { useHeroAnimations } from "../about/useHeroAnimations";
import LeftSvg from "../common/LeftSvg";
import RightSvg from "../common/RightSvg";
import type { TermsAndConditionsHero as TermsAndConditionsHeroData } from "@/types/termsAndConditions";

type TermsConditionsHeroProps = {
  data: TermsAndConditionsHeroData;
};

const TermsConditionsHero = ({ data }: TermsConditionsHeroProps) => {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const star1Ref = useRef<HTMLSpanElement>(null);
  const star2Ref = useRef<HTMLSpanElement>(null);

  useHeroAnimations({
    container,
    titleRef,
    paraRef,
    star1Ref,
    star2Ref,
  });

  const lastUpdated = data?.lastUpdated
    ? new Date(data.lastUpdated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : "";

  return (
    <section ref={container} className="relative pt-32 pb-16">
      <div className="container-wrapper relative z-20">
        <ScrollRevealCard>
          <p ref={paraRef} className="hero-desc text-center">
            &mdash; {data?.sectionTitle}
          </p>
          <h1
            ref={titleRef}
            className="hero-heading text-antiflash mx-auto mt-4 w-full max-w-[700px] text-center"
          >
            {data?.headingOne} &nbsp; <br />
            {data?.headingTwo}
          </h1>
          {lastUpdated && (
            <p className="mx-auto mt-6 max-w-3xl text-center text-base font-normal text-white/80 sm:text-lg">
              {data?.lastUpdatedLabel ?? "Last updated:"} {lastUpdated}
            </p>
          )}
        </ScrollRevealCard>
      </div>
      <LeftSvg
        ref={star1Ref}
        className="absolute top-[24%]! left-10 aspect-square max-w-16 sm:top-[35%] sm:left-[20%] md:left-[15%] md:max-w-20"
      />

      <RightSvg
        ref={star2Ref}
        className="absolute top-[80%]! right-5 aspect-square max-w-16 sm:top-full sm:right-[20%] md:max-w-20"
      />
    </section>
  );
};

export default TermsConditionsHero;
