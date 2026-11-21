import React from "react";

const SiteSchema = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.starworks.in";
  
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "Star Works",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "@id": `${siteUrl}/#logo`,
          "url": `${siteUrl}/images/png/logo.png`,
          "caption": "Star Works Logo"
        },
        "image": {
          "@id": `${siteUrl}/#logo`
        },
        "description": "Star Works is a premier web design and development agency offering Next.js websites, mobile app development, e-commerce, and branding solutions.",
        "email": "team.innovaft@gmail.com",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "team.innovaft@gmail.com",
          "contactType": "customer support",
          "areaServed": "Worldwide",
          "availableLanguage": ["English"]
        },
        "sameAs": [
          "https://github.com/farukh-work",
          "https://www.linkedin.com/in/farukh-khan1997/"
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        "name": "Star Works",
        "url": siteUrl,
        "logo": `${siteUrl}/images/png/logo.png`,
        "image": `${siteUrl}/star-works-metaimage.webp`,
        "description": "Star Works is a dynamic design & full-stack development agency helping worldwide brands build scalable, fast web applications.",
        "email": "team.innovaft@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Worldwide"
        },
        "serviceType": [
          "Web Design",
          "Web Development",
          "App Development",
          "E-Commerce Solutions",
          "Branding",
          "Digital Marketing"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Digital Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Design" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "App Development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-Commerce Solutions" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Branding" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing" } }
          ]
        },
        "priceRange": "$$"
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Star Works",
        "publisher": {
          "@id": `${siteUrl}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/blog?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        "url": siteUrl,
        "name": "Star Works | Web Design & Development Agency",
        "isPartOf": {
          "@id": `${siteUrl}/#website`
        },
        "about": {
          "@id": `${siteUrl}/#organization`
        },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", ".hero-description"]
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SiteSchema;
