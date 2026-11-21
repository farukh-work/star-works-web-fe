import Image from "next/image";

type Slide = { heading?: string; description?: string; image?: string };

const Avatar = ({ s, size }: { s: Slide; size: number }) =>
  s.image ? (
    <Image
      src={s.image}
      alt={s.heading || "Client"}
      width={size * 2}
      height={size * 2}
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  ) : (
    <span
      className="bg-primary flex items-center justify-center rounded-full font-bold text-black"
      style={{ width: size, height: size }}
    >
      {(s.heading || "?").trim().charAt(0).toUpperCase()}
    </span>
  );

// TODO(before production): confirm these reviews are real and add country and project.
// Layout: one large featured quote, then plain quotes separated by lines (no boxed cards).
const Testimonials = ({ data }: { data?: { sectionHeading?: string; slides?: Slide[] } }) => {
  const slides = (data?.slides || []).filter((s) => s?.heading && s?.description).slice(0, 5);
  if (!slides.length) return null;
  const [feature, ...rest] = slides;
  return (
    <section className="py-16 lg:py-28">
      <div className="container-wrapper">
        <p className="text-primary text-sm font-semibold">Client feedback</p>
        <figure className="mt-6 max-w-5xl">
          <blockquote className="font-switzer text-2xl leading-[1.25] font-semibold tracking-tight text-white sm:text-3xl lg:text-5xl">
            &ldquo;{feature.description}&rdquo;
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <Avatar s={feature} size={52} />
            <span className="text-base font-semibold text-white">{feature.heading}</span>
          </figcaption>
        </figure>

        {!!rest.length && (
          <div className="mt-16 grid gap-x-12 gap-y-10 border-t border-white/10 pt-10 md:grid-cols-2">
            {rest.map((s) => (
              <figure key={s.heading} className="flex gap-4">
                <Avatar s={s} size={40} />
                <div>
                  <blockquote className="text-sm leading-relaxed text-white/75 sm:text-base">&ldquo;{s.description}&rdquo;</blockquote>
                  <figcaption className="mt-3 text-sm font-semibold text-white">{s.heading}</figcaption>
                </div>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
