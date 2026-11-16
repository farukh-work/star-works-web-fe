export const PORTFOLIO_PAGE_QUERY = `
*[_type == "portfolioPage"][0]{
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
