export const CASE_STUDIES_PAGE_QUERY = `
*[_type == "caseStudiesPage"][0]{
  seo,

  hero{
    sectionTitle,
    headingOne,
    headingTwo,
    lastDescription
  },

  portfolioSection{
    searchPlaceholder,
    tabs,

    projects[]{
      title,

      slug{
        current
      },

      category,

      description,

      "image": image.asset->url,

      features[]{
        title,
        text
      },

      tech,
      metric,
      buttonText,
      path
    }
  },

  featuresSection{
    smallHeading,
    sectionHeading,
    slides[]{
      heading,
      description,
      "image": image.asset->url
    }
  },

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
