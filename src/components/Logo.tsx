import { useState } from "react";
import type { LogoId } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Third-party brand marks, self-hosted in public/logos.
 *
 * Rendered as a CSS mask rather than an <img>. An SVG referenced by <img> is
 * painted in an isolated document, so `fill="currentColor"` inside it resolves
 * to that document's own `color` — black — and never sees the host page. That
 * made every mark invisible on the dark background. As a mask only the alpha
 * channel matters, so the shape still reads, and the visible colour comes from
 * `background-color: currentColor`, which does inherit and therefore follows
 * the active accent family in both modes.
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
  const url = `/logos/${id}.svg`;
  return (
    <span
      role="img"
      aria-label={title ?? id}
      title={title ?? id}
      onError={() => setFailed(true)}
      className={cn("inline-block size-4 shrink-0 bg-current", className)}
      style={{
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
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
