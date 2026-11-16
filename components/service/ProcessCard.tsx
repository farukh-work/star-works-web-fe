import Image from "next/image";
import React from "react";
import SplitTextAnimation from "../common/HoverSplitText";

type ProcessData = {
  number: string;
  title: string;
  description: string;
};

type Props = {
  data: ProcessData;
  align?: "left" | "right" | "center";
};

const ProcessCard: React.FC<Props> = ({ data, align = "left" }) => {
  return (
    <article
      className={`flex flex-col ${
        align === "right"
          ? "text-center md:items-end md:text-right"
          : align === "center"
            ? "items-center text-center"
            : "text-center md:items-start md:text-left"
      }`}
    >
      <SplitTextAnimation>
        <span className="font-voyage text-antiflash text-2xl! tracking-[-3%] lg:text-3xl! xl:text-4xl!">
          {data.number}
        </span>
      </SplitTextAnimation>
      <SplitTextAnimation>
        <h3 className="font-voyage text-antiflash text-2xl! tracking-[-3%] lg:text-3xl! xl:text-4xl!">
          {data.title}
        </h3>
      </SplitTextAnimation>
      <SplitTextAnimation>
        <p className="font-switzer text-antiflash text-sm leading-[160%] font-medium sm:text-base">
          {data.description}
        </p>
      </SplitTextAnimation>
      <Image
        className="mt-6 w-full object-cover"
        src="/images/png/card-line.png"
        width={403}
        height={20}
        alt="line"
      />
    </article>
  );
};

export default ProcessCard;
