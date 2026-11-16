import About from "@/components/about/About";
export const revalidate = 60;
import Achievements from "@/components/about/Achievements";
import CoreValue from "@/components/about/CoreValue";
import AboutHero from "@/components/about/AboutHero";
import MeetTheTeam from "@/components/about/MeetTheTeam";
import TimelinePage from "@/components/about/TimelinePage";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import CommonCtaSection from "@/components/common/CommonCtaSection";
import { generateSeo } from "@/lib/seo";
import { ABOUT_US_QUERY } from "@/sanity/aboutUs";
import { client } from "@/sanity/client";
import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

export async function generateMetadata() {
  const data = await client.fetch(ABOUT_US_QUERY);

  return generateSeo({
    seo: data?.seo,
    path: "/about",
  });
}

export default async function Home() {
  const data = await client.fetch(ABOUT_US_QUERY);

  const teamMembers = data?.teamSection?.members || [];
  const teamSchema = {
    "@context": "https://schema.org",
    "@graph": teamMembers.map((member: any) => ({
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.role,
      "worksFor": {
        "@type": "Organization",
        "name": "Star Works",
        "url": process.env.NEXT_PUBLIC_SITE_URL || "https://www.starworks.in"
      }
    }))
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <AboutHero data={data?.heroSection} />
      <About data={data?.aboutSection} />
      <Achievements data={data?.achievementsSection} />
      <CoreValue data={data?.coreValuesSection} />
      <MeetTheTeam data={data?.teamSection} />
      <TimelinePage data={data?.timelineSection} />
      <WhyChooseUs data={data?.whyChooseUsSection} />
      <CommonCtaSection data={data?.ctaSection} />
    </>
  );
}
