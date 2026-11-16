"use client";
import React, { useRef } from "react";
import AboutHeader from "./AboutHeader";
import AboutDescription from "./AboutDescription";
import { useAboutAnimations } from "./useAboutAnimations";

const About = ({ data }: { data?: any }) => {
  const sectionRef = useRef<HTMLElement>(null);
  useAboutAnimations(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="section-spacing relative max-w-480 w-full mx-auto"
    >
      <AboutHeader data={data} />
      <AboutDescription data={data} />
    </section>
  );
};

export default About;
