import { groq } from "next-sanity";

export const termsAndConditionsQuery = groq`
  *[_type == "termsAndConditions"][0]{

    seo{
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl,
      robotsIndex,
      robotsFollow,
      structuredData,
      ogImageAlt,

      metaImage{
        asset->{
          url
        }
      },

      ogImage{
        asset->{
          url
        }
      },

      twitterImage{
        asset->{
          url
        }
      },

      twitterTitle,
      twitterDescription,
    },

    hero{
      sectionTitle,
      headingOne,
      headingTwo,
      lastUpdated,
      lastUpdatedLabel,
    },

    content,

    cta{
      buttonText,
      buttonLink,
    }
  }
`;
