import CommonCtaSection from "@/components/common/CommonCtaSection";
export const revalidate = 60;
import Portfolio from "@/components/portfolio/Portfolio";
import PrivacyPolicyHero from "@/components/privacy-policy/PrivacyPolicyHero";
import { client } from "@/sanity/client";
import { PORTFOLIO_PAGE_QUERY } from "@/sanity/portfolioPage";
import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";
import { generateSeo } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await client.fetch(PORTFOLIO_PAGE_QUERY);
  return generateSeo({
    seo: pageData?.seo,
    path: "/portfolio",
  });
}

const PortfolioPage = async () => {
  const pageData = await client.fetch(PORTFOLIO_PAGE_QUERY);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Portfolio", url: "/portfolio" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <PrivacyPolicyHero data={pageData?.hero} />
      <Portfolio data={pageData?.portfolioSection} />
      <CommonCtaSection data={pageData?.ctaSection} />
    </>
  );
};

export default PortfolioPage;
