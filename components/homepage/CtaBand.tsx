import Link from "next/link";
import { siteFacts } from "@/lib/siteFacts";

const CtaBand = () => (
  <section className="py-16 lg:py-24">
    <div className="container-wrapper">
      <div className="bg-primary rounded-[2rem] px-6 py-14 text-center text-black lg:px-16 lg:py-20">
        <h2 className="font-switzer mx-auto max-w-3xl text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-6xl">
          Ready to start your project?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-black/70">
          Book a free 30-minute call. Tell us your goal and we will tell you honestly how we would approach it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={siteFacts.calLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-black px-7 py-3.5 text-sm font-bold text-white transition hover:bg-black/85"
          >
            Book a free call &rarr;
          </Link>
          <Link
            href="/contact-us"
            className="rounded-full border border-black/30 px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-black/10"
          >
            Send a message
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default CtaBand;
