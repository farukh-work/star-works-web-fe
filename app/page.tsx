import { cache } from "react";
import { client } from "@/sanity/client";
export const revalidate = 60;
import { HOMEPAGE_QUERY } from "@/sanity/homepage";

const getHomepage = cache(() => client.fetch(HOMEPAGE_QUERY));
import HeroBento from "@/components/homepage/HeroBento";
import ServicesCards from "@/components/homepage/ServicesCards";
import PricingPlans from "@/components/homepage/PricingPlans";
import ProcessSteps from "@/components/homepage/ProcessSteps";
import WorkGrid from "@/components/homepage/WorkGrid";
import Testimonials from "@/components/homepage/Testimonials";
import FaqSimple from "@/components/homepage/FaqSimple";
import CtaBand from "@/components/homepage/CtaBand";
import Marquee from "@/components/common/Marquee";
import AboutIntro from "@/components/homepage/AboutIntro";
import { generateSeo } from "@/lib/seo";
import SiteSchema from "@/components/common/SiteSchema";
import FaqSchema from "@/components/common/FaqSchema";


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
        <AboutIntro />
        <ServicesCards />
      </div>
      <div className="theme-round theme-dark">
        <ProcessSteps />
      </div>
      <div className="theme-round theme-light">
        <WorkGrid data={data?.ourWorkSection} />
      </div>
      <div className="theme-round theme-dark">
        <Testimonials data={data?.featuresSection} />
        <PricingPlans />
      </div>
      <FaqSchema data={data?.faqSection} />
      <div className="theme-round theme-light">
        <FaqSimple data={data?.faqSection} />
      </div>
      <div className="theme-round theme-dark">
        <CtaBand />
      </div>
    </>
  );
}
