"use client";

import { useMemo, useRef, useState } from "react";

import gsap from "gsap";

import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { playClickSound } from "@/utils/sound";
import FaqList from "../common/FaqList";
import SectionDescription from "../common/SectionDescription";
import SectionHeading from "../common/SectionHeading";
import ScrollRevealCard from "../common/ScrollRevealCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type FaqItem = {
  question: string;
  answer: string;
};

type FaqGroup = {
  categoryId: string;
  items: FaqItem[];
};

type Category = {
  id: string;
  label: string;
};

type AllAnswersProps = {
  data?: {
    faqHeadingTag?: string;
    faqHeading?: string;
    categories?: Category[];
    faqGroups?: FaqGroup[];
  };
};

const AllAnswers = ({ data }: AllAnswersProps) => {
  const categories = data?.categories || [];

  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const categorizedFaqList = data?.faqGroups || [];

  const [activeCategory, setActiveCategory] = useState(
    categories?.[0]?.id || "general",
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(".btn-chip",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: containerRef.current,
                        once: true,
          },
        }
      );
    },
    { scope: containerRef },
  );

  useGSAP(
    () => {
      gsap.fromTo(
        ".btn-chip-active",
        { scale: 0.9 },

        {
          scale: 1,
          duration: 0.4,
          ease: "back.out(2)",
        },
      );
    },
    {
      dependencies: [activeCategory],
      scope: containerRef,
    },
  );

  const filteredFaqData = useMemo(() => {
    const group = categorizedFaqList.find(
      (item) => item.categoryId === activeCategory,
    );

    return {
      items:
        group?.items?.map((item) => ({
          title: item.question,
          desc: item.answer,
        })) || [],
    };
  }, [activeCategory, categorizedFaqList]);

  return (
    <section className="container-wrapper" ref={containerRef}>
      <div className="flex flex-col items-center">
        <div className="no-scrollbar mx-auto mb-10 flex w-full max-w-[883px] min-w-0 flex-nowrap justify-start gap-3 overflow-x-auto py-2 sm:flex-wrap sm:justify-center lg:mb-15">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
              }}
              className={`btn-chip ${
                activeCategory === cat.id ? "btn-chip-active" : ""
              }`}
              style={{ opacity: 0 }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      {filteredFaqData.items.map((item, index) => (
        <ScrollRevealCard
          delay={0.04 * index}
          duration={0.45}
          key={`${activeCategory}-${index}`}
          className="faq-item-anim"
        >
          <FaqList
            item={item}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </ScrollRevealCard>
      ))}
    </section>
  );
};

export default AllAnswers;
