import { useState } from "react";
import { buildBrandfetchLogoUrl, type BrandfetchLogoType } from "@/lib/brandfetch";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  domain?: string;
  label: string;
  size?: number;
  type?: BrandfetchLogoType;
  className?: string;
  fallbackClassName?: string;
  fallbackText?: string;
}

const createFallbackText = (label: string) => {
  const initials = label
    .split(/[\s/.-]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return initials || label.slice(0, 2).toUpperCase();
};

const BrandLogo = ({
  domain,
  label,
  size = 18,
  type = "icon",
  className,
  fallbackClassName,
  fallbackText,
}: BrandLogoProps) => {
  const [hasError, setHasError] = useState(false);

  const src = !hasError && domain
    ? buildBrandfetchLogoUrl({
        domain,
        type,
        fallback: type === "icon" ? "lettermark" : "transparent",
        w: size * 2,
        h: size * 2,
      })
    : "";

  if (!src) {
    return (
      <span
        className={cn(
          "text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/70",
          fallbackClassName,
        )}
      >
        {fallbackText ?? createFallbackText(label)}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={`${label} logo`}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={cn("max-h-full max-w-full object-contain", className)}
      onError={() => setHasError(true)}
    />
  );
};

export default BrandLogo;
