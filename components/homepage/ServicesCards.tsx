import Link from "next/link";

const services = [
  {
    title: "Websites",
    text: "Fast, clear websites that explain what you do and turn visitors into enquiries.",
    href: "/services",
  },
  {
    title: "Mobile apps",
    text: "iOS and Android apps, from first screen to the app stores.",
    href: "/services",
    featured: true,
  },
  {
    title: "AI agents & automation",
    text: "Chatbots, lead follow-up, invoicing and workflows that save your team hours.",
    href: "/services",
  },
  {
    title: "UI/UX & product design",
    text: "Research, wireframes and polished interfaces your users understand at once.",
    href: "/services",
  },
];

const ServicesCards = () => (
  <section className="py-16 lg:py-24">
    <div className="container-wrapper">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <h2 className="font-switzer max-w-xl text-3xl leading-tight font-semibold tracking-tight text-[#10211a] sm:text-4xl lg:text-5xl">
          What we build for you
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-[#4d5f56]">
          Pick one service or combine them. Every project starts with a free call so we understand your goal first.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            className={
              s.featured
                ? "flex min-h-64 flex-col justify-between rounded-3xl border border-[#10211a]/10 bg-white p-6 shadow-xl transition hover:-translate-y-1 lg:-rotate-2"
                : "keep-dark flex min-h-64 flex-col justify-between rounded-3xl bg-[#0b1a12] p-6 text-white transition hover:-translate-y-1"
            }
          >
            <h3 className={`text-xl font-semibold ${s.featured ? "text-[#10211a]" : ""}`}>{s.title}</h3>
            <div>
              <p className={`text-sm leading-relaxed ${s.featured ? "text-[#4d5f56]" : "text-white/70"}`}>{s.text}</p>
              <span className={`mt-4 inline-block text-sm font-semibold ${s.featured ? "text-[#0b7a3a]" : "text-primary"}`}>
                Learn more &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesCards;
