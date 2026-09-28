import { cn } from "@/lib/utils";

export type GlyphName = "build" | "receipt" | "shield" | "chart";

const LABEL: Record<GlyphName, string> = {
  build: "hermetic",
  receipt: "auditable",
  shield: "contained",
  chart: "observable",
};

/**
 * Four self-hosted 3D glyphs for the signal row, sized to 1em so they sit on
 * the text baseline rather than beside it. 15.5 KB of WebP in total.
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
 */
export function Glyph({ name, className }: { name: GlyphName; className?: string }) {
  return (
    <img
      src={`/emoji/${name}.webp`}
      alt={LABEL[name]}
      title={LABEL[name]}
      width={16}
      height={16}
      loading="lazy"
      decoding="async"
      className={cn("inline-block size-[1em] -translate-y-[0.08em]", className)}
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
