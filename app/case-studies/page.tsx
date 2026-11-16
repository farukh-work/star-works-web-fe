import CommonCtaSection from "@/components/common/CommonCtaSection";
export const revalidate = 60;
import CaseStudiesList from "@/components/case-studies/CaseStudiesList";
import CaseStudiesHero from "@/components/case-studies/CaseStudiesHero";
import { client } from "@/sanity/client";
import { CASE_STUDIES_PAGE_QUERY } from "@/sanity/caseStudiesPage";
import { PORTFOLIO_PAGE_QUERY } from "@/sanity/portfolioPage";
import { generateSeo } from "@/lib/seo";

import dynamic from "next/dynamic";

const ServiceFeatures = dynamic(
  () => import("@/components/service/ServiceFeatures"),
);

export async function generateMetadata() {
  const [casePageData, portfolioPageData] = await Promise.all([
    client.fetch(CASE_STUDIES_PAGE_QUERY),
    client.fetch(PORTFOLIO_PAGE_QUERY),
  ]);
  const pageData = casePageData || portfolioPageData;

  return generateSeo({
    seo: {
      robotsFollow: true,
      robotsIndex: true,
      ...pageData?.seo,
      metaTitle: pageData?.seo?.metaTitle || "Case Studies Listing | Star Works",
      metaDescription:
        pageData?.seo?.metaDescription ||
        "Explore our latest case studies and success stories. See how we help brands build powerful digital presence.",
    },
    path: "/case-studies",
  });
}

const CaseStudiesListingPage = async () => {
  const [casePageData, portfolioPageData, homepageData] = await Promise.all([
    client.fetch(CASE_STUDIES_PAGE_QUERY),
    client.fetch(PORTFOLIO_PAGE_QUERY),
    client.fetch(`*[_type == "homepage"][0]{
      featuresSection{
        smallHeading,
        sectionHeading,
        slides[]{
          heading,
          description,
          "image": image.asset->url
        }
      }
    }`),
  ]);

  const pageData = casePageData || portfolioPageData;

  const heroData = {
    tag: pageData?.hero?.sectionTitle || "CASE STUDIES",
    title:
      pageData?.hero?.headingOne || pageData?.hero?.headingTwo
        ? [pageData.hero.headingOne, pageData.hero.headingTwo].filter(Boolean).join("\n")
        : "Our Work Speaks \n Through Results",
    description:
      pageData?.hero?.lastDescription ||
      "Work on industry-inspired projects, solve real-world challenges, and build a portfolio that demonstrates your skills, experience, and readiness for professional opportunities.",
  };

  const featuresSection = pageData?.featuresSection || (homepageData?.featuresSection
    ? {
        ...homepageData.featuresSection,
        smallHeading: "",
        sectionHeading: "What People Say\nabout Our Services",
      }
    : null);

  return (
    <>
      <CaseStudiesHero data={heroData} />
      <CaseStudiesList
        projects={pageData?.portfolioSection?.projects || []}
        tabs={pageData?.portfolioSection?.tabs || []}
        searchPlaceholder={pageData?.portfolioSection?.searchPlaceholder}
      />
      {featuresSection && (
        <ServiceFeatures
          data={featuresSection}
          className="pt-6 md:pt-10 section-spacing-bottom"
        />
      )}
      <CommonCtaSection data={pageData?.ctaSection} />
    </>
  );
};

export default CaseStudiesListingPage;
