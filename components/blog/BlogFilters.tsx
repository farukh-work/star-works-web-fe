"use client";

import SearchInput from "../common/SearchInput";

type BlogFiltersProps = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

const BlogFilters = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}: BlogFiltersProps) => {
  return (
    <div className="blog-filter-section">
      <div className="blog-filter-layout">
        {/* SEARCH */}
        <div className="w-full">
          <SearchInput
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* TABS */}
        <div className="blog-categories-container">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`btn-chip ${
              selectedCategory === "All" ? "btn-chip-active" : ""
            }`}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`btn-chip ${
                selectedCategory === category ? "btn-chip-active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogFilters;
