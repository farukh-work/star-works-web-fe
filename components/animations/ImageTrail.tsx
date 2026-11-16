"use client";

import React, { useRef } from "react";
import { useImageTrail } from "@/hooks/useImageTrail";

export interface ImageTrailProps {
  images: string[];
}

export default function ImageTrail({ images }: ImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useImageTrail({ images, containerRef });

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
}
