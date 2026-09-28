import { cn } from "@/lib/utils";

export type GlyphName = "build" | "receipt" | "shield" | "chart";

const LABEL: Record<GlyphName, string> = {
  build: "hermetic",
  receipt: "auditable",
  shield: "contained",
  chart: "observable",
};

/**
 * Four self-hosted 3D glyphs for the signal row. 15.5 KB of WebP in total.
 *
 * These replace SpaceUI's `Animoji`, which resolves through `@usespaceui/emoji`
 * — a 13 MB install (27 MB of dist plus a 14 MB manifest) carrying the entire
 * Unicode set, to render four characters. It alone pushed the bundle from
 * 552 kB to 1.66 MB.
 *
 * The four files came from SpaceUI's own emoji CDN, following the path shape in
 * the package's own resolver:
 *   https://cdn.spaceui.one/common/emoji/{source}/{type}/{codepoint}.{ext}
 * with source=fluent, type=3d, ext=webp. The variation selector is part of the
 * codepoint — 🏗️ is `1f3d7-fe0f`, not `1f3d7`, and omitting it 404s. Copied
 * locally rather than hot-linked so there is no third-party runtime request and
 * the files can never change underneath the page.
 *
 * Sized in absolute px, NOT em. These are transparent-background 3D renders, and
 * `size-[1em]` resolved against the 11px mono label font gave each one an 11x11
 * box — at that size the shading collapses into an orange smudge and the glyphs
 * read as noise rather than as the crane, receipt, shield and chart they are.
 * A 3D emoji needs roughly 18px of box before it is legible at all.
 */
export function Glyph({ name, className }: { name: GlyphName; className?: string }) {
  return (
    <img
      src={`/emoji/${name}.webp`}
      alt={LABEL[name]}
      title={LABEL[name]}
      width={18}
      height={18}
      decoding="async"
      className={cn("inline-block size-[18px] shrink-0", className)}
    />
  );
}

/** Signal row: glyph + label pairs, kept on one mono line. */
export function SignalRow({
  items,
  className,
}: {
  items: { glyph: GlyphName; label: string }[];
  className?: string;
}) {
  return (
    <ul className={cn("mono flex flex-wrap items-center gap-x-4 gap-y-1.5 o-2", className)}>
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5">
          <Glyph name={item.glyph} />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
