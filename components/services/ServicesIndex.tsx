import Image from "next/image";
import Link from "next/link";
import { siteFacts } from "@/lib/siteFacts";

type Slide = { title?: string; slug?: { current?: string }; image?: string };
const clean = (v?: string) => (v || "").replace(/\s+/g, " ").trim();

export const ServicesHero = () => (
  <section className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28">
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-primary/20 to-transparent" />
    <div className="container-wrapper relative text-center">
      <p className="text-primary text-sm font-semibold">Services</p>
      <h1 className="font-switzer mx-auto mt-4 max-w-4xl text-4xl leading-[1.08] font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
        Everything you need to launch and grow online
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
        Websites, mobile apps, AI automation and design. Choose one service or combine them, and we will
        plan it together on a free call.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={siteFacts.calLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary rounded-full px-7 py-3.5 text-sm font-bold text-black transition hover:brightness-110"
        >
          Book a free call &rarr;
        </Link>
        <Link href="/portfolio" className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
          View our work
        </Link>
      </div>
    </div>
  </section>
);

export const ServicesGrid = ({ slides = [] }: { slides?: Slide[] }) => {
  const items = slides.filter((s) => s?.title && s?.slug?.current);
  if (!items.length) return null;
  return (
    <section className="py-16 lg:py-24">
      <div className="container-wrapper">
        <h2 className="font-switzer max-w-xl text-3xl leading-[1.1] font-semibold tracking-tight text-[#10211a] sm:text-4xl lg:text-5xl">
          What we do
        </h2>
        <div className="mt-12 border-t border-[#10211a]/15">
          {items.map((s, i) => (
            <Link
              key={s.slug!.current}
              href={`/services/${s.slug!.current}`}
              className="group grid items-center gap-5 border-b border-[#10211a]/15 py-6 transition-colors hover:bg-[#10211a]/[0.03] sm:grid-cols-[3rem_1fr_11rem_3rem] sm:gap-8 lg:py-8"
            >
              <span className="text-sm font-semibold text-[#0b7a3a]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-3xl leading-tight font-semibold tracking-tight text-[#10211a] transition-transform duration-300 group-hover:translate-x-2 lg:text-5xl">
                {clean(s.title)}
              </h3>
              <div className="relative hidden aspect-[16/10] overflow-hidden rounded-2xl bg-[#eef4f0] sm:block">
                {s.image && (
                  <Image
                    src={s.image}
                    alt={clean(s.title)}
                    fill
                    sizes="176px"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                )}
              </div>
              <span className="hidden size-11 items-center justify-center rounded-full border border-[#10211a]/20 text-lg text-[#10211a] transition group-hover:border-transparent group-hover:bg-[#10211a] group-hover:text-white sm:flex">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
