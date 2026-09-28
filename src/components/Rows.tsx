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

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mono mb-3 text-xs tracking-[0.14em] o-3 uppercase", className)}>{children}</p>;
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
  muted = false,
  onSelect,
  className,
}: {
  label: string;
  badge?: string;
  value?: string;
  href?: string;
  muted?: boolean;
  onSelect?: () => void;
  className?: string;
}) {
  const inner = (
    <>
      <span className="flex min-w-0 items-center gap-2 overflow-hidden">
        <span className="shrink-0 font-semibold">{label}</span>
        {badge && (
          <span className="glass shrink-0 rounded-full px-2 py-0.5 text-xs whitespace-nowrap o-2">
            {badge}
          </span>
        )}
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
 * Status dot. SpaceUI's StatusBadge hardcodes off-palette fills (green-300,
 * purple-300) which would break the single-accent rule, so state is carried by
 * the family accent plus one semantic exception.
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
export function SquareControl({  children,
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
      className="glass flex size-12 cursor-pointer items-center justify-center transition-opacity hover:o-1 disabled:cursor-default disabled:o-3"
    >
      {children}
    </button>
  );
}
