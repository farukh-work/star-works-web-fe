"use client";

import { useTimelineAnimations } from "@/hooks/useTimelineAnimations";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import SectionDescription from "../common/SectionDescription";
import SectionHeading from "../common/SectionHeading";
import TimelineCard from "./TimelineCard";
import ScrollRevealCard from "../common/ScrollRevealCard";

const TimelinePage = ({ data }: { data?: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize separated animation logic
  useTimelineAnimations(containerRef);

  useGSAP(
    () => {
      // Force refresh on mount to ensure correct trigger positions
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    },
    { scope: containerRef },
  );

  if (!data?.timelineItems || data.timelineItems.length === 0) return null;
  return (
    <section ref={containerRef} className="section-spacing-top relative overflow-hidden  ">
      <div className="timeline-small-heading">
        <SectionDescription isline={true} className="text-center mb-4">
          {data?.smallHeading}
        </SectionDescription>
      </div>
      <div className="timeline-main-heading">
        <SectionHeading className="text-center ">{data?.heading}</SectionHeading>
      </div>
      <div
        className="w-full max-w-5xl mx-auto relative mt-14 md:block hidden px-4"
      >
        {data?.timelineItems?.map((event: any, index: number) => {
          return (
            <TimelineCard key={index} event={event} isEven={index % 2 === 0} />
          );
        })}
      </div>
      <div className="container-wrapper relative mt-14 block md:hidden">
        {data?.timelineItems?.map((event: any, index: number) => {
          return (
            <ScrollRevealCard key={index} delay={index * 0.2}>
              <TimelineCard event={event} isEven={index % 2 === 0} />
            </ScrollRevealCard>
          );
        })}
      </div>
    </section>
  );
};

export default TimelinePage;
