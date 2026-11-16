export const PORTFOLIO_DETAIL_QUERY = `
*[_type == "portfolioProject" && slug.current == $slug][0]{
  seo{
    metaTitle,
    metaDescription,
    keywords
  },

  title,
  "image": projectDetailsSection.image.asset->url,
  slug{
    current
  },
  category,

  heroSection{
    sectionTitle,
    headingOne,
    headingTwo,
    lastDescription
  },

  projectDetailsSection{
    "image": image.asset->url,

    overview[]{
      label,
      value
    },

    heading,
    description
  },

  storySection{
    "image": image.asset->url,

    features[]{
      number,
      title,
      description
    }
  },

  finalOutcomeSection{
    "image": image.asset->url,
    title,
    description
  },

  featuresSection,

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
