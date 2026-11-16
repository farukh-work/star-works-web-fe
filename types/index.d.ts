import { categorizedFaqList } from "@/components/common/Helper";
import { ReactNode } from "react";

declare global {
  interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children: ReactNode;
    isIcon?: boolean;
    containerClassName?: string;
    className?: string;
    variant?: "primary" | "secondary" | "outline";
    noScrollReveal?: boolean;
  }
  interface LinkProps {
    href?: string;
    disabled?: boolean;
    children: ReactNode;
    isIcon?: boolean;
    className?: string;
    containerClassName?: string;
    variant?: "primary" | "secondary" | "outline";
    noScrollReveal?: boolean;
  }
  interface sectionTitleProps {
    sectiontitle: string;
    className?: string;
    containerClassName?: string;
  }
  interface HomeProps {
    posts: BlogPost[];
  }
  interface HomepageBlogSectionProps {
    posts: BlogPost[];
  }
  interface PageSEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogType?: string;
    twitterCard?: "summary" | "summary_large_image" | "app" | "player";
    canonicalUrl?: string;
    noindex?: boolean;
    additionalMetaTags?: Array<{
      name?: string;
      property?: string;
      content: string;
    }>;
    additionalLinkTags?: Array<{
      rel: string;
      href: string;
      sizes?: string;
      type?: string;
    }>;
  }
  interface ProcessItem {
    step: number;
    description: string;
    tasks: string[];
  }
  interface ProcessListItemProps {
    obj: ProcessItem;
  }
  type HoverDirection = "top" | "bottom" | null;
  interface subHeadingProps {
    subheadingone: string;
    subheadingtwo: string;
    center?: string;
  }
  interface FaqItem {
    title: string;
    desc: string;
  }
  interface NavLink {
    id: string;
    name: string;
    url: string;
  }
  interface LinkItemProps {
    obj: NavLink;
  }
  interface FaqItem {
    title: string;
    desc: string;
  }
  type CategoryKey = keyof typeof categorizedFaqList;
  interface TabCategory {
    key: CategoryKey;
    label: string;
    icon: string;
  }
  interface RoundedHoverProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    backgroundColor?: string;
  }
  interface StickyCursorProps {
    stickyElement: React.RefObject<HTMLElement>;
  }
  interface FaqItem {
    title: string;
    desc: string;
  }
  interface FaqListProps {
    item: FaqItem;
    index?: number;
  }
  interface BlogDetailProps {
    post: BlogPost;
    relatedPosts: BlogPost[];
  }
  type FeaturesSliderProps = {
    features: string[];
  };
  type CommonCtaSectionProps = {
    sectiontitle?: string;
    subheadingone?: string;
    subheadingtwo?: string;
    description?: string;
    contactText?: string;
    service?: string;
  };
  type TermsConditionsHeroProps = {
    lastUpdated: string;
  };
  type ServiceFeaturesProps = {
    data: {
      features?: {
        title: string;
        desc: string;
      }[];
    };
  };
  type ProcessProps = {
    data: {
      process?: ProcessStep[];
    };
  };
  type TechnologyItem = {
    tech: string;
    desc: string;
    icon: any;
  };
  type ServiceData = {
    features?: FeatureItem[];
    process?: {
      step: string;
      desc: string;
    }[];
    technologies?: TechnologyItem[];
    deliverables?: DeliverableItem[];
  };
  type TechnologiesProps = {
    data: ServiceData;
  };
  // type DeliverablesProps = {
  //   data: ServiceData;
  // };
  interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
  }
  type FeatureItem = {
    title: string;
    desc: string;
  };
  // NEW-PROPS
  type HeaderData = {
    buttonText?: string;

    buttonLink?: string;

    navLinks?: {
      title: string;
      href: string;
    }[];
  };
  type Props = {
    headerData: HeaderData;
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  type NavLinkProps = {
    obj: {
      title: string;
      href: string;
    };
  };

  // HOMEPAGE TYPES
  type AboutUsProps = {
    data: {
      smallHeading?: string;
      heading?: string;
      description?: string;
      image?: string;

      stats?: {
        number?: number;
        label?: string;
      }[];
    };
  };

  type DeliverablesProps = {
    data: {
      sectionHeading: string;

      items: {
        nextNumber: string;
        prevNumber: string;
        title: string;
        description: string;
      }[];
    };
  };
  type OurWorkProps = {
    data?: {
      smallHeading?: string;
      heading?: string;
      description?: string;

      ctaButtonText?: string;
      ctaButtonLink?: string;

      projects?: {
        title?: string;
        path?: string;
        image?: string;
        buttonText?: string;
      }[];
    };
  };
  interface Project {
    title?: string;
    path?: string;
    image?: string;
    buttonText?: string;

    category?: string;
    description?: string;
    stats?: string;
    year?: string;

    techStack?: string[];

    features?: {
      title?: string;
      desc?: string;
    }[];
  }

  interface ProjectCardProps {
    project: Project;
    index: number;
    isActive: boolean;
    cardRef: (el: HTMLDivElement | null) => void;
  }
  interface WorkCTAProps {
    ctaGlow: boolean;
    isMobile: boolean;
  }
  type OurServicesProps = {
    data: {
      smallHeading?: string;
      heading?: string;
      description?: string;

      slides?: {
        title?: string;
        slug?: {
          current?: string;
        };
        image?: string;
      }[];
    };
  };
}
