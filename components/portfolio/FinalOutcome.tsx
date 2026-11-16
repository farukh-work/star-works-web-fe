"use client";

import Image from "next/image";
import React, { useRef } from "react";
import SectionHeading from "../common/SectionHeading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type FinalOutcomeProps = {
  data: {
    image: string;
    title: string;
    description: string;
  };
};

const FinalOutcome = ({ data }: FinalOutcomeProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Heading Entrance
      gsap.from(".final-outcome-heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".final-outcome-heading",
                    toggleActions: "play none none reverse",
        },
      });

      // Description Entrance
      gsap.from(".final-outcome-description", {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".final-outcome-description",
                    toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  if (!data) return null;

  return (
    <section ref={containerRef} className="container-wrapper section-spacing">
      {data.image && (
        <Image
          className="mb-6 h-fit max-h-125 object-cover"
          src={data.image}
          alt={data.title || "Final Outcome Image"}
          width={1200}
          height={500}
          unoptimized={true}
        />
      )}
      {data.title && (
        <div className="final-outcome-heading">
          <SectionHeading> {data.title}</SectionHeading>
        </div>
      )}
      {data.description && (
        <p className="final-outcome-description about-description mt-4">
          {data.description}
        </p>
      )}
    </section>
  );
};

export default FinalOutcome;
