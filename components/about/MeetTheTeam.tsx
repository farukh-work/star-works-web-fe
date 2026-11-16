"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import SectionHeading from "../common/SectionHeading";
import SectionDescription from "../common/SectionDescription";
import MeetTeamCard from "./MeetTeamCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MeetTheTeam = ({ data }: { data?: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".team-card");

    gsap.set(cards, {
      opacity: 0,
      y: 300,
      rotate: (i) => (i % 2 === 0 ? -8 : 8),
      scale: 0.95,
    });

    cards.forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: card,
                    end: "top 30%",
          scrub: 2.5,
        },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} id="team" className="container-wrapper w-full">
      <div className="relative mb-14 space-y-6 text-center">
        <SectionDescription isline={true} className="text-center">
          {data?.smallHeading}
        </SectionDescription>

        <SectionHeading className="text-center">{data?.heading}</SectionHeading>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.members?.map((member: any, index: number) => (
          <div key={index} className="team-card">
            <MeetTeamCard member={member} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetTheTeam;
