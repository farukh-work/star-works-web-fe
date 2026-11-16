"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import SectionHeading from "../common/SectionHeading";
import DeliverablesCard from "./DeliverablesCard";
gsap.registerPlugin(ScrollTrigger);
const Deliverables: React.FC<DeliverablesProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const processData = data?.items || [];

  useEffect(() => {
    let ctx: gsap.Context;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Heading Animation
        gsap.from(".deliverables-heading", {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".deliverables-heading",
                        toggleActions: "play none none reverse",
          },
        });

        // Background top curve animation
        gsap.fromTo(".deliverables-top-img", 
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "none",
            scrollTrigger: {
              trigger: ".deliverables-top-img",
                            end: "bottom 30%",
              scrub: 1.2,
            }
          }
        );

        // Background bottom curve animation
        gsap.fromTo(".deliverables-bottom-img", 
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "none",
            scrollTrigger: {
              trigger: ".deliverables-bottom-img",
                            end: "bottom 30%",
              scrub: 1.2,
            }
          }
        );

        const cards = gsap.utils.toArray<HTMLElement>(".process-card");

        cards.forEach((card, index) => {
          const lineFill = card.querySelector<HTMLElement>(".line-fill");

          const tags = card.querySelectorAll<HTMLElement>(".tag");

          const title = card.querySelector<HTMLElement>(".title");

          const desc = card.querySelector<HTMLElement>(".desc");

          const contentBox = card.querySelector<HTMLElement>(".deliverables-content-box");

          if (!lineFill || !tags.length || !title || !desc) return;

          // INITIAL STATE

          gsap.set(lineFill, {
            height: "0%",
          });

          gsap.set(tags, {
            background: "var(--color-text-inactive-tag)",
            color: "var(--color-bg-inactive-tag)",
          });

          const isRight = index % 2 === 0;
          if (contentBox) {
            const isMobile = typeof window !== 'undefined' && window.matchMedia("(max-width: 639px)").matches;
            const startX = isMobile ? 0 : (isRight ? 100 : -100);
            const startY = isMobile ? 30 : 0;
            gsap.set(contentBox, {
              opacity: 0,
              x: startX,
              y: startY,
            });
          }

          // TIMELINE

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
                            end: "top 40%",
              scrub: 0.3,
            },
          });

          // CONTENT BOX ANIMATION
          if (contentBox) {
            tl.to(
              contentBox,
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.4,
                ease: "power3.out",
              },
              0.05,
            );
          }

          // TAG

          tl.to(
            tags,
            {
              backgroundImage:
                "linear-gradient(90deg, var(--color-orange-start) 0%, var(--color-orange-end) 100%)",
              color: "var(--color-text-active)",
              duration: 0.2,
              ease: "power1.out",
            },
            0,
          );

          // LINE

          tl.to(
            lineFill,
            {
              height: "100%",
              duration: 0.5,
              ease: "none",
            },
            0.08,
          );

          // TITLE

          tl.to(
            title,
            {
              color: "var(--color-text-active)",
              duration: 0.3,
              ease: "power1.out",
            },
            0.1,
          );

          // DESC

          tl.to(
            desc,
            {
              color: "var(--color-text-active)",
              duration: 0.3,
              ease: "power1.out",
            },
            0.12,
          );
        });
      }, containerRef);
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  if (!processData.length) return null;

  return (
    <section ref={containerRef} className="section-spacing-top relative mx-auto w-full max-w-284 px-4">
      <div className="deliverables-heading">
        <SectionHeading className="w-full text-center sm:mb-10">
          {data.sectionHeading}
        </SectionHeading>
      </div>
      <div className="w-full">
        <Image
          className="deliverables-top-img pointer-events-none absolute top-0 left-0 h-1/2 w-full"
          src="/images/png/deliverables-top.png"
          width={1120}
          height={1133}
          alt="deliverables-top"
        />

        <Image
          className="deliverables-bottom-img pointer-events-none absolute top-[41.7%] left-0 h-[55%] w-full"
          src="/images/png/deliverables-bottom.png"
          width={1120}
          height={1133}
          alt="deliverables-bottom"
        />

        <div
          className="relative mx-auto max-w-219 space-y-8"
        >
          {processData.map((item, index) => (
            <DeliverablesCard
              key={index}
              item={item}
              isRight={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deliverables;
