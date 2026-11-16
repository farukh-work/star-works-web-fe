import React from "react";

interface GlassIconProps {
  children: React.ReactNode;
  className?: string;
  size?: string;
}

export const GlassIcon = ({
  children,
  className = "",
  size = "",
}: GlassIconProps) => {
  return (
    <div
      className={`${size} border-greenGlass/20 bg-greenGlass/24 shadow-glass-icon flex items-center justify-center rounded-full border backdrop-blur-xs ${className}`}
    >
      {children}
    </div>
  );
};
