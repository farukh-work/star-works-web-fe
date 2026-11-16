import React from "react";

type ServiceSchemaProps = {
  data?: {
    title: string;
    slug: string;
    heroSection?: {
      descriptionOne?: string;
      descriptionTwo?: string;
    };
  };
};

const ServiceSchema = ({ data }: ServiceSchemaProps) => {
  if (!data) return null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.starworks.in";
  const serviceUrl = `${siteUrl}/services/${data.slug}`;
  const description =
    data.heroSection?.descriptionOne ||
    "Professional digital service delivered by Star Works.";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}/#service`,
    "name": data.title,
    "url": serviceUrl,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Star Works",
      "url": siteUrl,
      "logo": `${siteUrl}/images/png/logo.png`
    },
    "areaServed": {
      "@type": "Country",
      "name": "Worldwide"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default ServiceSchema;
