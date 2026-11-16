import React from "react";

type FaqItem = {
  title: string;
  desc: string;
};

type FaqSectionData = {
  items: FaqItem[];
};

type FaqSchemaProps = {
  data?: FaqSectionData;
};

const FaqSchema = ({ data }: FaqSchemaProps) => {
  const faqs = data?.items || [];
  if (faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.desc
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default FaqSchema;
