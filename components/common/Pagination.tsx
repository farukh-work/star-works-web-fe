// Pagination.tsx
"use client";

import { PaginationArrowV2Icon } from "./Icons";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const generatePages = () => {
    const pages: (number | string)[] = [];

    // ALWAYS SHOW FIRST PAGE
    pages.push(1);

    // LEFT DOTS
    if (currentPage > 3) {
      pages.push("...");
    }

    // MIDDLE PAGES
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    // RIGHT DOTS
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // ALWAYS SHOW LAST PAGE
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return Array.from(new Set(pages));
  };

  const pages = generatePages();

  return (
    <div className="flex items-center gap-3">
      {/* PREV */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="hover:border-primary hover:text-primary flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 disabled:pointer-events-none disabled:opacity-40"
      >
        <PaginationArrowV2Icon />
      </button>

      {/* PAGES */}
      <div className="flex items-center gap-3">
        {pages.map((page, index) => {
          const isActive = currentPage === page;

          return (
            <button
              key={index}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
              className={`flex size-10 items-center justify-center rounded-full border text-base font-semibold transition-all duration-300 ${
                isActive
                  ? "border-primary bg-primary text-black"
                  : "hover:border-primary hover:text-primary border-white/15 text-white"
              } ${page === "..." ? "cursor-default" : ""}`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* NEXT */}
      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className="hover:border-primary hover:text-primary flex size-10 rotate-180 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 disabled:pointer-events-none disabled:opacity-40"
      >
        <PaginationArrowV2Icon />
      </button>
    </div>
  );
};

export default Pagination;
