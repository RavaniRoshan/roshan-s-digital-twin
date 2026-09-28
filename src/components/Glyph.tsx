import { cn } from "@/lib/utils";

export type GlyphName = "build" | "receipt" | "shield" | "chart";

const LABEL: Record<GlyphName, string> = {
  build: "hermetic",
  receipt: "auditable",
  shield: "contained",
  chart: "observable",
};

/**
 * Four self-hosted glyphs for the signal row, sized to 1em so they sit on the
 * text baseline rather than beside it.
 *
 * These replace SpaceUI's `Animoji`, which resolves through `@usespaceui/emoji`
 * — a 13 MB install (27 MB of dist plus a 14 MB manifest) carrying the entire
 * Unicode set, to render four characters. These four SVGs are 3.7 KB in total.
 */
export function Glyph({ name, className }: { name: GlyphName; className?: string }) {
  return (
    <img
      src={`/emoji/${name}.svg`}
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
