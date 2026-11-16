import { PortableText } from "@portabletext/react";
import ScrollRevealCard from "../common/ScrollRevealCard";
import LinkPath from "../common/LinkPath";
import type {
  TermsAndConditionsCta,
  TermsAndConditionsData,
} from "@/types/termsAndConditions";

// Portable Text renderers tuned to reproduce the exact Terms & Conditions
// typography/spacing that was previously hardcoded in this component.
const components = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="font-voyage mt-[50px] mb-[16px] text-2xl font-bold text-white">
        {children}
      </h1>
    ),

    h2: ({ children }: any) => (
      <h2 className="font-voyage mt-[50px] mb-[16px] text-2xl font-bold text-white">
        {children}
      </h2>
    ),

    h3: ({ children }: any) => (
      <h3 className="text-primary font-voyage mt-10 mb-[16px] text-xl font-semibold md:mt-[50px]">
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
      <ul className="list-outside list-disc space-y-2 pl-5 text-base text-white/80">
        {children}
      </ul>
    ),

    number: ({ children }: any) => (
      <ol className="list-outside list-decimal space-y-2 pl-5 text-base text-white/80">
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
      <strong className="font-bold">{children}</strong>
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

type TermsConditionsContentProps = {
  content: TermsAndConditionsData["content"];
  cta?: TermsAndConditionsCta;
};

const TermsConditionsContent = ({
  content,
  cta,
}: TermsConditionsContentProps) => {
  return (
    <section className="pb-12 md:pb-16 xl:pb-20">
      <div className="container-wrapper">
        <div className="mx-auto max-w-4xl">
          <ScrollRevealCard className="prose prose-invert terms-conditions-content max-w-none">
            <PortableText value={content ?? []} components={components} />

            {/* CTA sits directly after the closing paragraph (16px gap from
                that paragraph's bottom margin). The mb-12 reproduces the 48px
                of space the previous Contact section <div> left below it. */}
            <LinkPath
              href={cta?.buttonLink ?? "/contact-us"}
              containerClassName="mb-12"
            >
              {cta?.buttonText ?? "Contact Star Works"}
            </LinkPath>
          </ScrollRevealCard>
        </div>
      </div>
    </section>
  );
};

export default TermsConditionsContent;
