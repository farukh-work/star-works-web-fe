"use client";

import React, { useRef } from "react";
import LinkPath from "./LinkPath";
import ScrollRevealCard from "./ScrollRevealCard";
import SectionDescription from "./SectionDescription";
import SectionHeading from "./SectionHeading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// =====================================
// TYPES
// =====================================

type CtaData = {
  sectionTitle?: string;

  headingOne?: string;
  headingTwo?: string;

  description?: string;

  contactButtonText?: string;
  contactButtonLink?: string;

  secondaryButtonText?: string;
  secondaryButtonLink?: string;
};

type Props = {
  data: CtaData;
};

// =====================================
// COMPONENT
// =====================================

const CommonCtaSection = ({ data }: Props) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Heading (small + main) Entrance
      gsap.from([".cta-small-heading", ".cta-main-heading"], {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-small-heading",
                    toggleActions: "play none none reverse",
        },
      });

      // Description Entrance
      gsap.from(".cta-description", {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-description",
                    toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="container-wrapper section-spacing-bottom text-center">
      {/* HEADING */}

      <div className="flex flex-col items-center justify-center">
        <div className="cta-small-heading">
          <SectionDescription
            isline={true}
            className="flex items-center text-center"
          >
            {data?.sectionTitle}
          </SectionDescription>
        </div>

        <div className="cta-main-heading">
          <SectionHeading className="m-6 w-full text-center">
            {data?.headingOne}
            <br />
            {data?.headingTwo}
          </SectionHeading>
        </div>

        {/* DESCRIPTION */}

        {data?.description && (
          <p className="cta-description text-antiflash mx-auto mb-10 max-w-175 text-base leading-[160%] md:text-lg">
            {data.description}
          </p>
        )}
      </div>

      {/* BUTTONS */}

      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        {/* PRIMARY BUTTON */}

        {data?.contactButtonText && (
          <ScrollRevealCard delay={0.1}>
            <LinkPath href={data?.contactButtonLink || "/contact-us"}>
              {data.contactButtonText}
            </LinkPath>
          </ScrollRevealCard>
        )}

        {/* SECONDARY BUTTON */}

        {data?.secondaryButtonText && (
          <ScrollRevealCard delay={0.2}>
            <LinkPath
              isIcon={false}
              variant="outline"
              href={data?.secondaryButtonLink || "/portfolio"}
            >
              {data.secondaryButtonText}
            </LinkPath>
          </ScrollRevealCard>
        )}
      </div>
    </section>
  );
};

export default CommonCtaSection;
