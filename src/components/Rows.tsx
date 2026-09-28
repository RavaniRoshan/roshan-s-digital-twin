import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Section rhythm: the reference spaces every block by a fixed 4rem. */
export function Block({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("mt-16 scroll-mt-4", className)}>
      {children}
    </section>
  );
}

/**
 * Section header, optionally numbered in the style of a technical drawing
 * callout: an index, a separator, and the label, with an L-shaped corner tick
 * at the leading edge.
 *
 * The numbering is not decoration. It reframes the page as a document with a
 * table of contents, which is what the rest of the site argues it is — and it
 * lets a reader who lands mid-page see where they are without scrolling back to
 * the index.
 */
export function SectionLabel({
  children,
  n,
  className,
}: {
  children: ReactNode;
  n?: number;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mono relative mb-3 flex items-center gap-2 pl-3 text-xs font-normal tracking-[0.14em] o-3 uppercase",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute top-1/2 left-0 h-2.5 w-2.5 -translate-y-1/2 border-t border-l border-current/40"
      />
      {n !== undefined && (
        <>
          {/* Decorative. Without aria-hidden the heading announces as
              "01 slasheslash position", which is worse than no number at all. */}
          <span aria-hidden className="text-chroma tabular-nums">
            {String(n).padStart(2, "0")}
          </span>
          <span aria-hidden className="o-3">
            //
          </span>
        </>
      )}
      <span>{children}</span>
    </h2>
  );
}

/**
 * Full-bleed hairline row. The right-hand value sits on its own background and
 * is preceded by a transparent-to-bg fade, so a long left label slides under it
 * instead of colliding — the trick the reference uses on every list row.
 */
export function Row({
  label,
  badge,
  value,
  href,
  lead,
  muted = false,
  onSelect,
  className,
}: {
  label: string;
  badge?: string;
  value?: string;
  href?: string;
  lead?: ReactNode;
  muted?: boolean;
  onSelect?: () => void;
  className?: string;
}) {
  const inner = (
    <>
      <span className="flex min-w-0 items-center gap-2 overflow-hidden">
        {lead}
        <span className="shrink-0 font-semibold">{label}</span>
        {badge && <span className="mono shrink-0 o-3">{badge}</span>}
      </span>

      {(value || href || onSelect) && (
        <span className="absolute top-0 right-4 bottom-0 z-10 flex items-center">
          <span
            aria-hidden
            className="pointer-events-none absolute top-0 -left-8 bottom-0 w-8"
            style={{ background: "linear-gradient(to right, transparent, var(--color-background))" }}
          />
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "bg-background text-sm transition-opacity",
                muted ? "o-3 line-through" : "o-2 hover:o-1",
              )}
            >
              {value ?? "open ↗"}
            </a>
          ) : onSelect ? (
            <button
              type="button"
              onClick={onSelect}
              className={cn(
                "bg-background cursor-pointer text-sm transition-opacity",
                muted ? "o-3 line-through" : "o-2 hover:o-1",
              )}
            >
              {value ?? "open ↗"}
            </button>
          ) : (
            <span className={cn("bg-background text-sm", muted ? "o-3" : "o-2")}>{value}</span>
          )}
        </span>
      )}
    </>
  );

  const shell = cn(
    "bleed relative flex items-center justify-between py-3 transition-colors",
    className,
  );

  if (onSelect && !href) {
    return (
      <button type="button" onClick={onSelect} className={cn(shell, "w-full cursor-pointer text-left")}>
        {inner}
      </button>
    );
  }
  return <div className={shell}>{inner}</div>;
}

/** Stacks rows into a single hairline-bounded list. */
export function RowStack({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("border-t border-b", className)}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={i} className={cn(i > 0 && "border-t")}>
              {child}
            </div>
          ))
        : children}
    </div>
  );
}

/**
 * Status state is the one place a semantic colour is allowed through: the
 * family accent plus a single exception, so six systems do not fracture the
 * single-accent rule into a bag of sweets.
 */
export function StatusDot({
  status,
  className,
}: {
  status: "active" | "stable" | "research";
  className?: string;
}) {
  const color =
    status === "active" ? "bg-chroma" : status === "research" ? "bg-info" : "bg-success";
  return (
    <span
      className={cn(
        "inline-block size-1.5 shrink-0 rounded-full",
        color,
        status === "active" && "animate-pulse-glow",
        className,
      )}
    />
  );
}

/** Small square icon control — the reference's prev/next buttons are border-radius:0. */
export function SquareControl({
  children,
  label,
  onClick,
  disabled,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flat-hair flex size-12 cursor-pointer items-center justify-center transition-colors hover:border-chroma/50 hover:text-chroma disabled:cursor-default disabled:o-3"
    >
      {children}
    </button>
  );
}
