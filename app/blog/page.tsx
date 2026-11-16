import BlogClient from "@/components/blog/BlogClient";
import PrivacyPolicyHero from "@/components/privacy-policy/PrivacyPolicyHero";
import { getAllCategories, getAllPosts } from "@/lib/blog.server";
import { generateSeo } from "@/lib/seo";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return generateSeo({
    seo: {
      metaTitle: "Blog | Star Works",
      metaDescription: "Expert insights on Next.js, React, SEO, and modern web development.",
    },
    path: "/blog",
  });
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  return (
    <>
      <PrivacyPolicyHero
        data={{
          sectionTitle: "Blog",
          headingOne: "Latest Insights",
          headingTwo: "& Resources",
        }}
      />
      <BlogClient posts={posts} categories={categories} />
    </>
  );
}
