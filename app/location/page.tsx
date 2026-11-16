import { client } from "@/sanity/client";
import { HOMEPAGE_QUERY } from "@/sanity/homepage";
import { LOCATION_PAGE_QUERY } from "@/sanity/locationPage";
import { generateSeo } from "@/lib/seo";
import dynamic from "next/dynamic";
import Hero from "./Hero";
import LocationServices from "./LocationServices";
import WhyChooseUs from "./WhyChooseUs";
import FaqSchema from "@/components/common/FaqSchema";
import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await client.fetch(LOCATION_PAGE_QUERY);
  return generateSeo({
    seo: data?.seo,
    path: "/location",
  });
}

const OurWork = dynamic(() => import("@/components/homepage/OurWork"));
const ServiceFeatures = dynamic(
  () => import("@/components/service/ServiceFeatures"),
);
const Faq = dynamic(() => import("@/components/common/Faq"));
const CommonCtaSection = dynamic(
  () => import("@/components/common/CommonCtaSection"),
);

const LocationPage = async () => {
  const [data, locationData] = await Promise.all([
    client.fetch(HOMEPAGE_QUERY),
    client.fetch(LOCATION_PAGE_QUERY),
  ]);

  const faqData = {
    tag: locationData?.faqSection?.tag,
    heading: locationData?.faqSection?.heading,
    buttonText: locationData?.faqSection?.buttonText,
    buttonLink: locationData?.faqSection?.buttonLink,
    items: locationData?.faqSection?.items || [],
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Location", url: "/location" },
  ];

  return (
    <>
      <FaqSchema data={faqData} />
      <BreadcrumbSchema items={breadcrumbs} />
      <Hero data={locationData?.heroSection} />
      <LocationServices data={locationData?.servicesSection} />
      <WhyChooseUs data={locationData?.whyChooseUsSection} />
      <OurWork data={data?.ourWorkSection} />
      <ServiceFeatures data={data?.featuresSection} className="" />
      <Faq data={faqData} />
      <CommonCtaSection data={data?.ctaSection} />
    </>
  );
};

export default LocationPage;
