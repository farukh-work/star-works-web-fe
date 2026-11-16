import { groq } from "next-sanity";

export const ABOUT_US_QUERY = groq`
  *[_type == "aboutUs"][0]{
    
    seo,

    heroSection{
      smallHeading,
      heading,
      description,
      "backgroundImage": backgroundImage.asset->url,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink,
    },

    aboutSection{
      smallHeading,
      heading,
          "image": image.asset->url,
      descriptions,
    },

    achievementsSection{
      heading,
      subtitle,

      stats[]{
      number,
      suffix,
      title
      },

      visionMission[]{
        title,
        description,
      },
    },

    coreValuesSection{
      smallHeading,
      heading,

      cards[]{
        title,
        description,
        icon,
      },
    },

    teamSection{
      smallHeading,
      heading,

      members[]{
        name,
        role,
        image,
      },
    },

    timelineSection{
      smallHeading,
      heading,

      timelineItems[]{
        year,
        title,
        description,
        image,
      },
    },

    whyChooseUsSection{
      smallHeading,
      heading,

      cards[]{
        title,
        description,
        icon,
      },
    },

    "ctaSection": *[_type == "homepage"][0].ctaSection
  }
`;

