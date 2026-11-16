import localFont from "next/font/local";

// Only the weights actually referenced in the app are declared here. Each
// declared face becomes a `<link rel="preload">` that competes for the limited
// connection on slow mobile networks, so the unused Thin/Extralight/Light/
// Extrabold faces (verified absent via `font-*` class usage) were dropped to
// free that bandwidth for the LCP font (Voyage) and the body text.
export const switzer = localFont({
  src: [
    {
      path: "../../public/fonts/switzer/Switzer-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/switzer/Switzer-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/switzer/Switzer-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/switzer/Switzer-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/switzer/Switzer-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-switzer",
  display: "swap",
});

export const voyage = localFont({
  src: [
    {
      path: "../../public/fonts/voyage/voyage.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-voyage",
  display: "swap",
});
