import React from "react";
import SplitTextAnimation from "../common/HoverSplitText";

type DeliverableItem = {
  nextNumber: string;
  prevNumber: string;
  title: string;
  description: string;
};

type Props = {
  item: DeliverableItem;
  isRight: boolean;
};

const DeliverablesCard = ({ item, isRight }: Props) => {
  return (
    <article
      className={`process-card relative flex ${
        isRight ? "sm:justify-end" : "sm:justify-start"
      }`}
    >
      {/* CENTER LINE (desktop) */}
      <div className="top-0 bottom-0 hidden flex-col sm:absolute sm:left-1/2 sm:flex sm:-translate-x-1/2">
        {/* TAG */}
        <div className="tag bg-battleship font-switzer flex items-center gap-2 rounded-full px-2 py-1.5 text-sm leading-[110%] font-semibold text-white transition-all duration-300 sm:px-3.5 md:text-base">
          {item.prevNumber} <hr className="h-px w-2 bg-white" />{" "}
          {item.nextNumber}
        </div>

        {/* LINE */}
        <div className="bg-battleship relative mx-auto mt-8 w-0.5 flex-1 overflow-hidden">
          <div className="line-fill from-orange-start to-orange-end absolute top-0 left-0 h-0 w-full bg-linear-to-b" />
        </div>
      </div>

      {/* CONTENT */}
      <div
        className={`mt-10 w-full sm:max-w-72 md:mt-32 lg:mt-40 xl:max-w-97 deliverables-content-box ${
          isRight
            ? "text-center sm:ml-auto sm:text-left"
            : "text-center sm:mr-auto sm:text-right"
        }`}
      >
        {/* mobile tag */}
        <div className="tag bg-battleship font-switzer mx-auto mb-4 flex w-fit items-center gap-2 rounded-full px-2 py-1.5 text-sm leading-[110%] font-semibold text-white sm:hidden sm:px-3.5 md:text-base">
          {item.prevNumber} <hr className="h-px w-2 bg-white" />{" "}
          {item.nextNumber}
        </div>

        <h3 className="title font-voyage text-3xl leading-[120%] tracking-[-0.03em] text-(--color-text-inactive-title) lg:text-4xl xl:text-[44px]">
          {item.title}
        </h3>

        <p className="desc font-switzer mt-3 text-sm leading-[160%] font-medium text-(--color-text-inactive-title) md:text-base lg:mt-6">
          {item.description}
        </p>
      </div>
    </article>
  );
};

export default DeliverablesCard;
