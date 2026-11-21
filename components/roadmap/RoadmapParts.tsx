import Link from "next/link";
import { siteFacts } from "@/lib/siteFacts";

export const phases = [
  {
    n: "01",
    title: "Discover",
    time: "About 1 week",
    tagline: "We listen first.",
    text: "A free 30-minute call about your business, your customers and what success looks like. We tell you honestly if we are the right fit.",
    who: "You and Farukh",
    get: "A short summary of your goals and a recommended approach",
    need: "Your goal, rough budget and any examples you like",
  },
  {
    n: "02",
    title: "Plan",
    time: "About 1 week",
    tagline: "Clear scope before any work starts.",
    text: "We list the pages or screens, features and integrations, then agree the timeline and a fixed quote with milestones.",
    who: "Farukh and our designer",
    get: "Scope document, timeline and quote",
    need: "Approval of scope and quote",
  },
  {
    n: "03",
    title: "Design",
    time: "1 to 2 weeks",
    tagline: "See it before we build it.",
    text: "Wireframes and a clickable design in Figma. You review it, we adjust, and nothing moves to development until you approve.",
    who: "Muskan (UI/UX) and Farukh",
    get: "Approved design for every key screen",
    need: "Feedback on the design in 2 to 3 days",
  },
  {
    n: "04",
    title: "Build",
    time: "2 to 6 weeks",
    tagline: "Weekly demos, no surprises.",
    text: "Development in short steps. Each week you get a link to try what has been built, so problems show up early.",
    who: "Farukh and our developers",
    get: "A working product on a private preview link",
    need: "Content, logos and quick answers to questions",
  },
  {
    n: "05",
    title: "Launch",
    time: "About 1 week",
    tagline: "Tested, set up and live.",
    text: "We test on phones and browsers, set up hosting and analytics, go live and walk you through how to manage everything.",
    who: "Farukh",
    get: "Your live product and a handover walkthrough",
    need: "Final sign-off and your domain or store accounts",
  },
  {
    n: "06",
    title: "Grow",
    time: "Ongoing",
    tagline: "We stay with you after launch.",
    text: "Fixes, small improvements and new features as your business grows. We can also add automation and AI to save your team time.",
    who: "Farukh and the team",
    get: "Support, updates and a plan for what to improve next",
    need: "Tell us what you want to improve next",
  },
];

export const RoadmapHero = () => (
  <section className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-24">
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-primary/20 to-transparent" />
    <div className="container-wrapper relative text-center">
      <p className="text-primary text-sm font-semibold">Roadmap</p>
      <h1 className="font-switzer mx-auto mt-4 max-w-4xl text-4xl leading-[1.08] font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
        How a project runs, from first call to launch
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
        Six clear steps, so you always know what happens next, who is working on it and what you will receive.
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
        <Link href="/services" className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
          View services
        </Link>
      </div>
      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {phases.map((p) => (
          <div key={p.n} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
            <p className="text-primary text-xs font-bold">{p.n}</p>
            <p className="mt-2 text-sm font-semibold text-white">{p.title}</p>
            <p className="mt-1 text-xs text-white/55">{p.time}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-white/45">Timelines are typical and depend on the size of the project.</p>
    </div>
  </section>
);

export const PhaseList = () => (
  <section className="py-16 lg:py-24">
    <div className="container-wrapper space-y-5">
      {phases.map((p) => (
        <article key={p.n} className="grid gap-8 rounded-3xl border border-[#10211a]/10 bg-white p-6 lg:grid-cols-[1.1fr_1fr] lg:p-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#10211a] text-sm font-bold text-white">{p.n}</span>
              <span className="rounded-full bg-[#e6f9ee] px-3 py-1 text-xs font-semibold text-[#0b7a3a]">{p.time}</span>
            </div>
            <h2 className="font-switzer mt-5 text-3xl font-semibold tracking-tight text-[#10211a] lg:text-4xl">{p.title}</h2>
            <p className="mt-1 text-base font-medium text-[#0b7a3a]">{p.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-[#4d5f56] sm:text-base">{p.text}</p>
          </div>
          <dl className="space-y-4 text-sm">
            {[
              ["Who is involved", p.who],
              ["What you get", p.get],
              ["What we need from you", p.need],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-[#f4f8f5] p-4">
                <dt className="text-xs font-bold tracking-wide text-[#4d5f56] uppercase">{k}</dt>
                <dd className="mt-1 font-medium text-[#10211a]">{v}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  </section>
);

const channels = [
  ["One main contact", "You always talk to the same person, not a ticket queue."],
  ["Weekly progress update", "A short update every week: what is done, what is next, anything blocked."],
  ["Live preview links", "Try the work yourself while it is being built."],
  ["Calls when needed", "Google Meet or WhatsApp calls at times that suit your time zone."],
  ["Your tools", "We agree the channel in the first call: email, WhatsApp, Slack or your own tool."],
  ["Clear written scope", "Changes are discussed and agreed in writing before they affect time or cost."],
];

export const Communication = () => (
  <section className="py-16 lg:py-24">
    <div className="container-wrapper">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-primary text-sm font-semibold">How we communicate</p>
        <h2 className="font-switzer mt-3 text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Simple, regular and in writing
        </h2>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {channels.map(([t, d]) => (
          <div key={t} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const people = [
  {
    name: "Farukh Khan",
    role: "Founder & Full Stack Developer",
    text: "Your main contact. Farukh plans the project, leads development, manages your account and advises on strategy, AI agents and automation.",
  },
  {
    name: "Muskan Khan",
    role: "UI/UX & Product Designer",
    text: "Designs the screens and the user journey, so your product is easy to understand and pleasant to use.",
  },
  {
    name: "The team",
    role: "Developers and specialists",
    text: "Rakesh, Rohit, Nikhil and others join as your project needs them, for example for mobile apps, front end or 3D.",
  },
];

export const WhoYouWorkWith = () => (
  <section className="py-16 lg:py-24">
    <div className="container-wrapper">
      <h2 className="font-switzer max-w-xl text-3xl leading-tight font-semibold tracking-tight text-[#10211a] sm:text-4xl lg:text-5xl">
        Who you will actually work with
      </h2>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {people.map((p) => (
          <div key={p.name} className="rounded-3xl border border-[#10211a]/10 bg-white p-6">
            <span className="bg-primary flex size-14 items-center justify-center rounded-full text-xl font-bold text-black">
              {p.name.charAt(0)}
            </span>
            <h3 className="mt-5 text-xl font-semibold text-[#10211a]">{p.name}</h3>
            <p className="text-sm font-medium text-[#0b7a3a]">{p.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#4d5f56]">{p.text}</p>
          </div>
        ))}
      </div>
      <Link href="/about" className="mt-8 inline-block text-sm font-semibold text-[#0b7a3a]">
        Meet the whole team &rarr;
      </Link>
    </div>
  </section>
);

const asks = [
  "One person who can make decisions for your side",
  "Your logo, text and photos, or tell us and we will help create them",
  "Feedback within 2 to 3 working days, so the timeline holds",
  "Payments on the milestones agreed in the quote",
];

export const WhatWeAsk = () => (
  <section className="py-16 lg:py-24">
    <div className="container-wrapper grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
      <div>
        <p className="text-primary text-sm font-semibold">What we ask of you</p>
        <h2 className="font-switzer mt-3 text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          A good project is a team effort
        </h2>
      </div>
      <ul className="space-y-4">
        {asks.map((a) => (
          <li key={a} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/80">
            <span className="text-primary mt-0.5">&#10003;</span>
            {a}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export const roadmapFaq = {
  items: [
    { title: "How long does a project take?", desc: "A simple website often takes 2 to 4 weeks, while apps and automation take longer. You get an exact timeline in the quote." },
    { title: "What if I want to change something during the project?", desc: "Small tweaks are part of normal feedback rounds. Bigger changes are discussed first and agreed in writing before they affect time or cost." },
    { title: "Can you help after launch?", desc: "Yes. Many clients continue with us for fixes, improvements and new features." },
    { title: "How do payments work?", desc: "Payments follow milestones that are written into your quote, so you pay as the work progresses." },
    { title: "Do you build mobile apps and automation as well as websites?", desc: "Yes. We build websites, mobile apps, AI agents and workflow automation, and we can combine them in one project." },
  ],
  buttonText: "View all FAQs",
  buttonLink: "/faqs",
};
