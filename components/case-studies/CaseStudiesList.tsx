"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { RightIcon } from "@/components/common/Icons";
import Button from "@/components/common/Button";
import PortfolioTabs from "@/components/portfolio/PortfolioTabs";

type Project = {
  title: string;
  slug: {
    current: string;
  };
  category: string;
  description: string;
  image: string;
  features?: {
    title: string;
    text: string;
  }[];
  tech?: string[];
  metric?: string;
  buttonText?: string;
  path?: string;
};

type CaseStudiesListProps = {
  projects: Project[];
  tabs?: string[];
  searchPlaceholder?: string;
};

const getProjectHref = (path?: string, slug?: string) => {
  const target = (path || slug || "").trim();
  if (target.startsWith("http://") || target.startsWith("https://")) {
    return target;
  }
  const cleanPath = target
    .replace(/^\/?portfolio\/?/, "")
    .replace(/^\//, "")
    .trim();
  return `/portfolio/${cleanPath}`;
};

const CaseStudiesList = ({
  projects,
  tabs = [],
  searchPlaceholder,
}: CaseStudiesListProps) => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  const tabsList = ["All", ...tabs];

  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      if (!item) return false;
      const matchesTab = activeTab === "All" || item.category === activeTab;

      const matchesSearch =
        (item.title || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.category || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.description || "").toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search, projects]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  return (
    <section className="container-wrapper py-12 md:py-20">
      {/* Search and Tabs */}
      <PortfolioTabs
        tabs={tabsList}
        activeTab={activeTab}
        setActiveTab={(value) => {
          setActiveTab(value);
          setVisibleCount(4); // Reset pagination on tab change
        }}
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setVisibleCount(4); // Reset pagination on search
        }}
        searchPlaceholder={searchPlaceholder}
        className="mb-12 md:mb-16"
      />

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
        {displayedProjects.length > 0 ? (
          displayedProjects.map((project, index) => {
            const href = getProjectHref(project.path, project.slug?.current);
            return (
              <article
                key={project?.slug?.current || index}
                className="group hover:border-primary/30 relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[24px] border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 sm:min-h-[500px] md:p-8"
              >
                {/* Image background */}
                {project?.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 z-10 bg-linear-to-t from-black/95 via-black/50 to-transparent" />

                {/* Content Container */}
                <div className="relative z-20 flex flex-col">
                  {/* Title */}
                  <h3 className="font-voyage text-2xl tracking-wide text-white md:text-3xl">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="font-switzer mt-3 text-sm leading-[160%] text-white/60">
                    {project.description}
                  </p>

                  {/* Button/Link */}
                  <div className="mt-5">
                    <Link
                      href={href}
                      target={
                        project.path?.startsWith("http") ? "_blank" : undefined
                      }
                      className="group-hover:text-primary group-hover:border-primary hover:text-primary hover:border-primary inline-flex w-fit items-center gap-2 border-b border-white/20 pb-1 text-sm font-semibold text-white normal-case transition-all duration-300"
                    >
                      <span>{project.buttonText || "View case study"}</span>
                      <RightIcon className="group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center text-white/50">
            No case studies found.
          </div>
        )}
      </div>
      {/* Load More Button */}
      {filteredProjects.length > visibleCount && (
        <div className="mt-12 flex justify-center md:mt-16">
          <Button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            isIcon={false}
          >
            Load more
          </Button>
        </div>
      )}
    </section>
  );
};

export default CaseStudiesList;
