import React from "react";
import ScrollRevealCard from "../common/ScrollRevealCard";
import { formatDate } from "@/lib/utlis";
interface Post {
  publishedAt?: string;
  readTime?: string;
  tags?: string[];
}

interface DetailsMetaProps {
  authorName: string;
  authorRole: string;
  post: Post;
}

const DetailsMeta: React.FC<DetailsMetaProps> = ({
  authorName,
  authorRole,
  post,
}) => {
  return (
    <ScrollRevealCard className="mb-10 md:mb-14">
      <div className="flex flex-wrap items-center gap-4 sm:gap-8 border-b border-white/10 pb-6 md:pb-10">
        {/* AUTHOR */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="bg-primary/20 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full shrink-0">
            <span className="text-primary text-lg sm:text-2xl font-bold">
              {authorName.charAt(0)}
            </span>
          </div>

          <div>
            <p className="text-lg sm:text-xl font-semibold text-white">{authorName}</p>
            <p className="text-xs sm:text-sm text-white/60">{authorRole}</p>
          </div>
        </div>

        <div className="hidden h-14 w-px bg-white/10 md:block" />

        {/* DATE */}
        <div>
          <p suppressHydrationWarning className="text-xs sm:text-sm text-white/60">
            {formatDate(post?.publishedAt || "")}
          </p>

          <p className="mt-1 text-xs sm:text-sm text-white/40">
            {post?.readTime || "5 min read"}
          </p>
        </div>

        <div className="hidden h-14 w-px bg-white/10 md:block" />

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {post?.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/5 px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm text-white/80"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </ScrollRevealCard>
  );
};

export default DetailsMeta;
