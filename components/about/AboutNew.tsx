import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import { siteFacts } from "@/lib/siteFacts";

export const AboutHeroNew = () => (
  <section className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28">
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-primary/20 to-transparent" />
    <div className="container-wrapper relative text-center">
      <p className="text-primary text-sm font-semibold">About Star Works</p>
      <h1 className="font-switzer mx-auto mt-4 max-w-4xl text-4xl leading-[1.08] font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
        A small team that builds websites, apps and automation
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
        We work directly with founders and growing businesses, from the first call to launch and beyond.
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
        <Link href="/roadmap" className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
          How we work
        </Link>
      </div>
    </div>
  </section>
);

export const StorySection = () => (
  <section className="py-16 lg:py-28">
    <div className="container-wrapper grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-16">
      <p className="text-sm font-medium text-[#4d5f56]">Our story</p>
      <p className="font-switzer text-2xl leading-[1.25] font-semibold tracking-tight text-[#10211a] sm:text-3xl lg:text-5xl">
        Star Works started as a small design and development agency, founded by Farukh Khan.{" "}
        <span className="text-[#10211a]/40">
          Today it operates as a brand of {siteFacts.legalName}, a registered company, and helps founders and
          growing businesses build websites, mobile apps and AI automation.
        </span>
      </p>
    </div>
  </section>
);

const principles = [
  { t: "Small team, direct access", d: "You talk to the people doing the work, not an account layer." },
  { t: "Clear scope, honest timelines", d: "We agree what is built, when and for how much before work starts, and we tell you if we are not the right fit." },
  { t: "Built to last", d: "Clean code, a CMS you can edit yourself and a handover, so you are never locked in." },
  { t: "Design people can use", d: "We design for the person using your product, so it is easy to understand and pleasant to use." },
];

export const PrinciplesSection = () => (
  <section className="py-16 lg:py-28">
    <div className="container-wrapper grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <p className="text-primary text-sm font-semibold">How we work</p>
        <h2 className="font-switzer mt-3 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          What you can expect from us
        </h2>
      </div>
      <ul className="divide-y divide-white/10 border-y border-white/10">
        {principles.map((p, i) => (
          <li key={p.t} className="grid gap-2 py-7 sm:grid-cols-[3rem_1fr] sm:gap-4">
            <span className="text-primary text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="text-xl font-semibold text-white sm:text-2xl">{p.t}</h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/65 sm:text-base">{p.d}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

type Member = { name?: string; role?: string; image?: any };

const portrait = (m: Member, w: number, h: number) =>
  m?.image?.asset ? urlFor(m.image).width(w).height(h).fit("crop").url() : "";

const Initial = ({ name, className = "" }: { name?: string; className?: string }) => (
  <div className={`bg-primary/90 flex items-center justify-center font-bold text-black ${className}`}>
    {(name || "?").charAt(0).toUpperCase()}
  </div>
);

export const TeamSection = ({ members = [] }: { members?: Member[] }) => {
  const list = members.filter((m) => m?.name);
  if (!list.length) return null;
  const [lead, ...rest] = list;
  const leadImg = portrait(lead, 900, 1100);
  return (
    <section className="py-16 lg:py-28">
      <div className="container-wrapper">
        <h2 className="font-switzer max-w-xl text-3xl leading-[1.1] font-semibold tracking-tight text-[#10211a] sm:text-4xl lg:text-5xl">
          Meet the team
        </h2>

        <div className="mt-12 grid items-center gap-10 border-y border-[#10211a]/15 py-12 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#eef4f0]">
            {leadImg ? (
              <Image src={leadImg} alt={lead.name || ""} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            ) : (
              <Initial name={lead.name} className="absolute inset-0 text-8xl" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0b7a3a]">{lead.role}</p>
            <h3 className="font-switzer mt-2 text-4xl font-semibold tracking-tight text-[#10211a] lg:text-6xl">{lead.name}</h3>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#4d5f56]">
              Farukh founded Star Works. He is your main contact: he plans each project, leads development, manages the account
              and advises on strategy, AI agents and automation.
            </p>
            <Link href="https://www.linkedin.com/in/farukh-khan1997/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm font-semibold text-[#0b7a3a]">
              Connect on LinkedIn &rarr;
            </Link>
          </div>
        </div>

        {!!rest.length && (
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {rest.map((m) => {
              const src = portrait(m, 500, 620);
              return (
                <div key={m.name}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#eef4f0]">
                    {src ? (
                      <Image src={src} alt={m.name || ""} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
                    ) : (
                      <Initial name={m.name} className="absolute inset-0 text-5xl" />
                    )}
                  </div>
                  <p className="mt-3 text-lg font-semibold text-[#10211a]">{m.name}</p>
                  <p className="text-sm text-[#4d5f56]">{m.role}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
