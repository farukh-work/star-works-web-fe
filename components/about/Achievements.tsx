"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import SectionHeading from "../common/SectionHeading";
import { animateAchievements } from "../hooks/AchievementsAnimations";
import ServiceStats from "../service/ServiceStats";
const Achievements = ({ data }: { data?: any }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (sectionRef.current) {
        const ctx = animateAchievements(sectionRef.current);
        return () => ctx.revert();
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="container-wrapper">
      <div className="relative text-center">
        <div className="achievements-main-heading">
          <SectionHeading className="mb-3 lg:mb-6 text-center">
            {data?.heading}
          </SectionHeading>
        </div>
        <div className="achievements-subtitle-wrapper">
          <p className="achievements-subtitle">{data?.subtitle}</p>
        </div>
      </div>

      <ServiceStats
        className="py-8 lg:py-14"
        data={{
          stats: data?.stats,
        }}
      />

      <div className="px-4 ">
        <div className="vision-mission-container grid md:grid-cols-2 grid-cols-1 gap-6 max-md:text-center!">
          {data?.visionMission?.map((item: any, index: number) => (
            <article key={index} className="vm-article">
              <h3 className="vm-title max-sm:text-center">{item.title}</h3>
              <p className="vm-desc max-sm:text-center">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Achievements;
