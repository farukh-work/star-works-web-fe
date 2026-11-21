export const revalidate = 60;
import { AboutHeroNew, StorySection, PrinciplesSection, TeamSection } from "@/components/about/AboutNew";
import CtaBand from "@/components/homepage/CtaBand";
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
      <div className="theme-dark">
        <AboutHeroNew />
      </div>
      <div className="theme-round theme-light">
        <StorySection />
      </div>
      <div className="theme-round theme-dark">
        <PrinciplesSection />
      </div>
      <div className="theme-round theme-light">
        <TeamSection members={teamMembers} />
      </div>
      <div className="theme-round theme-dark">
        <CtaBand />
      </div>
    </>
  );
}
