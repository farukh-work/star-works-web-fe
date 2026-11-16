import { seoFragment } from "@/lib/fragments/seoFragment";
import { groq } from "next-sanity";

export const LOCATION_PAGE_QUERY = groq`
*[_type == "locationPage"][0]{
  ${seoFragment},
  
  heroSection{
    heading,
    description,
    stats[]{
      number,
      title
    }
  },

  servicesSection{
    tag,
    heading,
    description,
    services[]{
      icon,
      title,
      desc
    }
  },

  whyChooseUsSection{
    tag,
    heading,
    items[]{
      title,
      description,
      "icon": icon.asset->url
    }
  },

  faqSection{
    tag,
    heading,
    buttonText,
    buttonLink,
    items[]{
      title,
      desc
    }
  }
}
`;
