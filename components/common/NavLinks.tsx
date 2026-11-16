"use client";
import Link from "next/link";
import HoverSplitText from "./TextHoverReveal";

const formatNavText = (text: any) => {
  if (typeof text === "string") {
    let formatted = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    formatted = formatted.replace(/\bfaqs\b/gi, "FAQs");
    return formatted;
  }
  return text;
};

const NavLinks = ({ obj }: NavLinkProps) => {
  return (
    <Link
      href={`/${obj.href}`}
      className="relative block overflow-hidden text-sm text-white sm:text-base xl:text-lg"
    >
      <HoverSplitText text={formatNavText(obj.title)} />
    </Link>
  );
};

export default NavLinks;
