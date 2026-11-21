import Link from "next/link";
import { siteFacts } from "@/lib/siteFacts";

const steps = [
  { n: "01", title: "Discover", text: "A free call to understand your goal, your users and your budget.", time: "1 week" },
  { n: "02", title: "Plan", text: "Scope, pages or screens, timeline and a fixed quote with milestones.", time: "1 week" },
  { n: "03", title: "Design", text: "Wireframes and a clickable design that you approve before we build.", time: "1-2 weeks" },
  { n: "04", title: "Build", text: "Development with weekly demos, so you always see real progress.", time: "2-6 weeks" },
  { n: "05", title: "Launch", text: "Testing, setup, go-live and a walkthrough of how to manage it.", time: "1 week" },
  { n: "06", title: "Grow", text: "Support, fixes and improvements after launch, plus automation when you need it.", time: "Ongoing" },
];

// Sticky intro on the left, a single connected timeline on the right (no boxed cards).
const ProcessSteps = () => (
  <section className="py-16 lg:py-28">
    <div className="container-wrapper grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <p className="text-primary text-sm font-semibold">How we work</p>
        <h2 className="font-switzer mt-3 text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          A simple path from idea to launch
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
          Six clear steps, so you always know what happens next. Timelines are typical and depend on the project.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={siteFacts.calLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary rounded-full px-6 py-3 text-sm font-bold text-black transition hover:brightness-110"
          >
            Book a free call &rarr;
          </Link>
          <Link href="/roadmap" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            Full roadmap
          </Link>
        </div>
      </div>

      <ol className="relative">
        <span className="absolute top-3 bottom-3 left-[1.15rem] w-px bg-linear-to-b from-primary/60 via-white/15 to-transparent sm:left-[1.4rem]" aria-hidden />
        {steps.map((s) => (
          <li key={s.n} className="group relative flex gap-5 pb-10 last:pb-0 sm:gap-7">
            <span className="bg-moss border-primary/60 text-primary group-hover:bg-primary relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition group-hover:text-black sm:size-11 sm:text-sm">
              {s.n}
            </span>
            <div className="flex-1 border-b border-white/10 pb-10 group-last:border-0 group-last:pb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">{s.title}</h3>
                <span className="text-primary text-xs font-semibold tracking-wide uppercase">{s.time}</span>
              </div>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/65 sm:text-base">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default ProcessSteps;
