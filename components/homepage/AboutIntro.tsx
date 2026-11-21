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

        <div className="mt-16 grid divide-y divide-[#10211a]/15 border-y border-[#10211a]/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {cards.map((c) => (
            <div key={c.label} className="px-0 py-8 sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <p className="font-switzer text-6xl leading-none font-semibold tracking-tight text-[#10211a] lg:text-7xl">
                {c.value}
              </p>
              <p className="mt-3 max-w-[16rem] text-sm text-[#4d5f56]">{c.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
