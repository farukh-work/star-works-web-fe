"use client";

import { formatDate } from "@/lib/utlis";
import { BlogPost } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "../common/Icons";

type BlogCardProps = {
  post: BlogPost;
  /** Eager-load only the first row of cards; the rest lazy-load. */
  priority?: boolean;
};

const BlogCard = ({ post, priority = false }: BlogCardProps) => {
  return (
    <Link href={`/blog/${post.slug}`} className="group blog-card-link">
      <div className="blog-card-container flex flex-col">
        {/* IMAGE */}
        <div className="blog-card-img-wrapper h-48">
          <span className="blog-card-category-badge">{post.category}</span>

          <Image
            src={post?.coverImage || "/fallback-blog.jpg"}
            alt={post?.title || "Blog Image"}
            fill
            // Card renders at ~33vw (3-col) on desktop, ~50vw on tablet, full
            // width on mobile — without this Next defaults to 100vw and serves a
            // ~1012px image into a 341px box (the "Improve image delivery" waste).
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />
        </div>
        {/* CONTENT */}
        <div className="blog-card-content grow">
          {/* META */}
          <div className="blog-card-meta-badge">
            <span>{formatDate(post.publishedAt)}</span>

            <span>•</span>

            <span>{post.readTime || "5 min read"}</span>
          </div>

          {/* TITLE */}
          <h3 className="blog-card-title">{post.title}</h3>

          {/* EXCERPT */}
          <p className="blog-card-excerpt">{post.excerpt}</p>

          {/* BUTTON */}
        </div>
        <div className="blog-card-read-btn flex items-center justify-center gap-2">
          <span>Read More</span>
          <ArrowIcon />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
