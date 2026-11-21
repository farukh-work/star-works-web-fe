import Link from "next/link";
import { siteFacts } from "@/lib/siteFacts";

const AboutIntro = () => {
  const { stats } = siteFacts;
  const cards = [
    { value: stats.years, label: "Years building for clients" },
    { value: stats.projects, label: "Projects delivered" },
    { value: stats.rating, label: "Average rating on Fiverr and Upwork" },
  ];
  return (
    <section className="py-16 lg:py-24">
      <div className="container-wrapper">
        <div className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-16">
          <p className="text-sm font-medium text-[#4d5f56]">About Star Works</p>
          <div>
            <p className="font-switzer text-2xl leading-[1.25] font-semibold tracking-tight text-[#10211a] sm:text-3xl lg:text-5xl">
              We design and build websites, mobile apps and AI automation for founders and growing
              businesses.{" "}
              <span className="text-[#10211a]/40">
                A small, hands-on team stays with your project from the first call to launch and
                beyond, with clear scope, honest timelines and regular updates.
              </span>
            </p>
            <Link
              href="/about"
              className="keep-dark mt-8 inline-flex rounded-full bg-[#10211a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0b7a3a]"
            >
              Meet the team &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-3 lg:gap-4">
          {cards.map((c, i) => (
            <div
              key={c.label}
              className={`flex min-h-44 flex-col justify-between rounded-3xl p-6 ${
                i === 1 ? "bg-primary text-black" : "border border-[#10211a]/10 bg-white text-[#10211a]"
              }`}
            >
              <p className="text-5xl font-semibold tracking-tight">{c.value}</p>
              <p className={`text-sm ${i === 1 ? "text-black/70" : "text-[#4d5f56]"}`}>{c.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
