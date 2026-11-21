import Image from "next/image";
import Link from "next/link";

type Project = {
  title?: string;
  path?: string;
  category?: string;
  description?: string;
  year?: string;
  techStack?: string[];
  image?: string;
};

type Props = {
  data?: {
    heading?: string;
    description?: string;
    ctaButtonText?: string;
    ctaButtonLink?: string;
    projects?: Project[];
  };
};

const WorkGrid = ({ data }: Props) => {
  const projects = (data?.projects || []).filter((p) => p?.title);
  if (!projects.length) return null;
  return (
    <section className="py-16 lg:py-24">
      <div className="container-wrapper">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <h2 className="font-switzer max-w-xl text-3xl leading-tight font-semibold tracking-tight text-[#10211a] sm:text-4xl lg:text-5xl">
            Selected work
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-[#4d5f56]">
            A few recent projects. Each one started with a free call and a clear scope.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {projects.map((p, i) => {
            const external = !!p.path && /^https?:/.test(p.path);
            const href = p.path || "/portfolio";
            return (
              <Link
                key={p.title}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`group overflow-hidden rounded-3xl border border-[#10211a]/10 bg-white transition hover:-translate-y-1 hover:shadow-xl ${
                  i === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div className={`relative bg-[#eef4f0] ${i === 0 ? "aspect-[16/8]" : "aspect-[16/10]"}`}>
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.title || "Project"}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    {p.category && (
                      <span className="rounded-full bg-[#e6f9ee] px-3 py-1 text-[#0b7a3a]">{p.category}</span>
                    )}
                    {p.year && <span className="text-[#4d5f56]">{p.year}</span>}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-[#10211a]">{p.title}</h3>
                  {p.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#4d5f56]">{p.description}</p>
                  )}
                  {!!p.techStack?.length && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.techStack.slice(0, 5).map((t) => (
                        <span key={t} className="rounded-full border border-[#10211a]/10 px-3 py-1 text-xs text-[#4d5f56]">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="mt-5 inline-block text-sm font-semibold text-[#0b7a3a]">View project &rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={data?.ctaButtonLink || "/portfolio"}
            className="inline-flex rounded-full border border-[#10211a]/20 px-7 py-3 text-sm font-semibold text-[#10211a] transition hover:bg-[#10211a] hover:text-white"
          >
            {data?.ctaButtonText || "View all projects"} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkGrid;
