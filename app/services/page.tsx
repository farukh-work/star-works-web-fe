import React from "react";
export const revalidate = 60;
import dynamic from "next/dynamic";

import { client } from "@/sanity/client";
import { SERVICES_PAGE_QUERY } from "@/sanity/service";
import { generateSeo } from "@/lib/seo";
import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

// Dynamic Imports
const ServiceHero = dynamic(() => import("@/components/service/ServiceHero"));

const Marquee = dynamic(() => import("@/components/common/Marquee"));

const Explore = dynamic(() => import("@/components/service/Explore"));

const ServiceStats = dynamic(() => import("@/components/service/ServiceStats"));

const CommonCtaSection = dynamic(
  () => import("@/components/common/CommonCtaSection"),
);
export async function generateMetadata() {
  const data = await client.fetch(SERVICES_PAGE_QUERY);

  return generateSeo({
    seo: data?.seo,
    path: "/services",
  });
}
const ServicesPage = async () => {
  const data = await client.fetch(SERVICES_PAGE_QUERY);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceHero data={data?.heroSection} />

      <Marquee features={data?.marqueeSection?.features || []} />

      <Explore data={data?.exploreSection} />

      <ServiceStats data={data?.statsSection} className="section-spacing" />

      <CommonCtaSection data={data?.ctaSection} />
    </>
  );
};

export default ServicesPage;
