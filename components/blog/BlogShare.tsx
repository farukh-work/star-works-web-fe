"use client";

import Link from "next/link";
import { useState } from "react";

type BlogShareProps = {
  title: string;
  slug: string;
};

const BlogShare = ({ title, slug }: BlogShareProps) => {
  const [copied, setCopied] = useState(false);

  const blogUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.starworks.in"}/blog/${slug}`;

  const shareLinks = [
    {
      label: "Twitter",

      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title || "",
      )}&url=${encodeURIComponent(blogUrl)}`,
    },

    {
      label: "LinkedIn",

      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        blogUrl,
      )}`,
    },

    {
      label: "WhatsApp",

      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${title} - ${blogUrl}`,
      )}`,
    },
  ];

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <aside className="w-full">
      <div className="lg:sticky lg:top-30 rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
        <h3 className="mb-5 text-xl font-semibold text-white">Share Article</h3>

        <div className="flex flex-wrap gap-3 sm:gap-4">
          {shareLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition-all duration-300 hover:bg-white hover:text-black"
            >
              {item.label}
            </Link>
          ))}

          {/* COPY */}
          <button
            onClick={handleCopyLink}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default BlogShare;
