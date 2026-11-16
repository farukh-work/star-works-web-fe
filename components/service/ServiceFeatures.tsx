"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import SectionHeading from "../common/SectionHeading";
import SectionDescription from "../common/SectionDescription";
import { ArrowIcon } from "../common/MainIcons";

// =====================================
// TYPES
// =====================================

type Slide = {
  heading: string;
  description: string;
  image: string;
};

type FeaturesSectionData = {
  smallHeading?: string;
  sectionHeading: string;
  slides: Slide[];
};

type Props = {
  data: FeaturesSectionData;
  className?: string;
};

const ServiceFeatures = ({ data, className }: Props) => {
  const slides = useMemo(() => {
    return (data?.slides || []).map((r: any) => ({
      heading: r.heading || "",
      description: r.description || "",
      image: r.image || "/images/review-user.png",
    }));
  }, [data?.slides]);

  const [active, setActive] = useState(0);

  const reviewsHeaderRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const headingRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const isAnimating = useRef(false);

  useGSAP(
    () => {
      if (!reviewsHeaderRef.current) return;

      // Heading (small + main) Entrance
      gsap.from([".reviews-small-heading", ".reviews-main-heading"], {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".reviews-small-heading",
                    toggleActions: "play none none reverse",
        },
      });
    },
    { scope: reviewsHeaderRef }
  );

  const gsapRef = useRef<typeof import("gsap").default | null>(null);

  const timelineRef = useRef<any>(null);

  const currentSlide = useMemo(() => {
    return slides[active];
  }, [slides, active]);

  // =====================================
  // GSAP LOAD
  // =====================================

  useEffect(() => {
    let mounted = true;

    const loadGSAP = async () => {
      const gsapModule = (await import("gsap")).default;

      const { CustomEase } = await import("gsap/CustomEase");

      gsapModule.registerPlugin(CustomEase);

      CustomEase.create("smoothReveal", "0.76, 0, 0.24, 1");

      if (!mounted) return;

      gsapRef.current = gsapModule;

      animateIn();
    };

    loadGSAP();

    return () => {
      mounted = false;

      timelineRef.current?.kill();
    };
  }, []);

  // Preload all slide images to prevent network delay on click
  useEffect(() => {
    slides.forEach((slide) => {
      if (slide.image) {
        const img = new window.Image();
        img.src = slide.image;
      }
    });
  }, [slides]);

  // =====================================
  // ANIMATE IN
  // =====================================

  const animateIn = useCallback(() => {
    if (!gsapRef.current) return;

    const gsap = gsapRef.current;

    timelineRef.current?.kill();

    const tl = gsap.timeline();

    timelineRef.current = tl;

    tl.fromTo(
      imageWrapRef.current,
      {
        clipPath: "inset(15% 15% 15% 15%)",
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.6,
        ease: "smoothReveal",
      },
    )

      .fromTo(
        imageRef.current,
        {
          scale: 1.05,
          autoAlpha: 0,
        },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        0,
      )

      .fromTo(
        headingRef.current,
        {
          y: 30,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: "power3.out",
        },
        0.1,
      )

      .fromTo(
        descRef.current,

        {
          y: 15,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 0.7,
          duration: 0.45,
          ease: "power3.out",
        },
        0.15,
      );
  }, []);

  // =====================================
  // CHANGE SLIDE
  // =====================================

  const changeSlide = useCallback(
    (directionOrIndex: "next" | "prev" | number) => {
      if (isAnimating.current) return;

      if (!gsapRef.current) return;

      const gsap = gsapRef.current;

      isAnimating.current = true;

      let nextIndex = active;
      if (typeof directionOrIndex === "number") {
        nextIndex = directionOrIndex;
      } else {
        nextIndex =
          directionOrIndex === "next"
            ? (active + 1) % slides.length
            : active === 0
              ? slides.length - 1
              : active - 1;
      }

      timelineRef.current?.kill();

      const tl = gsap.timeline({
        onComplete: () => {
          setActive(nextIndex);

          requestAnimationFrame(() => {
            animateIn();

            isAnimating.current = false;
          });
        },
      });

      timelineRef.current = tl;

      tl.to(
        imageWrapRef.current,
        {
          clipPath: "inset(15% 15% 15% 15%)",
          duration: 0.3,
          ease: "smoothReveal",
        },
        0,
      )

        .to(
          imageRef.current,
          {
            scale: 0.96,
            autoAlpha: 0,
            duration: 0.25,
            ease: "power2.out",
          },
          0,
        )

        .to(
          headingRef.current,
          {
            y: -20,
            autoAlpha: 0,
            duration: 0.2,
            ease: "power2.out",
          },
          0,
        )

        .to(
          descRef.current,
          {
            y: -10,
            autoAlpha: 0,
            duration: 0.18,
            ease: "power2.out",
          },
          0.02,
        );
    },
    [active, slides.length, animateIn],
  );

  // =====================================
  // HANDLERS
  // =====================================

  const handlePrev = useCallback(() => {
    changeSlide("prev");
  }, [changeSlide]);

  const handleNext = useCallback(() => {
    changeSlide("next");
  }, [changeSlide]);

  // =====================================
  // RENDER
  // =====================================

  return (
    <section ref={reviewsHeaderRef} className={`${className} relative overflow-hidden`}>
      <div className="container-wrapper relative">
        <Image
          className="pointer-events-none absolute left-0 z-0 h-full w-full"
          src="/images/svg/included-bg.svg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
        />

        {data?.smallHeading && (
          <div className="reviews-small-heading mb-4 text-center">
            <SectionDescription isline={true}>
              {data.smallHeading.replace(/^[-\s—]+/, "")}
            </SectionDescription>
          </div>
        )}

        <div className="reviews-main-heading">
          <SectionHeading className="text-center">
            {data?.sectionHeading}
          </SectionHeading>
        </div>

        <div className="mx-auto mt-12 w-full max-w-195 sm:mt-14">
          {/* IMAGE WRAPPER WITH NAV BUTTONS */}
          <div className="relative">
            {/* LEFT BUTTON (Desktop only) */}
            <button
              onClick={handlePrev}
              className="group absolute top-1/2 -left-16 z-20 hidden -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-white/10 p-2 md:flex md:h-12 md:w-12 md:p-3 lg:-left-20 lg:h-14 lg:w-14 xl:-left-24"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-white transition-transform duration-500 group-hover:scale-100" />
              <ArrowIcon className="relative z-10 rotate-180 text-white transition-colors duration-300 group-hover:text-black" />
            </button>

            {/* IMAGE CONTAINER */}
            <div
              ref={imageWrapRef}
              className="relative h-75 overflow-hidden will-change-[clip-path,transform,opacity] md:h-96"
            >
              <div
                ref={imageRef}
                className="relative h-full w-full transform-[translateZ(0)]"
              >
                {slides.map((slide, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 ${
                      idx === active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={slide.image || ""}
                      alt={slide.heading || ""}
                      fill
                      loading="eager"
                      sizes="(max-width: 820px) 100vw, 780px"
                      className="object-contain"
                    />
                  </div>
                ))}

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent z-15" />
              </div>
            </div>

            {/* RIGHT BUTTON (Desktop only) */}
            <button
              onClick={handleNext}
              className="group absolute top-1/2 -right-16 z-20 hidden -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-white/10 p-2 md:flex md:h-12 md:w-12 md:p-3 lg:-right-20 lg:h-14 lg:w-14 xl:-right-24"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-white transition-transform duration-500 group-hover:scale-100" />
              <ArrowIcon className="relative z-10 text-white transition-colors duration-300 group-hover:text-black" />
            </button>
          </div>

          {/* TEXT */}
          <div className="mt-6 text-center">
            <div ref={headingRef}>
              <SectionDescription
                key={active}
                isline={false}
                className="text-center"
              >
                {currentSlide?.heading}
              </SectionDescription>
            </div>

            <p
              ref={descRef}
              className="text-antiflash mx-auto mt-3 text-sm leading-[120%] sm:text-base md:max-w-[80%] md:text-lg lg:text-xl"
            >
              {currentSlide?.description}
            </p>
          </div>

          {/* DOTS */}
          <div className="mt-10 hidden items-center justify-center gap-3 md:flex">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index === active) return;
                  changeSlide(index);
                }}
                className={`rounded-full transition-all duration-700 ${
                  active === index
                    ? "h-1.5 w-10 bg-white"
                    : "h-1.5 w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>

          {/* MOBILE BUTTONS */}
          <div className="mt-8 flex items-center justify-center gap-4 md:hidden">
            <button
              onClick={handlePrev}
              className="group relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 p-2"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-white transition-transform duration-500 group-hover:scale-100" />
              <ArrowIcon className="relative z-10 rotate-180 text-white transition-colors duration-300 group-hover:text-black" />
            </button>

            <button
              onClick={handleNext}
              className="group relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 p-2"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-white transition-transform duration-500 group-hover:scale-100" />
              <ArrowIcon className="relative z-10 text-white transition-colors duration-300 group-hover:text-black" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
