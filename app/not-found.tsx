"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-mod text-mos text-antiflash px- z-50 flex h-dvh min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Background Text */}
      <div className="font-voyage pointer-events-none absolute text-[180px] font-bold uppercase opacity-[0.03] sm:text-[250px] md:text-[300px]">
        LOST
      </div>

      {/* 404 */}
      <div className="font-voyage relative flex items-end text-[50px] leading-none font-bold uppercase sm:text-[80px] md:text-[100px]">
        404
      </div>

      {/* LINE */}
      <div className="my-6 h-px w-full max-w-xs bg-current opacity-30 sm:max-w-sm" />

      {/* MESSAGE */}
      <p className="font-voyage px-4 text-center text-sm tracking-widest uppercase sm:text-base">
        The page you seek does not exist
      </p>

      {/* BUTTON */}
      <Link
        href="/"
        className="font-voyage mt-10 border border-current px-8 py-3 text-xs tracking-widest uppercase opacity-80 transition-opacity duration-300 hover:opacity-100 sm:text-sm"
      >
        Return Home
      </Link>
    </div>
  );
}
