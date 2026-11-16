"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ArrowIcon } from "./MainIcons";

interface FaqItem {
  title: string;
  desc: string;
}

interface FaqListProps {
  item: FaqItem;
  index: number;
  activeIndex: number | null;
  setActiveIndex: (i: number | null) => void;
}

const FaqList = ({
  item,
  index,
  activeIndex,
  setActiveIndex,
}: FaqListProps) => {
  const isOpen = activeIndex === index;
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div className="border-antiflash border-b">
      {/* HEADER (same style) */}
      <button
        onClick={() => setActiveIndex(isOpen ? null : index)}
        className="group flex w-full cursor-pointer items-center justify-between px-3 py-3 text-left md:py-6 xl:px-6"
      >
        <span className="text-white font-voyage mr-4 text-2xl leading-[120%] tracking-[-3%] md:text-3xl lg:text-4xl xl:text-5xl">
          {item.title}
        </span>

        <span
          className={`border-midnight group-hover:text-moss flex h-10 w-10 shrink-0 items-center justify-center rounded-full border p-2.5 transition-transform duration-500 ease-in-out sm:h-14 sm:w-14 ${
            isOpen
              ? "bg-antiflash text-moss -rotate-90"
              : "text-antiflash rotate-90"
          } `}
        >
          {" "}
          <span className="absolute inset-0 scale-0 rounded-full bg-white transition-transform duration-500 group-hover:scale-100" />
          <ArrowIcon className="relative z-20" />
        </span>
      </button>

      {/* CONTENT */}
      <div
        ref={contentRef}
        style={{ height: 0, overflow: "hidden", opacity: 0 }}
      >
        <p className="text-antiflash font-switzer px-3 pb-3 text-sm leading-[160%] font-medium md:pb-6 md:text-base xl:px-6">
          {item.desc}
        </p>
      </div>
    </div>
  );
};

export default FaqList;
