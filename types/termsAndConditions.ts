import type { PortableTextBlock } from "@portabletext/types";

/**
 * Types for the `termsAndConditions` Sanity document, matching
 * `termsAndConditionsQuery` in `sanity/termsAndConditions.ts`.
 */

export type TermsAndConditionsHero = {
  sectionTitle?: string;
  headingOne?: string;
  headingTwo?: string;
  /** ISO date string (e.g. "2024-01-01") */
  lastUpdated?: string;
  /** Prefix shown before the date, e.g. "Last updated:" */
  lastUpdatedLabel?: string;
};

export type TermsAndConditionsCta = {
  buttonText?: string;
  buttonLink?: string;
};

export type TermsAndConditionsData = {
  seo?: any;
  hero?: TermsAndConditionsHero;
  /** Portable Text body: section headings, subheadings, paragraphs, bullet lists */
  content?: PortableTextBlock[];
  cta?: TermsAndConditionsCta;
};
