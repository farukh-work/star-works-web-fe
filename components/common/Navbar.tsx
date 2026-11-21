"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LinkPath from "./LinkPath";
import { StarWorksLogo, StarWorksLogoIcon } from "./Icons";
import { HamburgerIcon } from "./MainIcons";
import NavLinks from "./NavLinks";
import Sidebar from "./Sidebar";
import { lenisRef } from "./SmoothScrollProvider";



// Adds a Roadmap link after Services when the CMS menu does not have one yet.
const withRoadmap = (links: any[] | undefined) => {
  if (!links) return links;
  if (links.some((l) => /roadmap/i.test(l?.href || ""))) return links;
  const i = links.findIndex((l) => /services/i.test(l?.href || ""));
  const item = { _key: "roadmap-link", title: "Roadmap", href: "roadmap" };
  return i === -1 ? [...links, item] : [...links.slice(0, i + 1), item, ...links.slice(i + 1)];
};

const Navbar = ({ headerData }: { headerData: HeaderData }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on navigation (pathname change)
  useEffect(() => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [pathname]);

  // LENIS & BODY SCROLL LOCK
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = "";
      lenisRef.current?.start();
    }

    return () => {
      document.body.style.overflow = "";
      lenisRef.current?.start();
    };
  }, [sidebarOpen]);

  // SPLIT TEXT

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-moss/85 backdrop-blur-lg transition-[background-color,padding,backdrop-filter] duration-300">
      <div className="container-wrapper z-40 flex items-center justify-between py-3 lg:py-6">
        {/* LOGO */}
        <Link href="/" className="text-3xl font-bold text-white">
          <span className="sm:hidden">
            <StarWorksLogoIcon />
          </span>

          <span className="hidden sm:block">
            <StarWorksLogo />
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:block">
          <ul className="flex items-center space-x-4 xl:space-x-8">
            {withRoadmap(headerData?.navLinks)?.map((obj, index: number) => (
              <NavLinks key={index} obj={obj} />
            ))}
          </ul>
        </div>

        {/* BUTTON */}
        <div className="flex items-center gap-3">
          <LinkPath
            href={headerData?.buttonLink || "/contact-us"}
            isIcon={false}
            noScrollReveal={true}
          >
            {headerData?.buttonText}
          </LinkPath>

          {/* MOBILE MENU */}
          <button
            onClick={() => {
              if (sidebarOpen) return;
              setSidebarOpen(true);
            }}
            className="flex size-10 items-center justify-center gap-2 lg:hidden lg:size-12"
          >
            <HamburgerIcon />
          </button>
        </div>

        {/* SIDEBAR */}
        <Sidebar
          headerData={{ ...headerData, navLinks: withRoadmap(headerData?.navLinks) as any }}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
    </nav>
  );
};

export default Navbar;
