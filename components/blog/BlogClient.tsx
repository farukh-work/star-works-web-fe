"use client";

import { BlogPost } from "@/types/blog";
import { useMemo, useState } from "react";
import Pagination from "../common/Pagination";
import ScrollRevealCard from "../common/ScrollRevealCard";
import BlogFilters from "./BlogFilters";
import BlogCard from "./BlogCard";

interface BlogPageProps {
  posts: BlogPost[];
  categories: string[];
}

const BlogClient = ({ posts, categories }: BlogPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // FILTER POSTS
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // CATEGORY CHANGE
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // SEARCH CHANGE
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const postsPerPage = 6;

  // PAGINATED POSTS
  const displayedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;

    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage]);

  // TOTAL PAGES
  const totalPages = useMemo(() => {
    return Math.ceil(filteredPosts.length / postsPerPage) || 1;
  }, [filteredPosts.length]);

  return (
    <div className="container-wrapper section-spacing">
      <ScrollRevealCard delay={0} duration={0.7} y={40}>
        <BlogFilters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
        />
      </ScrollRevealCard>

      {/* BLOG GRID */}
      <div className="blog-grid">
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post, index) => (
            <ScrollRevealCard
              key={post._id || index}
              delay={index * 0.1}
              className="h-full"
            >
              <BlogCard post={post} priority={index < 3} />
            </ScrollRevealCard>
          ))
        ) : (
          <div className="col-span-full flex min-h-100 flex-col items-center justify-center text-center">
            <h3 className="text-antiflash text-sm font-semibold sm:text-base md:text-lg lg:text-xl">
              No Blogs Found
            </h3>

            <p className="text-muted-foreground mt-3 max-w-md">
              {searchQuery
                ? "No blog posts match your search criteria."
                : selectedCategory !== "All"
                  ? `No blog posts available in "${selectedCategory}" category yet.`
                  : "No blog posts available at the moment."}
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {filteredPosts.length > 0 && totalPages > 1 && (
        <div className="mt-14 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default BlogClient;
