  "use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import SplitType from "split-type";
import SectionDescription from "../common/SectionDescription";
import SectionHeading from "../common/SectionHeading";
import { urlFor } from "@/sanity/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutUs = ({ data }: AboutUsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<(HTMLHeadingElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Mobile Fallback Heading "EVERYTHING" Animation — the heading is
      // `sm:hidden`, so skip the (reflow-heavy) SplitType entirely on screens
      // where it's never shown instead of splitting an invisible element.
      const isMobileViewport = window.matchMedia("(max-width: 639px)").matches;
      const mobileHeading = isMobileViewport
        ? sectionRef.current.querySelector("h2.sm\\:hidden")
        : null;
      if (mobileHeading) {
        const split = new SplitType(mobileHeading as HTMLElement, {
          types: "chars",
        });
        gsap.from(split.chars, {
          opacity: 0,
          y: 20,
          stagger: 0.05,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mobileHeading,
                        toggleActions: "play none none reverse",
          },
        });
      }

      // Heading (small + main) Entrance
      gsap.from([".about-small-heading", ".about-main-heading"], {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
                    toggleActions: "play none none reverse",
        },
      });

      // Description Entrance (from right)
      gsap.from(".about-description", {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-description",
                    toggleActions: "play none none reverse",
        },
      });

      // Stats Count-up Animation
      statsRef.current.forEach((statEl, index) => {
        if (!statEl) return;
        const targetValue = data?.stats?.[index]?.number || 0;
        gsap.fromTo(
          statEl,
          { innerText: "0" },
          {
            innerText: targetValue,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power2.out",
            scrollTrigger: {
              trigger: statEl,
                          },
            onUpdate: function () {
              // Keep the innerText as just the number
              statEl.innerText = Math.ceil(
                Number(this.targets()[0].innerText),
              ).toString();
            },
          },
        );
      });

      // Center Image & Stats Entrance (from bottom)
      gsap.from(".about-center-wrapper", {
        y: 100,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-center-wrapper",
                    toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="section-spacing-top relative overflow-hidden px-4"
    >
      <div className="relative z-10 container mx-auto mb-8 text-center lg:mb-14">
        <div className="about-small-heading">
          <SectionDescription isline={true}>
            {data?.smallHeading}
          </SectionDescription>
        </div>
        <div className="about-main-heading">
          <SectionHeading className="my-6">{data?.heading}</SectionHeading>
        </div>
        <p className="about-description mx-auto md:max-w-[60%]">
          {data?.description}
        </p>
      </div>
      <div className="about-center-wrapper container-wrapper relative h-100 w-full overflow-hidden rounded-2xl px-0! sm:flex sm:items-end md:h-150 md:rounded-3xl">
        <Image
          src={
            data?.image
              ? urlFor(data.image).width(1400).quality(85).auto("format").url()
              : ""
          }
          alt="about-image"
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="pointer-events-none absolute h-full w-full object-cover"
        />
        <div className="about-stats-overlay">
          {data?.stats?.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center md:items-start"
            >
              <h2
                ref={(el) => {
                  statsRef.current[index] = el;
                }}
                className="font-voyage text-3xl leading-[88%] text-white md:text-4xl xl:text-5xl"
              >
                {stat.number}
              </h2>
              <h2 className="font-switzer mt-2 text-center text-[16px] leading-[110%] text-white uppercase md:text-left md:text-[20px] xl:text-2xl">
                {stat.label}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default AboutUs;
