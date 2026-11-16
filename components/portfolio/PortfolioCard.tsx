// PortfolioCard.tsx
"use client";

import Image from "next/image";
import { ArrowForLinkIcon, CheckIcon } from "../common/Icons";
import Link from "next/link";

type PortfolioCardProps = {
  data: {
    title: string;
    slug: {
      current: string;
    };
    description: string;
    image: string;

    features: {
      title: string;
      text: string;
    }[];

    tech: string[];
    metric: string;
    buttonText?: string;
    path?: string;
  };

  index: number;
};
const getProjectHref = (path?: string, slug?: string) => {
  const target = (path || slug || "").trim();
  if (target.startsWith("http://") || target.startsWith("https://")) {
    return target;
  }
  const cleanPath = target
    .replace(/^\/?portfolio\/?/, "")
    .replace(/^\//, "")
    .trim();
  return `/portfolio/${cleanPath}`;
};

const PortfolioCard = ({ data, index }: PortfolioCardProps) => {
  return (
    <article
      className={`portfolio-card flex flex-col overflow-hidden rounded-[20px] border border-white/10 md:flex-row md:rounded-[28px] ${
        index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* LEFT IMAGE */}
      <div className="relative h-[220px] w-full overflow-hidden sm:h-[260px] md:h-auto md:w-[40%]">
        {data?.image && (
          <Image
            src={data.image}
            alt={data?.title || ""}
            fill
            className="object-cover"
          />
        )}
      </div>
      {/* RIGHT CONTENT */}
      <div className="flex w-full flex-col justify-between p-5 md:w-[60%] md:p-8 lg:p-10">
        <div>
          {/* CATEGORY + YEAR */}

          {/* TITLE */}
          <h3 className="font-voyage text-[28px] leading-[110%] text-white md:text-[32px] lg:text-[40px]">
            {data?.title}
          </h3>

          {/* DESCRIPTION */}
          <p className="mt-5 text-sm leading-[160%] text-white/60 sm:text-base md:text-sm">
            {data?.description}
          </p>

          {/* FEATURES */}
          <div className="mt-4 flex flex-col gap-2">
            {(data?.features || []).map((item, index) => (
              <div key={index} className="group/item flex items-start gap-4">
                {/* ICON */}
                <span className="bg-primary/10 border-primary/20 text-primary group-hover/item:border-primary/50 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all duration-300">
                  <CheckIcon />
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="group-hover/item:text-primary text-sm font-semibold text-white transition-colors duration-300">
                    {item?.title}
                  </h4>
                  <p className="mt-1 text-xs leading-[170%] wrap-break-word text-white/40">
                    {item?.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* TECH STACK */}
          <div className="mt-4 flex flex-wrap gap-2">
            {(data?.tech || []).map((tech, index) => (
              <span
                key={index}
                className="bg-primary/5 text-primary border-primary/10 hover:border-primary/30 rounded border px-3 py-1 text-[11px] transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
              Performance Metric
            </span>

            <span className="text-primary mt-1 text-[22px] font-bold">
              {data?.metric}
            </span>
          </div>

          {(data?.path || data?.slug?.current) && (
            <Link
              href={getProjectHref(data.path, data.slug?.current)}
              target={data.path?.startsWith("http") ? "_blank" : undefined}
              className="group hover:border-primary hover:text-primary flex max-w-fit items-center gap-2 border-b border-white/20 pb-1 text-sm font-semibold text-white transition-all duration-300"
            >
              {data.buttonText || "VIEW PROJECT"}
              <ArrowForLinkIcon />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default PortfolioCard;
