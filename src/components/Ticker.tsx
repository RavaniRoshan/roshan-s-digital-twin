import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TickerItem = {
  id: string;
  label: string;
  meta: string;
  href: string;
};

/**
 * Full-bleed marquee. In the reference this is an ambient "now playing" strip;
 * here it doubles as the section index — the only navigation the layout needs.
 *
 * The reference renders a canvas waveform behind the strip. Dropped: at 640px it
 * read as a stray ripple rather than a signal, and it was the only animated
 * element visible in light mode. The strip now carries the hairline and nothing
 * else.
 */
export function Ticker({ items, label }: { items: TickerItem[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const nodes = items
      .map((i) => document.getElementById(i.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-12% 0px -80% 0px", threshold: 0 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="relative w-full overflow-hidden border-y text-foreground">
      <div
        className="animate-ticker relative flex w-max whitespace-nowrap py-2.5"
        style={{ willChange: "transform" }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex" aria-hidden={copy === 1}>
            {items.map((item) => (
              <a
                key={`${copy}-${item.id}`}
                href={`#${item.id}`}
                tabIndex={copy === 1 ? -1 : undefined}
                className="mono flex items-center text-xs"
                style={{ paddingRight: 64 }}
              >
                <span
                  className={cn(
                    "mr-2 size-1.5 shrink-0 rounded-full transition-colors",
                    active === item.id ? "bg-chroma" : "bg-foreground/25",
                  )}
                />
                <span
                  className={cn(
                    "tracking-tight transition-opacity",
                    active === item.id ? "o-1" : "o-2",
                  )}
                >
                  {item.label}
                </span>
                <span className="ml-1.5 o-3">{item.meta}</span>
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* left label + fade */}
      <div className="fade-l pointer-events-none absolute inset-y-0 left-0 z-10 w-[150px]" />
      <span className="mono pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4 text-xs tracking-[0.04em] o-2">
        {label}
      </span>
      {/* right fade */}
      <div className="fade-r pointer-events-none absolute inset-y-0 right-0 z-10 w-12" />
    </div>
  );
}
