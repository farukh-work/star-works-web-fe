import ScrollRevealCard from "@/components/common/ScrollRevealCard";
import { PortableText } from "@portabletext/react";
import LinkPath from "@/components/common/LinkPath";
import type {
  PrivacyPolicyCta,
  PrivacyPolicyData,
} from "@/types/privacyPolicy";

const components = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="font-voyage mt-10 mb-2.5 text-2xl font-bold text-white md:mt-[50px]">
        {children}
      </h1>
    ),

    h2: ({ children }: any) => (
      <h2 className="font-voyage mt-[50px] mb-[16px] text-4xl leading-tight font-semibold text-white">
        {children}
      </h2>
    ),

    h3: ({ children }: any) => (
      <h3 className="text-primary font-voyage mt-[30px] mb-[16px] text-2xl leading-tight font-semibold">
        {children}
      </h3>
    ),

    normal: ({ children }: any) => {
      const isEmpty =
        !children ||
        children.length === 0 ||
        (children.length === 1 && !children[0]);
      if (isEmpty) return null;
      return (
        <p className="mb-4 text-base leading-snug text-white/80">{children}</p>
      );
    },

    blockquote: ({ children }: any) => (
      <p className="text-base leading-snug text-white/80 italic">{children}</p>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-6 list-outside list-disc pl-5 space-y-2 text-white/80">
        {children}
      </ul>
    ),

    number: ({ children }: any) => (
      <ol className="mb-6 list-outside list-decimal pl-5 space-y-2 text-white/80">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,

    number: ({ children }: any) => <li>{children}</li>,
  },

  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-white">{children}</strong>
    ),

    em: ({ children }: any) => <em className="italic">{children}</em>,

    underline: ({ children }: any) => (
      <span className="underline">{children}</span>
    ),

    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline"
      >
        {children}
      </a>
    ),
  },
};

type ContentProps = {
  content: PrivacyPolicyData["content"];
  cta?: PrivacyPolicyCta;
};

const PrivacyPolicyContent = ({ content, cta }: ContentProps) => {
  return (
    <section className="pb-12 md:pb-16 xl:pb-20">
      <div className="container-wrapper">
        <div className="mx-auto max-w-4xl">
          <ScrollRevealCard>
            <div className="privacy-policy-content max-w-none">
              <PortableText value={content ?? []} components={components} />
            </div>

            <div className="mt-6">
              <LinkPath href={cta?.buttonLink ?? "/contact-us"}>
                {cta?.buttonText ?? "Contact Star Works"}
              </LinkPath>
            </div>
          </ScrollRevealCard>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyContent;
