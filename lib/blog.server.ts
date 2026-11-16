// ==============================
// ALL POSTS — listing page

import { client } from "@/sanity/client";

// ==============================
export async function getAllPosts() {
  return await client.fetch(
    `*[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      category,
      tags,
      publishedAt,
      author,
      aiGenerated,
      "coverImage": mainImage.asset->url,
      "readTime": string(round(length(coalesce(pt::text(content), content)) / 200)) + " min read"
    }`,
    {},
    { next: { revalidate: 3600 } },
  );
}

// ==============================
// SINGLE POST — detail page
// ==============================
export async function getPostBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      content,
      category,
      tags,
      publishedAt,
      _updatedAt,
      author,
      aiGenerated,
      seo,
      "coverImage": mainImage.asset->url,
      "wordCount": length(string::split(coalesce(pt::text(content), content), " ")),
      "readTime": string(round(length(coalesce(pt::text(content), content)) / 200)) + " min read"
    }`,
    { slug },
    { next: { revalidate: 3600 } },
  );
}

// ==============================
// RELATED POSTS — same category
// ==============================
export async function getRelatedPosts(post: any, limit = 3) {
  return await client.fetch(
    `*[_type == "blog" && category == $category && slug.current != $slug]
     | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      category,
      "coverImage": mainImage.asset->url
    }`,
    {
      category: post.category,
      slug: post.slug,
      limit,
    },
  );
}

// ==============================
// ALL CATEGORIES — filter bar
// ==============================
export async function getAllCategories(): Promise<string[]> {
  const result = await client.fetch(
    `array::unique(*[_type == "blog" && defined(category)].category)`,
  );
  return (result as string[]).filter(Boolean).sort();
}
