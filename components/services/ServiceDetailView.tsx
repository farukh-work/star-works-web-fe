import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import { siteFacts } from "@/lib/siteFacts";

const clean = (v?: string) => (v || "").replace(/\s+/g, " ").trim();

export const DetailHero = ({ title, data }: { title?: string; data?: any }) => {
  const heading = clean(data?.heading || title);
  const img = data?.heroImage?.asset ? urlFor(data.heroImage).width(1400).url() : "";
  return (
    <section className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-24">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-primary/20 to-transparent" />
      <div className="container-wrapper relative grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Link href="/services" className="text-primary text-sm font-semibold">&larr; All services</Link>
          <h1 className="font-switzer mt-4 text-4xl leading-[1.08] font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {heading}
          </h1>
          {data?.descriptionOne && <p className="mt-6 text-base leading-relaxed text-white/75 sm:text-lg">{clean(data.descriptionOne)}</p>}
          {data?.descriptionTwo && <p className="mt-3 text-sm leading-relaxed text-white/55">{clean(data.descriptionTwo)}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={siteFacts.calLink} target="_blank" rel="noopener noreferrer" className="bg-primary rounded-full px-7 py-3.5 text-sm font-bold text-black transition hover:brightness-110">
              Book a free call &rarr;
            </Link>
            <Link href="/portfolio" className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
              See examples
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          {img && <Image src={img} alt={heading} fill sizes="(min-width: 1024px) 50vw, 100vw" priority className="object-cover" />}
        </div>
      </div>
    </section>
  );
};

export const IncludedGrid = ({ data }: { data?: any }) => {
  const slides = (data?.slides || []).filter((s: any) => s?.heading);
  if (!slides.length) return null;
  return (
    <section className="py-16 lg:py-24">
      <div className="container-wrapper">
        <h2 className="font-switzer max-w-xl text-3xl leading-tight font-semibold tracking-tight text-[#10211a] sm:text-4xl lg:text-5xl">
          {clean(data?.sectionHeading) || "What's included"}
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {slides.map((s: any) => (
            <div key={s.heading} className="overflow-hidden rounded-3xl border border-[#10211a]/10 bg-white">
              {s.image && (
                <div className="relative aspect-[16/10] bg-[#eef4f0]">
                  <Image src={s.image} alt={clean(s.heading)} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#10211a]">{clean(s.heading)}</h3>
                {s.description && <p className="mt-2 text-sm leading-relaxed text-[#4d5f56]">{clean(s.description)}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ProcessCards = ({ data }: { data?: any }) => {
  const cards = (data?.processCards || []).filter((c: any) => c?.title);
  if (!cards.length) return null;
  return (
    <section className="py-16 lg:py-24">
      <div className="container-wrapper">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-primary text-sm font-semibold">Our process</p>
          <h2 className="font-switzer mt-3 text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {clean(data?.sectionHeading) || "How we do it"}
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c: any, i: number) => (
            <div key={c.title + i} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <span className="text-primary text-sm font-bold">{clean(c.number) || String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-lg font-semibold text-white">{clean(c.title)}</h3>
              {c.description && <p className="mt-2 text-sm leading-relaxed text-white/65">{clean(c.description)}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const DeliverablesAndTech = ({ deliverables, tech }: { deliverables?: any; tech?: any }) => {
  const items = (deliverables?.items || []).filter((i: any) => i?.title);
  const techs = (tech?.technologies || []).filter((t: any) => t?.title);
  if (!items.length && !techs.length) return null;
  return (
    <section className="py-16 lg:py-24">
      <div className="container-wrapper grid gap-12 lg:grid-cols-2">
        {!!items.length && (
          <div>
            <h2 className="font-switzer text-3xl leading-tight font-semibold tracking-tight text-[#10211a] sm:text-4xl">
              {clean(deliverables?.sectionHeading) || "What you get"}
            </h2>
            <ul className="mt-8 space-y-5">
              {items.map((i: any) => (
                <li key={i.title} className="flex gap-3">
                  <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#e6f9ee] text-xs font-bold text-[#0b7a3a]">&#10003;</span>
                  <div>
                    <p className="font-semibold text-[#10211a]">{clean(i.title)}</p>
                    {i.description && <p className="mt-1 text-sm leading-relaxed text-[#4d5f56]">{clean(i.description)}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {!!techs.length && (
          <div>
            <h2 className="font-switzer text-3xl leading-tight font-semibold tracking-tight text-[#10211a] sm:text-4xl">
              {clean(tech?.sectionHeading) || "Tools we use"}
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {techs.map((t: any) => (
                <span key={t.title} className="inline-flex items-center gap-2 rounded-full border border-[#10211a]/10 bg-white px-4 py-2 text-sm font-medium text-[#10211a]">
                  {t.image && <Image src={t.image} alt="" width={20} height={20} className="size-5 object-contain" />}
                  {clean(t.title)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
