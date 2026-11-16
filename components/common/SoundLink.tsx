"use client";
import Link from "next/link";
import { playFooterLinkSound } from "@/utils/sound";

interface SoundLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

const SoundLink = ({ href, className, children, target, rel }: SoundLinkProps) => {
  return (
    <Link
      href={href}
      className={className}
      target={target}
      rel={rel}
      onMouseDown={playFooterLinkSound}
      onTouchStart={playFooterLinkSound}
    >
      {children}
    </Link>
  );
};

export default SoundLink;
