"use client";

import { BlogPost } from "@/types/blog";
import ScrollRevealCard from "../common/ScrollRevealCard";
import BlogCard from "./BlogCard";

type RelatedPostsProps = {
  posts: BlogPost[];
};

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (!posts?.length) return null;

  return (
    <section className="mt-12 md:mt-20">
      <h2 className="mb-6 md:mb-10 text-3xl md:text-4xl font-bold text-white">Related Posts</h2>
      <div className="blog-grid">
        {posts.map((post, index) => (
          <ScrollRevealCard key={post._id || index} delay={index * 0.1}>
            <BlogCard post={post} />
          </ScrollRevealCard>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
