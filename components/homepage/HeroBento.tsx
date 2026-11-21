import Link from "next/link";
import { siteFacts } from "@/lib/siteFacts";

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
    {children}
  </span>
);

const HeroBento = () => {
  const { calLink, stats, replyTime } = siteFacts;
  return (
    <section className="relative overflow-hidden pt-36 pb-16 lg:pt-44">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-linear-to-t from-primary/25 to-transparent" />
      <div className="container-wrapper relative">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            href={calLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pr-4 pl-1.5 text-sm text-white/80 transition hover:bg-white/10"
          >
            <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-black">New</span>
            Free 30-minute discovery call
          </Link>
          <h1 className="font-switzer mt-6 text-4xl leading-[1.08] font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
            Websites, mobile apps and AI automation that grow your business
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Star Works is a small, hands-on team of developers and designers. We plan, design and build
            the product, then help you launch and improve it.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={calLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary rounded-full px-7 py-3.5 text-sm font-bold text-black transition hover:brightness-110"
            >
              Book a free call &rarr;
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View our work
            </Link>
          </div>
        </div>

        {/* Bento stats row */}
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          <div className="flex min-h-44 flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/60">Find us on</p>
            <div className="flex flex-wrap gap-2">
              <Chip>Fiverr</Chip>
              <Chip>Upwork</Chip>
            </div>
          </div>
          <div className="flex min-h-44 flex-col justify-between rounded-3xl bg-white p-5 text-[#10211a]">
            <p className="text-4xl font-semibold">{stats.projects}</p>
            <p className="text-sm text-[#4d5f56]">Projects delivered for clients worldwide</p>
          </div>
          <div className="flex min-h-44 flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex h-20 items-end gap-2">
              <span className="h-10 w-full rounded-md bg-white/15" />
              <span className="h-20 w-full rounded-md bg-primary" />
              <span className="h-14 w-full rounded-md bg-white/15" />
            </div>
            <p className="text-sm text-white/70">Web &middot; Mobile &middot; AI</p>
          </div>
          <div className="bg-primary flex min-h-44 flex-col justify-between rounded-3xl p-5 text-black">
            <p className="text-4xl font-semibold">{replyTime}</p>
            <p className="text-sm text-black/70">We reply to every enquiry within this time</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBento;
