import { useState } from "react";
import type { LogoId } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Real brand marks, self-hosted in public/logos. Each SVG was normalised to
 * `fill="currentColor"`, so a logo inherits the surrounding text colour and
 * therefore follows the active accent family instead of carrying its own brand
 * hex — which is what keeps 14 different logos from turning into a toy box.
 */
export function Logo({
  id,
  className,
  title,
}: {
  id: LogoId;
  className?: string;
  title?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={`/logos/${id}.svg`}
      alt={title ?? id}
      title={title ?? id}
      width={16}
      height={16}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("size-4 shrink-0", className)}
    />
  );
}

/** Language mark for a system row, derived from its declared language. */
export function languageLogo(lang: string): LogoId | null {
  const map: Record<string, LogoId> = {
    rust: "rust",
    python: "python",
    typescript: "typescript",
    zig: "zig",
    c: "cplusplus",
    "c++": "cplusplus",
  };
  return map[lang.toLowerCase()] ?? null;
}
