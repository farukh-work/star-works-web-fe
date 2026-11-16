"use client";

import React from "react";
import NavLinks from "./NavLinks";
import { StarWorksLogo, StarWorksLogoIcon } from "./Icons";
import Link from "next/link";
import { CrossIcon } from "./MainIcons";
import LinkPath from "./LinkPath";

const Sidebar = ({ headerData, sidebarOpen, setSidebarOpen }: Props) => {
  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-[998] bg-black/50 backdrop-blur-md lg:hidden transition-opacity duration-400 ease-in-out ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* SIDEBAR */}
      <div
        className={`bg-surface-dark fixed inset-x-0 top-0 z-[999] flex h-screen flex-col overflow-hidden px-4 pb-8 lg:hidden transition-transform duration-400 ease-in-out ${
          sidebarOpen ? "translate-y-0 pointer-events-auto" : "-translate-y-full pointer-events-none"
        }`}
      >
        {/* TOP */}
        <div className="flex w-full items-center justify-between py-3">
          <Link href="/" className="text-3xl font-bold text-white">
            <span className="sm:hidden">
              <StarWorksLogoIcon />
            </span>

            <span className="hidden sm:block">
              <StarWorksLogo />
            </span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="flex size-10 items-center justify-center gap-2 cursor-pointer focus:outline-none"
          >
            <CrossIcon />
          </button>
        </div>

        {/* NAV */}
        <div className="no-scrollbar flex grow flex-col overflow-y-auto pt-10">
          <ul className="flex flex-col gap-5">
            {headerData?.navLinks?.map((obj, index: number) => (
              <li
                key={index}
                className="mobile-nav-item border-b border-white/10 pb-5"
              >
                <NavLinks obj={obj} />
              </li>
            ))}

            {/* BUTTON */}
            <li className="mobile-nav-item pt-5">
              <LinkPath
                isIcon={true}
                href={headerData?.buttonLink || "/contact-us"}
                className="w-full items-center justify-center gap-2"
              >
                {headerData?.buttonText || "Get In Touch"}
              </LinkPath>
            </li>
          </ul>
        </div>

        {/* FOOTER */}
        <div className="text-antiflash mt-auto flex items-center justify-between text-sm tracking-[3px] uppercase">
          <p>Starworks</p>
          <p>Creative Studio</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
