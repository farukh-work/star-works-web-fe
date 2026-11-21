import Link from "next/link";

const services = [
  {
    n: "01",
    title: "Websites",
    text: "Fast, clear websites that explain what you do and turn visitors into enquiries.",
    tags: ["Next.js", "CMS", "SEO"],
  },
  {
    n: "02",
    title: "Mobile apps",
    text: "iOS and Android apps, from the first screen to the app stores.",
    tags: ["iOS", "Android", "React Native"],
  },
  {
    n: "03",
    title: "AI agents & automation",
    text: "Chatbots, lead follow-up, invoicing and workflows that save your team hours every week.",
    tags: ["AI agents", "WhatsApp", "CRM"],
  },
  {
    n: "04",
    title: "UI/UX & product design",
    text: "Research, wireframes and polished interfaces that your users understand at once.",
    tags: ["Figma", "Prototypes", "Design systems"],
  },
];

// Large typographic rows instead of boxed cards.
const ServicesCards = () => (
  <section className="py-16 lg:py-24">
    <div className="container-wrapper">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <h2 className="font-switzer max-w-xl text-3xl leading-[1.1] font-semibold tracking-tight text-[#10211a] sm:text-4xl lg:text-5xl">
          What we build for you
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-[#4d5f56]">
          Pick one service or combine them. Every project starts with a free call so we understand your goal first.
        </p>
      </div>
      <div className="mt-12 border-t border-[#10211a]/15">
        {services.map((s) => (
          <Link
            key={s.n}
            href="/services"
            className="group grid items-center gap-4 border-b border-[#10211a]/15 py-8 transition-colors hover:bg-[#10211a]/[0.03] sm:grid-cols-[4rem_1.2fr_1fr_3rem] sm:gap-8 lg:py-10"
          >
            <span className="text-sm font-semibold text-[#0b7a3a]">{s.n}</span>
            <h3 className="text-3xl leading-tight font-semibold tracking-tight text-[#10211a] transition-transform duration-300 group-hover:translate-x-2 lg:text-5xl">
              {s.title}
            </h3>
            <div>
              <p className="text-sm leading-relaxed text-[#4d5f56] sm:text-base">{s.text}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="rounded-full border border-[#10211a]/15 px-3 py-1 text-xs text-[#4d5f56]">
                    {t}
                  </span>
                ))}
              </div>
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

export default ServicesCards;
