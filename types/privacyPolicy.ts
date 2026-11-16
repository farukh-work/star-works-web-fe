import type { PortableTextBlock } from "@portabletext/types";

/**
 * Types for the `privacyPolicy` Sanity document, matching `privacyPolicyQuery`
 * in `sanity/privacyPolicy.ts`.
 */

export type PrivacyPolicyHero = {
  sectionTitle?: string;
  headingOne?: string;
  headingTwo?: string;
  /** ISO date string (e.g. "2026-05-18") */
  lastUpdated?: string;
  /** Prefix shown before the date, e.g. "Last updated:" */
  lastUpdatedLabel?: string;
};

export type PrivacyPolicyCta = {
  buttonText?: string;
  buttonLink?: string;
};

export type PrivacyPolicyData = {
  seo?: any;
  hero?: PrivacyPolicyHero;
  /** Portable Text body: headings, paragraphs, bullet lists, contact section */
  content?: PortableTextBlock[];
  cta?: PrivacyPolicyCta;
};
