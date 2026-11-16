import { groq } from "next-sanity";

export const contactPageQuery = groq`
  *[_type == "contactPage"][0]{
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
    subHeading,
    heading
  }
`;
