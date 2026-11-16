import { seoFragment } from "@/lib/fragments/seoFragment";
import { groq } from "next-sanity";

export const SERVICES_PAGE_QUERY = groq`
*[_type == "services"][0]{
  // ====================================
  // SEO
  // ====================================
  ${seoFragment},

  heroSection{
    smallHeading,
    heading,
    "heroImage": heroImage.asset->url
  },

  marqueeSection{
    features
  },

  exploreSection{
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

  statsSection{
    stats[]{
      number,
      suffix,
      title
    }
  },

  ctaSection
}
`;
