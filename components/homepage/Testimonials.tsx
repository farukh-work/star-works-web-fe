import Image from "next/image";

type Slide = { heading?: string; description?: string; image?: string };

// TODO(before production): confirm these reviews are real and add country and project.
const Testimonials = ({ data }: { data?: { sectionHeading?: string; slides?: Slide[] } }) => {
  const slides = (data?.slides || []).filter((s) => s?.heading && s?.description).slice(0, 6);
  if (!slides.length) return null;
  return (
    <section className="py-16 lg:py-24">
      <div className="container-wrapper">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-primary text-sm font-semibold">Client feedback</p>
          <h2 className="font-switzer mt-3 text-3xl leading-tight font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            What clients say
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {slides.map((s) => (
            <figure key={s.heading} className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6">
              <blockquote className="text-sm leading-relaxed text-white/80">&ldquo;{s.description}&rdquo;</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                {s.image ? (
                  <Image
                    src={s.image}
                    alt={s.heading || "Client"}
                    width={80}
                    height={80}
                    className="size-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="bg-primary flex size-10 items-center justify-center rounded-full text-sm font-bold text-black">
                    {(s.heading || "?").trim().charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="text-sm font-semibold text-white">{s.heading}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
