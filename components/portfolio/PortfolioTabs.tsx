"use client";

import SearchInput from "../common/SearchInput";

type PortfolioTabsProps = {
  tabs: string[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  searchPlaceholder?: string;
  className?: string;
};

const PortfolioTabs = ({
  tabs,
  activeTab,
  setActiveTab,
  search,
  setSearch,
  searchPlaceholder,
  className,
}: PortfolioTabsProps) => {
  return (
    <div className={className}>
      <div className="portfolio-search-wrapper" style={{ opacity: 0 }}>
        <SearchInput
          placeholder={searchPlaceholder || "What are you looking for..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mx-auto w-full"
        />
      </div>

      <div className="no-scrollbar mt-8 flex w-full min-w-0 flex-nowrap justify-start gap-3 overflow-x-auto py-2 sm:flex-wrap sm:justify-center sm:gap-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveTab(tab);
            }}
            className={`btn-chip shrink-0 ${
              activeTab === tab ? "btn-chip-active" : ""
            }`}
            style={{ opacity: 0 }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PortfolioTabs;
