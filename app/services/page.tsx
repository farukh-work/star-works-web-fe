import React from "react";
export const revalidate = 60;

import { client } from "@/sanity/client";
import { SERVICES_PAGE_QUERY } from "@/sanity/service";
import { generateSeo } from "@/lib/seo";
import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

import { ServicesHero, ServicesGrid } from "@/components/services/ServicesIndex";
import ProcessSteps from "@/components/homepage/ProcessSteps";
import CtaBand from "@/components/homepage/CtaBand";

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
      <div className="theme-dark">
        <ServicesHero />
      </div>
      <div className="theme-round theme-light">
        <ServicesGrid slides={data?.exploreSection?.slides} />
      </div>
      <div className="theme-round theme-dark">
        <ProcessSteps />
      </div>
      <div className="theme-round theme-light">
        <CtaBand />
      </div>
    </>
  );
};

export default ServicesPage;
