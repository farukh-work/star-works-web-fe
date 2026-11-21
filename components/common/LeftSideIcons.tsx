"use client";

import Link from "next/link";

export const GitHubIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

export const CalIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="8.5" cy="14" r="1" fill="currentColor" />
    <circle cx="12" cy="14" r="1" fill="currentColor" />
    <circle cx="15.5" cy="14" r="1" fill="currentColor" />
  </svg>
);

const LeftSideIcons = () => {
  return (
    <div className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex">
      {/* Vertical line top */}
      <div className="h-16 w-px bg-white/20" />

      {/* GitHub */}
      <Link
        href="https://github.com/farukh-work"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:scale-110"
      >
        <GitHubIcon />
      </Link>

      {/* Cal.com */}
      <Link
        href="https://cal.com/star-works/30min"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book a 30-minute call on Cal.com"
        className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:scale-110"
      >
        <CalIcon />
      </Link>

      {/* Vertical line bottom */}
      <div className="h-16 w-px bg-white/20" />
    </div>
  );
};

export default LeftSideIcons;
