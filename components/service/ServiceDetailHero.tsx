"use client";
import { useRef } from "react";

import { useImageClipReveal } from "@/hooks/useImageClipReveal";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { ScrollTrigger } from "@/lib/gsap";

type ServiceData = {
  heading: string;
  descriptionOne?: string;
  descriptionTwo?: string;
  heroImage?: string;
};

type Props = {
  data: ServiceData;
};

const ServiceDetailHero = ({ data }: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useImageClipReveal({
    imageRef,
    sectionRef,
    textRef,
    titleRef,
  });

  return (
    <section
      ref={sectionRef}
      className="relative z-20 flex h-dvh min-h-screen flex-col justify-center overflow-hidden text-center"
    >
      <div ref={imageRef} className="absolute inset-0 z-20">
        <Image
          fill
          priority
          quality={100}
          sizes="100vw"
          src={urlFor(data.heroImage).width(900).url()}
          alt="hero-clip"
          className="h-full w-full object-cover sm:object-center"
          onLoad={() => ScrollTrigger.refresh()}
          unoptimized={true}
        />
      </div>
      <div className="container-wrapper relative z-30 flex h-full flex-col justify-between pt-32 pb-20 sm:pb-24 lg:pt-40 lg:pb-32">
        <div
          ref={textRef}
          className="text-antiflash font-switzer flex flex-col justify-between gap-4 text-center text-sm leading-[160%] font-normal sm:flex-row sm:text-base lg:text-lg"
        >
          <p className="w-full md:max-w-87.25">{data.descriptionOne}</p>{" "}
          <p className="w-full md:max-w-87.25">{data.descriptionTwo}</p>{" "}
        </div>

        <div ref={titleRef}>
          <h4 className="hero-heading text-antiflash">{data.heading}</h4>{" "}
        </div>
      </div>{" "}
    </section>
  );
};

export default ServiceDetailHero;
