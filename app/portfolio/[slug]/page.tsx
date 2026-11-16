import CommonCtaSection from "@/components/common/CommonCtaSection";
export const revalidate = 60;
import FinalOutcome from "@/components/portfolio/FinalOutcome";
import ProjectDetails from "@/components/portfolio/ProjectDetails";
import ProjectDetailsStory from "@/components/portfolio/ProjectDetailsStory";
import PrivacyPolicyHero from "@/components/privacy-policy/PrivacyPolicyHero";
import ServiceFeatures from "@/components/service/ServiceFeatures";
import { client } from "@/sanity/client";
import { PORTFOLIO_DETAIL_QUERY } from "@/sanity/portfolioProject";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";
import { sanitizeCanonical } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await client.fetch(PORTFOLIO_DETAIL_QUERY, {
    slug,
  });

  if (!project) {
    return {};
  }

  const title = project.seo?.metaTitle || `${project.title} Case Study | Star Works`;
  const description =
    project.seo?.metaDescription ||
    `Explore the ${project.title} project developed by Star Works. Learn about the strategy, design, development process, technologies used, and project outcomes.`;
  const keywords = project.seo?.keywords || [];
  const projectImage = project.image || "/star-works-metaimage.webp";
  const fallbackUrl = `/portfolio/${slug}`;
  const canonicalUrl = sanitizeCanonical(project.seo?.canonicalUrl || fallbackUrl);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: projectImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [projectImage],
    },
  };
}

const PortfolioDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const [project, homepage] = await Promise.all([
    client.fetch(PORTFOLIO_DETAIL_QUERY, {
      slug,
    }),
    client.fetch(`
      *[_type == "homepage"][0]{
        featuresSection{
          sectionHeading,
          slides[]{
            heading,
            description,
            "image": image.asset->url
          }
        },
        ctaSection
      }
    `),
  ]);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center text-3xl text-white">
        Project not found 🚫
      </div>
    );
  }

  const featuresData = project.featuresSection || homepage?.featuresSection;
  const ctaData = project.ctaSection || homepage?.ctaSection;

  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.starworks.in"}/portfolio/${slug}`;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Portfolio", url: "/portfolio" },
    { name: project.title, url: `/portfolio/${slug}` },
  ];

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.seo?.metaDescription || `Explore the ${project.title} project developed by Star Works. Learn about the strategy, design, development process, technologies used, and project outcomes.`,
    "url": currentUrl,
    "creator": {
      "@type": "Organization",
      "name": "Star Works",
      "url": "https://www.starworks.in"
    }
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      {project.heroSection && <PrivacyPolicyHero data={project.heroSection} />}
      {project.projectDetailsSection && (
        <ProjectDetails data={project.projectDetailsSection} />
      )}
      {project.storySection && (
        <ProjectDetailsStory data={project.storySection} />
      )}
      {project.finalOutcomeSection && (
        <FinalOutcome data={project.finalOutcomeSection} />
      )}
      {featuresData && (
        <ServiceFeatures
          data={featuresData}
          className="section-spacing-bottom"
        />
      )}
      {ctaData && <CommonCtaSection data={ctaData} />}
    </>
  );
};

export async function generateStaticParams() {
  const projects = await client.fetch(`
    *[_type == "portfolioProject"]{
      "slug": slug.current
    }
  `);

  return projects.map((item: any) => ({
    slug: String(item.slug),
  }));
}

export default PortfolioDetailPage;
