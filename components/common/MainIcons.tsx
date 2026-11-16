export const ArrowIcon = ({ className = "" }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 54 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className}`}
  >
    <path
      d="M36 42.75C36 41.0805 37.6492 38.5875 39.3187 36.495C41.4652 33.795 44.0302 31.4392 46.971 29.6415C49.176 28.2937 51.849 27 54 27M54 27C51.849 27 49.1737 25.7062 46.971 24.3585C44.0302 22.5585 41.4652 20.2027 39.3187 17.5072C37.6492 15.4125 36 12.915 36 11.25M54 27L0 27"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);
export const HamburgerIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    className={`${className}`}
  >
    <path
      fill="none"
      stroke="var(--color-antiflash)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 17h18M3 12h18M3 7h18"
    />
  </svg>
);
export const CrossIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 15 15"
    className={`${className}`}
  >
    <path
      fill="var(--color-antiflash)"
      d="M10.969 3.219a.574.574 0 1 1 .812.812L8.313 7.5l3.468 3.469l.074.09a.575.575 0 0 1-.796.796l-.09-.074L7.5 8.312l-3.469 3.47a.574.574 0 1 1-.812-.813L6.688 7.5l-3.47-3.469l-.073-.09a.575.575 0 0 1 .796-.797l.09.075L7.5 6.687z"
    />
  </svg>
);
