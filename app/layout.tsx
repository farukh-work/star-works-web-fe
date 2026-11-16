import "@/styles/globals.css";
import BackToTopButton from "@/components/common/BackToTopButton";
import CursorTrail from "@/components/common/CursorTrail";
import ScrollProgressBar from "@/components/common/ScrollProgressBar";
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";
import NavbarWrapper from "@/components/common/NavbarWrapper";
import Footer from "@/components/common/Footer";
import LeftSideIcons from "@/components/common/LeftSideIcons";
import { switzer, voyage } from "@/components/common/fonts";
import type { Metadata } from "next";
import Preloader from "@/components/preloader/Preloader";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Star Works | Web Design & Development Agency",
    template: "%s | Star Works",
  },
  description: "Star Works delivers professional web design, app development, e-commerce, and digital marketing services. Trusted by businesses worldwide.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/webp/fav.webp", type: "image/webp" },
    ],
    apple: { url: "/images/webp/favicon-1.webp", type: "image/webp" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${switzer.variable} ${voyage.variable} bg-moss min-h-screen flex flex-col`}>
        <Preloader />
        <SmoothScrollProvider />
        <CursorTrail />
        <ScrollProgressBar />
        <NavbarWrapper />
        <GoogleAnalytics />
        <main className="grow w-full">
          {children}
        </main>
        <Footer />
        <LeftSideIcons />
        <BackToTopButton />
      </body>
    </html>
  );
}
