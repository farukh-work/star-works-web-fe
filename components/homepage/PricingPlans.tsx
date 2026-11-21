import Link from "next/link";
import { siteFacts } from "@/lib/siteFacts";

const PricingPlans = () => (
  <section className="py-16 lg:py-24">
    <div className="container-wrapper">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-primary text-sm font-semibold">Pricing</p>
        <h2 className="font-switzer mt-3 text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Clear starting prices, no surprises
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          Every project is quoted after a free call. These are starting points to help you plan.
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-4 lg:grid-cols-3">
        {siteFacts.plans.map((p) => {
          const hl = "highlight" in p && p.highlight;
          return (
            <div
              key={p.name}
              className={
                hl
                  ? "bg-primary flex flex-col rounded-3xl p-7 text-black"
                  : "flex flex-col rounded-3xl border border-white/10 bg-white/5 p-7 text-white"
              }
            >
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-4 text-3xl font-semibold">{p.price}</p>
              <p className={`mt-2 text-sm ${hl ? "text-black/70" : "text-white/60"}`}>{p.blurb}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden>&#10003;</span>
                    <span className={hl ? "text-black/80" : "text-white/75"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={siteFacts.calLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 rounded-full px-6 py-3 text-center text-sm font-bold transition ${
                  hl ? "bg-black text-white hover:bg-black/85" : "bg-white text-black hover:bg-white/90"
                }`}
              >
                Book a free call &rarr;
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default PricingPlans;
