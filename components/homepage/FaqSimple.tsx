import Link from "next/link";

type Item = { title?: string; desc?: string };

const FaqSimple = ({ data }: { data?: { items?: Item[]; buttonText?: string; buttonLink?: string } }) => {
  const items = (data?.items || []).filter((i) => i?.title && i?.desc).slice(0, 7);
  if (!items.length) return null;
  return (
    <section className="py-16 lg:py-24">
      <div className="container-wrapper">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold text-[#0b7a3a]">FAQ</p>
            <h2 className="font-switzer mt-3 text-3xl leading-tight font-semibold tracking-tight text-[#10211a] sm:text-4xl lg:text-5xl">
              Questions we hear often
            </h2>
            <Link
              href={data?.buttonLink || "/faqs"}
              className="mt-6 inline-block text-sm font-semibold text-[#0b7a3a]"
            >
              {data?.buttonText || "View all FAQs"} &rarr;
            </Link>
          </div>
          <div className="divide-y divide-[#10211a]/10 rounded-3xl border border-[#10211a]/10 bg-white">
            {items.map((i) => (
              <details key={i.title} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[#10211a]">
                  {i.title}
                  <span className="text-xl text-[#0b7a3a] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#4d5f56]">{i.desc}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSimple;
