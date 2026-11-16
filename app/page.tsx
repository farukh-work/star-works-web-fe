import { cache } from "react";
import { client } from "@/sanity/client";
export const revalidate = 60;
import { HOMEPAGE_QUERY } from "@/sanity/homepage";

const getHomepage = cache(() => client.fetch(HOMEPAGE_QUERY));
import Hero from "@/components/homepage/Hero";
import Marquee from "@/components/common/Marquee";
import AboutUs from "@/components/homepage/AboutUs";
import dynamic from "next/dynamic";
import { generateSeo } from "@/lib/seo";
import CommonCtaSection from "@/components/common/CommonCtaSection";
import SiteSchema from "@/components/common/SiteSchema";
import FaqSchema from "@/components/common/FaqSchema";

const Deliverables = dynamic(() => import("@/components/service/Deliverables"));
const OurWork = dynamic(() => import("@/components/homepage/OurWork"));
const OurServices = dynamic(() => import("@/components/homepage/OurServices"));
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
      <Hero data={data?.heroSection} />
      <Marquee features={data?.marqueeSection?.features || []} />
      <AboutUs data={data?.aboutUsSection} />
      <Deliverables data={data?.deliverablesSection} />
      <OurWork data={data?.ourWorkSection} />
      <OurServices data={data?.ourServicesSection} />
      <ServiceFeatures
        data={data?.featuresSection}
        className="section-spacing-top"
      />
      <FaqSchema data={data?.faqSection} />
      <Faq data={data?.faqSection} />{" "}
      <CommonCtaSection data={data?.ctaSection} />
    </>
  );
}
