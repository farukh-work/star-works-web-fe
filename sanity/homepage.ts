import { seoFragment } from "@/lib/fragments/seoFragment";
import { groq } from "next-sanity";

export const HOMEPAGE_QUERY = groq`
*[_type == "homepage"][0]{
  
  // ====================================
  // SEO
  // ====================================
  ${seoFragment},
  
  // ====================================
  // HERO SECTION
  // ====================================

  heroSection{
    Description,
    heading,
    animatedHeadings[]{ text },
    lastHeading,
    "heroImage": heroImage.asset->url,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink
  },

  // ====================================
  // MARQUEE SECTION
  // ====================================

  marqueeSection{
    features
  },

  // ====================================
  // ABOUT US SECTION
  // ====================================

  aboutUsSection{
    smallHeading,
    heading,
    description,

    "image": image.asset->url,

    stats[]{
      number,
      label
    }
  },

  // ====================================
  // DELIVERABLES SECTION
  // ====================================

  deliverablesSection{
    sectionHeading,

    items[]{
      prevNumber,
      nextNumber,
      title,
      description
    }
  },

  // ====================================
  // OUR WORK SECTION
  // ====================================

  ourWorkSection{
    smallHeading,
    heading,
    description,

    ctaButtonText,
    ctaButtonLink,

 projects[]{
  title,
  path,
  buttonText,

  category,
  description,
  stats,
  year,
  techStack,

  features[]{
    title,
    desc
  },

  "image": image.asset->url
}
  },

  // ====================================
  // OUR SERVICES SECTION
  // ====================================

  ourServicesSection{
    smallHeading,
    heading,
    description,

  slides[]{
      title,
      slug{
        current
      },
      "image": image.asset->url
    }
  },

  // ====================================
  // FEATURES SECTION
  // ====================================

  featuresSection{
    smallHeading,
    sectionHeading,

    slides[]{
      heading,
      description,

      "image": image.asset->url
    }
  },

  // ====================================
  // FAQ SECTION
  // ====================================

  faqSection,

  // ====================================
  // CTA SECTION
  // ====================================

  ctaSection
}
`;
