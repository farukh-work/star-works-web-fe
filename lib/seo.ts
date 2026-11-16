import type { Metadata } from "next";

import { urlFor } from "@/sanity/image";

type SEOProps = {
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    canonicalUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: any;
    noIndex?: boolean;
  };
  path?: string;
};

export const PRODUCTION_HOST = "www.starworks.in";

/**
 * Ensures canonical URLs always point to the production domain.
 * Rejects preview/staging domains (e.g. vercel.app) that may be
 * accidentally stored in the CMS. Resolves relative URLs.
 */
export const sanitizeCanonical = (url?: string): string | undefined => {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== PRODUCTION_HOST) {
      // Replace non-production hostname with the real domain
      parsed.hostname = PRODUCTION_HOST;
      parsed.protocol = "https:";
    }
    return parsed.toString().replace(/\/$/, "") || undefined;
  } catch {
    // If it's a relative path, resolve it with the production base
    const prefix = "https://" + PRODUCTION_HOST;
    const cleanPath = url.startsWith("/") ? url : "/" + url;
    return (prefix + cleanPath).replace(/\/$/, "");
  }
};

export const generateSeo = ({ seo, path }: SEOProps): Metadata => {
  const title = seo?.metaTitle || "Star Works | Web Design & Development Agency";

  const description = seo?.metaDescription || "Star Works delivers professional web design, app development, e-commerce, and digital marketing services. Trusted by businesses worldwide.";

  let image = `https://${PRODUCTION_HOST}/star-works-metaimage.webp`;
  if (typeof seo?.ogImage === "string") {
    image = seo.ogImage;
  } else if (seo?.ogImage?.asset) {
    try {
      image = urlFor(seo.ogImage).width(1200).height(630).url();
    } catch (e) {
      console.error("Error building SEO image URL:", e);
    }
  }

  const rawCanonical = seo?.canonicalUrl || path;

  return {
    title,
    description,

    keywords: seo?.metaKeywords || [],

    alternates: {
      canonical: sanitizeCanonical(rawCanonical),
    },

    robots: {
      index: !seo?.noIndex,
      follow: !seo?.noIndex,
    },

    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: [image],
    },
  };
};
