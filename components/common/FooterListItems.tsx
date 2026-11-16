"use client";

import React from "react";
import Link from "next/link";

import HoverSplitText from "./TextHoverReveal";

type FooterLink = {
  name: string;
  href: string;
};

type FooterSection = {
  title: string;

  links?: FooterLink[];
};

type FooterListItemsProps = {
  section: FooterSection;
};

const formatFooterLink = (href: string) => {
  if (!href) return "/";

  // Clean the input
  const cleanHref = href.trim();

  // Return external links as-is
  if (cleanHref.startsWith("http")) {
    return cleanHref;
  }

  // Remove leading slash for uniform mapping
  let path = cleanHref;
  if (path.startsWith("/")) {
    path = path.slice(1);
  }

  const normalized = path.toLowerCase().trim();

  // Route mappings
  if (normalized === "about-us" || normalized === "about") return "/about";
  if (normalized === "our-work" || normalized === "portfolio") return "/portfolio";
  if (normalized === "blog") return "/blog";
  if (normalized === "contact-us" || normalized === "contact") return "/contact-us";
  if (normalized === "location") return "/location";
  if (
    normalized === "case-studies" ||
    normalized === "case-study" ||
    normalized === "caes-study"
  ) {
    return "/case-studies";
  }

  // Services sub-routes
  // Only web-design and web-development have serviceDetails documents in Sanity.
  // The rest do not exist as detail pages in the project, so they map to the main /services page.
  if (normalized === "services/web-design" || normalized === "web-design") {
    return "/services/web-design";
  }
  if (normalized === "services/web-development" || normalized === "web-development") {
    return "/services/web-development";
  }

  // Any other service pages (e.g. app-development, digital-marketing, e-commerce-solutions, brand-identity)
  // should map to the existing main services page.
  if (
    normalized.startsWith("services/") ||
    [
      "services",
      "app-development",
      "digital-marketing",
      "e-commerce-solutions",
      "ecommerce-solutions",
      "brand-identity"
    ].includes(normalized)
  ) {
    return "/services";
  }

  // Legal sub-routes
  if (normalized === "privacy-policy") return "/privacy-policy";
  if (normalized === "terms-&-conditions" || normalized === "terms-conditions") return "/terms-conditions";
  if (normalized === "refund-policy") return "/terms-conditions";
  if (normalized === "cookie-policy") return "/privacy-policy";

  return cleanHref.startsWith("/") ? cleanHref : `/${cleanHref}`;
};

const FooterListItems = ({ section }: FooterListItemsProps) => {
  return (
    <div>
      {/* TITLE */}
      <h3 className="font-voyage mb-6 text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl">
        {section?.title}
      </h3>

      {/* LINKS */}
      <ul className="space-y-3">
        {section?.links?.map((link, index) => (
          <Link
            key={index}
            href={formatFooterLink(link?.href)}
            className="text-antiflash relative block overflow-hidden text-sm duration-300 sm:text-base md:text-lg lg:text-sm xl:text-base whitespace-nowrap"
          >
            <HoverSplitText text={link?.name || ""} />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default FooterListItems;
