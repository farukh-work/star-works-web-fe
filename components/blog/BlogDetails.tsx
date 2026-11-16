"use client";

import { LeftArrow } from "@/components/common/Icons";
import ScrollRevealCard from "@/components/common/ScrollRevealCard";
import { formatDate } from "@/lib/utlis";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import markdownComponents from "../common/markdownComponents";
import RelatedPosts from "./RelatedPosts";
import BlogShare from "./BlogShare";
import DetailsMeta from "./DetailsMeta";
type BlogDetailProps = {
  post: any;
  relatedPosts: any[];
};

const BlogDetails = ({ post, relatedPosts }: BlogDetailProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const authorName = post?.author?.name || "Star Works";
  const authorRole = post?.author?.role || "Web Developer";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.starworks.in";
  const postUrl = `${siteUrl}/blog/${post?.slug}`;

  const keywords = [
    ...(Array.isArray(post?.tags) ? post.tags : []),
    post?.category,
  ].filter(Boolean);

  return (
    <>
      {/* SEO JSON LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": postUrl,
            },
            headline: post?.title || "",
            description: post?.excerpt || "",
            image: post?.coverImage || `${siteUrl}/star-works-metaimage.webp`,
            datePublished: post?.publishedAt || "",
            dateModified: post?._updatedAt || post?.publishedAt || "",
            url: postUrl,
            ...(typeof post?.wordCount === "number" && post.wordCount > 0
              ? { wordCount: post.wordCount }
              : {}),
            keywords: keywords.length ? keywords.join(", ") : "Blog",
            author: {
              "@type": "Person",
              name: authorName,
              jobTitle: authorRole,
              url: `${siteUrl}/about`,
            },
            publisher: {
              "@type": "Organization",
              name: "Star Works",
              url: siteUrl,
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/images/png/logo.png`,
              },
            },
          }),
        }}
      />

      <article className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 md:pt-40 pb-12 md:pb-20">
        {/* BACK */}
        <ScrollRevealCard className="mb-10">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 text-xl text-white/70 transition-all duration-300 hover:text-white"
          >
            <LeftArrow className="transition-all duration-300 group-hover:-translate-x-2" />
            Back to Blog
          </Link>
        </ScrollRevealCard>

        {/* CATEGORY */}
        <ScrollRevealCard className="mb-6">
          <span className="bg-primary/20 text-primary inline-flex rounded-full px-5 py-2 text-sm font-semibold">
            {post?.category || "Blog"}
          </span>
        </ScrollRevealCard>

        {/* TITLE */}
        <ScrollRevealCard className="mb-6">
          <h1 className="font-voyage text-antiflash w-full gap-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[120%]! break-words">
            {post?.title}
          </h1>
        </ScrollRevealCard>

        {/* EXCERPT */}
        <ScrollRevealCard className="mb-6 sm:mb-10">
          <p className="about-description">{post?.excerpt}</p>
        </ScrollRevealCard>

        {/* META */}
        <DetailsMeta
          authorName={authorName}
          authorRole={authorRole}
          post={post}
        />

        {/* MAIN IMAGE */}
        <ScrollRevealCard className="relative mb-10 md:mb-16 h-48 sm:h-75 md:h-125 overflow-hidden rounded-xl lg:rounded-2xl xl:rounded-3xl">
          <Image
            src={post?.coverImage || ""}
            alt={post?.title || "Blog Image"}
            fill
            priority
            className="object-cover"
          />
        </ScrollRevealCard>

        {/* CONTENT */}
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
          {/* LEFT */}
          <ScrollRevealCard className="min-w-0">
            <div className="prose prose-sm md:prose-base prose-invert max-w-none text-white break-words">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {post?.content}
              </ReactMarkdown>
            </div>
          </ScrollRevealCard>

          {/* RIGHT */}
          <BlogShare slug={post?.slug} title={post?.title} />
        </div>

        {/* RELATED POSTS */}
        {relatedPosts?.length > 0 && <RelatedPosts posts={relatedPosts} />}
      </article>
    </>
  );
};

export default BlogDetails;
