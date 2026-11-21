import { cache } from "react";
import { client } from "@/sanity/client";
export const revalidate = 60;
import { HOMEPAGE_QUERY } from "@/sanity/homepage";

const getHomepage = cache(() => client.fetch(HOMEPAGE_QUERY));
import HeroBento from "@/components/homepage/HeroBento";
import ServicesCards from "@/components/homepage/ServicesCards";
import PricingPlans from "@/components/homepage/PricingPlans";
import Marquee from "@/components/common/Marquee";
import AboutUs from "@/components/homepage/AboutUs";
import dynamic from "next/dynamic";
import { generateSeo } from "@/lib/seo";
import CommonCtaSection from "@/components/common/CommonCtaSection";
import SiteSchema from "@/components/common/SiteSchema";
import FaqSchema from "@/components/common/FaqSchema";

const Deliverables = dynamic(() => import("@/components/service/Deliverables"));
const OurWork = dynamic(() => import("@/components/homepage/OurWork"));
const ServiceFeatures = dynamic(
  () => import("@/components/service/ServiceFeatures"),
);
const Faq = dynamic(() => import("@/components/common/Faq"));

export async function generateMetadata() {
  const data = await getHomepage();
  return generateSeo({
    seo: data?.seo,
    path: "/",
  });
}
export default async function Home() {
  const data = await getHomepage();

  return (
    <>
      <SiteSchema />
      <div className="theme-dark">
        <HeroBento />
        <Marquee features={data?.marqueeSection?.features || []} />
      </div>
      <div className="theme-round theme-light">
        <AboutUs data={data?.aboutUsSection} />
      </div>
      <div className="theme-round theme-dark">
        <Deliverables data={data?.deliverablesSection} />
      </div>
      <div className="theme-round theme-light">
        <ServicesCards />
        <OurWork data={data?.ourWorkSection} />
      </div>
      <div className="theme-round theme-dark">
        <ServiceFeatures
          data={data?.featuresSection}
          className="section-spacing-top"
        />
      </div>
      <div className="theme-dark">
        <PricingPlans />
      </div>
      <FaqSchema data={data?.faqSection} />
      <div className="theme-round theme-light">
        <Faq data={data?.faqSection} />
      </div>
      <div className="theme-round theme-dark">
        <CommonCtaSection data={data?.ctaSection} />
      </div>
    </>
  );
}
