// sanity/queries/serviceQueries.ts

import { seoFragment } from "@/lib/fragments/seoFragment";

// =====================================
// SERVICES LIST QUERY
// =====================================

export const servicesQuery = `
*[_type == "serviceDetails"]{
  _id,
  title,
  "slug": slug.current,

  heroSection{
    heading,
    "heroImage": heroImage.asset->url
  }
}
`;

// =====================================
// SERVICE DETAILS QUERY
// =====================================

export const serviceBySlugQuery = `
*[_type == "serviceDetails" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,

  // ====================================
  // SEO
  // ====================================
  ${seoFragment},
  
  // ====================================
  // HERO SECTION
  // ====================================

  heroSection{
    heading,
    descriptionOne,
    descriptionTwo,
    heroImage
  },

  // ====================================
  // FEATURES SECTION
  // ====================================

  featuresSection{
    sectionHeading,

    slides[]{
      heading,
      description,
      "image": image.asset->url
    }
  },

  // ====================================
  // PROCESS SECTION
  // ====================================

  processSection{
    sectionHeading,

    "centerImage": centerImage.asset->url,

    processCards[]{
      number,
      title,
      description,
      align
    }
  },

  // ====================================
  // TECHNOLOGIES SECTION
  // ====================================

  technologiesSection{
    sectionHeading,

    technologies[]{
      title,
      "image": image.asset->url
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
  // FAQ SECTION
  // ====================================

  faqSection{
    tag,
    heading,
    buttonText,
    buttonLink,

    items[]{
      title,
      desc
    }
  },

  // ====================================
  // CTA SECTION
  // ====================================

  ctaSection{
    sectionTitle,
    headingOne,
    headingTwo,
    description,
    contactButtonText,
    contactButtonLink,
    secondaryButtonText,
    secondaryButtonLink
  }
}
`;
