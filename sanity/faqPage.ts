import { seoFragment } from "@/lib/fragments/seoFragment";

export const FAQ_PAGE_QUERY = `
*[_type == "faqPage"][0]{

  // ====================================
  // SEO
  // ====================================
  ${seoFragment},
  

  heroSection{
    tag,
    title,
    description,
    linkText,
    link,
    afterLinkText
  },

  browseCategoriesSection{
    sectionTitle,
    description
  },

  allAnswersSection{
    faqHeadingTag,
    faqHeading,

    categories[]{
      id,
      label
    },

    faqGroups[]{
      categoryId,

      items[]{
        question,
        answer
      }
    }
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

  "ctaSection": *[_type == "homepage"][0].ctaSection
}
`;

