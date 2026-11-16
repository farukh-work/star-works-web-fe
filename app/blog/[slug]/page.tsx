import { notFound } from "next/navigation";

import BlogDetails from "@/components/blog/BlogDetails";

import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog.server";
import { sanitizeCanonical } from "@/lib/seo";

export const revalidate = 1;

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;
  const canonicalUrl = sanitizeCanonical(post.seo?.canonicalUrl || `/blog/${post.slug}`);
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt || post.publishedAt,
      authors: post.author?.name ? [post.author.name] : ["Star Works"],
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

const Page = async ({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post, 3);

  return <BlogDetails post={post} relatedPosts={relatedPosts} />;
};

export default Page;
