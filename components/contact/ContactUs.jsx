"use client";
import React, { useRef } from "react";
import ContactForm from "./ContactForm";
import { Star2Icon, StarIcon } from "../common/Icons";
import { useGSAP } from "@gsap/react";
import { initContactSection } from "@/animations/contactFormAnimation";

const ContactUs = ({ heading, subHeading }) => {
  const containerRef = useRef(null);
  const subHeadingRef = useRef(null);
  const headingRef = useRef(null);
  const star1Ref = useRef(null);
  const star2Ref = useRef(null);
  const formContainerRef = useRef(null);

  const headingText = heading || "Want to start a new project!";
  const subHeadingText = subHeading || "--Get In Touch";

  useGSAP(
    () => {
      const cleanup = initContactSection({
        container: containerRef.current,
        subHeading: subHeadingRef.current,
        heading: headingRef.current,
        star1: star1Ref.current,
        star2: star2Ref.current,
        formContainer: formContainerRef.current,
      });
      return cleanup;
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="get-in-touch"
      className="w-full pt-30 md:pt-40 relative container-wrapper"
    >
      <div className="relative flex flex-col items-center justify-center text-center pb-10 md:pb-16">
        <h2
          ref={subHeadingRef}
          className="font-voyage text-antiflash w-full text-2xl md:text-3xl xl:text-4xl relative z-10 mt-4 leading-[120%] transition-colors duration-300"
        >
          {subHeadingText}
        </h2>
        <h3
          ref={headingRef}
          className="hero-heading font-voyage relative z-10 my-6 leading-[110%] tracking-[-3%] text-white"
        >
          {headingText}
        </h3>
        <span
          ref={star1Ref}
          className="absolute top-0 left-2 aspect-square max-w-16 sm:left-20 md:max-w-20"
        >
          <StarIcon />
        </span>
        <span
          ref={star2Ref}
          className="absolute right-2 bottom-0 aspect-square max-w-16 sm:right-20 md:max-w-20 lg:bottom-0"
        >
          <Star2Icon />
        </span>
      </div>
      <div ref={formContainerRef} className="will-change-[transform,opacity,filter]">
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactUs;

