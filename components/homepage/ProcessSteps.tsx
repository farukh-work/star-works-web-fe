const steps = [
  { n: "01", title: "Discover", text: "A free call to understand your goal, users and budget.", time: "1 week" },
  { n: "02", title: "Plan", text: "Scope, pages or screens, timeline and a fixed quote.", time: "1 week" },
  { n: "03", title: "Design", text: "Wireframes and a clickable design you approve before we build.", time: "1–2 weeks" },
  { n: "04", title: "Build", text: "Development with weekly demos so you always see progress.", time: "2–6 weeks" },
  { n: "05", title: "Launch", text: "Testing, setup, go-live and a handover walkthrough.", time: "1 week" },
  { n: "06", title: "Grow", text: "Support, fixes and improvements after launch.", time: "Ongoing" },
];

const ProcessSteps = () => (
  <section className="py-16 lg:py-24">
    <div className="container-wrapper">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-primary text-sm font-semibold">How we work</p>
        <h2 className="font-switzer mt-3 text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          A simple path from idea to launch
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          Six clear steps, so you always know what happens next. Timelines are typical and depend on the project.
        </p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <span className="text-primary text-sm font-bold">{s.n}</span>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">{s.time}</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSteps;
