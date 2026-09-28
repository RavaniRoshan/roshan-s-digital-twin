import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Emoji rendered as inline 3D art, the way SpaceUI's `Animoji` does it.
 *
 * Reimplemented rather than installed, for two reasons that are not stylistic:
 *
 *   1. The registry version imports `next/image`, so it cannot compile here at
 *      all — `next` is not a dependency of a static Vite bundle, and adding a
 *      React framework to render a few emoji is not a trade worth making.
 *   2. It resolves characters through `@usespaceui/emoji`, a 13.1 MB install
 *      (11.3 MB of dist plus a manifest) carrying the whole Unicode set, to
 *      draw the handful of glyphs on this page. That single dependency moved
 *      the bundle from 552 kB to 1.66 MB.
 *
 * So the art is self-hosted under public/emoji, resolved once from SpaceUI's
 * own CDN, and only the characters actually used are listed. Everything else
 * falls through as plain text, which means an unrecognised emoji degrades to
 * the system font instead of rendering a broken image.
 *
 * Segmentation is done with `Intl.Segmenter` rather than a regex: it keeps
 * variation selectors and ZWJ sequences attached, so "🏗️" arrives as one
 * grapheme instead of being split into a base character and a stray selector.
 */
const ART: Record<string, string> = {
  "🏗️": "/emoji/build.webp",
  "🧾": "/emoji/receipt.webp",
  "🛡️": "/emoji/shield.webp",
  "📊": "/emoji/chart.webp",
  "👋": "/emoji/wave.webp",
};

const segmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : null;

export function Animoji({ children, className }: { children: string; className?: string }) {
  if (!segmenter) return <>{children}</>;

  const out: ReactNode[] = [];
  let key = 0;
  for (const { segment } of segmenter.segment(children)) {
    const art = ART[segment];
    out.push(
      art ? (
        <img
          key={key}
          src={art}
          alt={segment}
          title={segment}
          width={18}
          height={18}
          decoding="async"
          // min() keeps the art legible in prose while refusing to shrink below
          // a readable size if this is ever dropped into small mono text — the
          // trap that made the signal-row glyphs look like coloured noise.
          className={cn(
            "inline-block size-[min(1.15em,18px)] -translate-y-[0.06em] align-baseline",
            className,
          )}
        />
      ) : (
        <Fragment key={key}>{segment}</Fragment>
      ),
    );
    key++;
  }
  return <>{out}</>;
}
