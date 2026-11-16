// app/services/[slug]/page.tsx

import React from "react";
export const revalidate = 60;
const ServiceFeatures = dynamic(
  () => import("@/components/service/ServiceFeatures"),
);
const CommonCtaSection = dynamic(
  () => import("@/components/common/CommonCtaSection"),
);
const Process = dynamic(() => import("@/components/service/Process"));
const Technologies = dynamic(() => import("@/components/service/Technologies"));
const Deliverables = dynamic(() => import("@/components/service/Deliverables"));
const Faq = dynamic(() => import("@/components/common/Faq"));
import { serviceBySlugQuery, servicesQuery } from "@/sanity/serviceDetails";
import { client } from "@/sanity/client";
import ServiceDetailHero from "@/components/service/ServiceDetailHero";
import dynamic from "next/dynamic";
import { generateSeo } from "@/lib/seo";
import ServiceSchema from "@/components/service/ServiceSchema";
import FaqSchema from "@/components/common/FaqSchema";
import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const data = await client.fetch(serviceBySlugQuery, {
    slug,
  });

  return generateSeo({
    seo: data?.seo,
    path: `/services/${slug}`,
  });
}
export async function generateStaticParams() {
  const services = await client.fetch(servicesQuery);

  return services.map((item: any) => ({
    slug: String(item.slug),
  }));
}

const DetailsPage = async ({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) => {
  const { slug } = await params;
  const [data, homepage] = await Promise.all([
    client.fetch(serviceBySlugQuery, {
      slug,
    }),
    client.fetch(`*[_type == "homepage"][0]{ ctaSection }`),
  ]);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center text-3xl text-white">
        Service not found 🚫
      </div>
    );
  }

  const ctaData = {
    ...homepage?.ctaSection,
    ...(data.ctaSection || {}),
  };

  if (data.ctaSection && !data.ctaSection.headingOne) {
    ctaData.headingOne = homepage?.ctaSection?.headingOne;
    ctaData.headingTwo = homepage?.ctaSection?.headingTwo;
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: data.title || "Service Details", url: `/services/${slug}` },
  ];

  return (
    <>
      <ServiceSchema data={data} />
      <FaqSchema data={data.faqSection} />
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceDetailHero data={data.heroSection} />
      <div className="relative z-30 bg-moss">
        <ServiceFeatures
          data={data.featuresSection}
          className="section-spacing"
        />
        <Process data={data.processSection} />
        <Technologies data={data.technologiesSection} />
        <Deliverables data={data.deliverablesSection} />
        <Faq data={data.faqSection} />
        {ctaData && <CommonCtaSection data={ctaData} />}
      </div>
    </>
  );
};

export default DetailsPage;
