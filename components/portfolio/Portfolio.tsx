"use client";

import { useMemo, useState, useRef } from "react";
import Pagination from "../common/Pagination";
import PortfolioCard from "./PortfolioCard";
import PortfolioTabs from "./PortfolioTabs";
import ScrollRevealCard from "../common/ScrollRevealCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ITEMS_PER_PAGE = 2;

type Project = {
  title: string;
  slug: {
    current: string;
  };
  category: string;
  description: string;
  image: string;
  features: {
    title: string;
    text: string;
  }[];
  tech: string[];
  metric: string;
  buttonText?: string;
  path?: string;
};

type PortfolioProps = {
  data: {
    searchPlaceholder: string;
    tabs: string[];
    projects: Project[];
  };
};

const Portfolio = ({ data }: PortfolioProps) => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const tabs = ["All", ...(data?.tabs || [])];
  const projects = data?.projects || [];

  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      if (!item) return false;
      const matchesTab = activeTab === "All" || item.category === activeTab;

      const matchesSearch =
        (item.title || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.category || "").toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search, projects]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useGSAP(
    () => {
      // Animate search wrapper and category tabs on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
                    once: true,
        },
      });

      tl.fromTo(
        ".portfolio-search-wrapper",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      ).fromTo(
        ".btn-chip",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out",
          clearProps: "all",
        },
        "-=0.3"
      );
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      // Small scale pop animation when switching active tabs
      gsap.fromTo(
        ".btn-chip-active",
        { scale: 0.9 },
        {
          scale: 1,
          duration: 0.4,
          ease: "back.out(2)",
        },
      );
    },
    {
      dependencies: [activeTab],
      scope: containerRef,
    },
  );

  return (
    <section ref={containerRef} className="container-wrapper section-spacing">
      <PortfolioTabs
        tabs={tabs}
        searchPlaceholder={
          data?.searchPlaceholder || "What are you looking for..."
        }
        activeTab={activeTab}
        setActiveTab={(value) => {
          setActiveTab(value);
          setCurrentPage(1);
        }}
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
      />

      <div className="mt-8 md:mt-12 flex flex-col gap-6 md:gap-8">
        {paginatedProjects.length > 0 ? (
          paginatedProjects.map((item, index) => (
            <ScrollRevealCard
              key={`${activeTab}-${currentPage}-${item?.slug?.current || index}`}
              delay={0.05 * index}
              duration={0.6}
            >
              <PortfolioCard
                data={item}
                index={index}
              />
            </ScrollRevealCard>
          ))
        ) : (
          <div className="py-20 text-center text-white/50">
            No projects found.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-14 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
};

export default Portfolio;
