"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { animateWhyChooseUs } from "./WhyChooseUsAnimations";
import SectionDescription from "../common/SectionDescription";
import SectionHeading from "../common/SectionHeading";
import WhyChooseCard from "./WhyChooseCard";

const WhyChooseUs = ({ data }: { data?: any }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (sectionRef.current) {
        const ctx = animateWhyChooseUs(sectionRef.current);
        return () => ctx.revert();
      }
    },
    { scope: sectionRef },
  );

  return (
    <>
      <section ref={sectionRef} className="section-spacing-top container-wrapper pb-32">
        <div className="why-choose-header mb-14 text-center">
          <div className="why-choose-small-heading">
            <SectionDescription isline={true} className="mb-4">
              {data?.smallHeading}
            </SectionDescription>
          </div>
          <div className="why-choose-main-heading">
            <SectionHeading> {data?.heading}</SectionHeading>
          </div>
        </div>
        <div className="flex w-full flex-wrap justify-center gap-6 lg:flex-nowrap">
          {data?.cards?.map((item: any, index: number) => (
            <WhyChooseCard item={item} key={index} />
          ))}
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
