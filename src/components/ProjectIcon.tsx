import { cn } from "@/lib/utils";

/**
 * App-icon marks, one per system. All six are custom geometry on a shared
 * 24Ã—24 grid with a 1.75 stroke, so they read as one family rather than six
 * unrelated logos. Each glyph encodes what the system actually does.
 */

type Glyph = { name: string; node: React.ReactNode };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const GLYPHS: Record<string, Glyph> = {
  // niki — hermetic sandbox: an isolated container holding a working agent.
  niki: {
    name: "sandbox",
    node: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" {...stroke} strokeDasharray="3 2.5" opacity="0.55" />
        <rect x="7.5" y="7.5" width="9" height="9" rx="1.5" {...stroke} />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      </>
    ),
  },

  // backstop — budgets and circuit breaking: falling spend bars against a hard limit.
  backstop: {
    name: "budget",
    node: (
      <>
        <path d="M3.5 15.5h4v5h-4z" {...stroke} />
        <path d="M10 11.5h4v9h-4z" {...stroke} />
        <path d="M16.5 7.5h4v13h-4z" {...stroke} />
        <path d="M2.5 6.5h19" {...stroke} opacity="0.9" />
        <circle cx="18.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </>
    ),
  },

  // policyctl — deterministic gate between the agent and the codebase.
  policyctl: {
    name: "policy gate",
    node: (
      <>
        <path d="M4 21V7.5M20 21V7.5" {...stroke} />
        <rect x="4" y="4" width="16" height="3.5" rx="1" {...stroke} />
        <path d="M8.5 12.5l2.5 2.5 4.5-5" {...stroke} />
      </>
    ),
  },

  // skillproof — a proof attached to a claim.
  skillproof: {
    name: "proof",
    node: (
      <>
        <path d="M12 2.8l7 2.6v6c0 4.4-3 8.2-7 9.8-4-1.6-7-5.4-7-9.8v-6z" {...stroke} />
        <path d="M9 12.2l2.2 2.2 4-4.4" {...stroke} />
      </>
    ),
  },

  // phantom — works quietly in the background: a form that fades out of sight.
  phantom: {
    name: "background",
    node: (
      <>
        <path
          d="M5 20v-7.5a7 7 0 0114 0V20l-2.3-1.8L14.4 20l-2.4-1.8L9.6 20l-2.3-1.8z"
          {...stroke}
        />
        <path d="M3 20h18" {...stroke} strokeDasharray="2.5 2.5" opacity="0.5" />
      </>
    ),
  },

  // forge-cpu — mixture-of-experts routing inside a CPU die.
  "forge-cpu": {
    name: "inference",
    node: (
      <>
        <rect x="6.5" y="6.5" width="11" height="11" rx="2" {...stroke} />
        <rect x="10" y="10" width="4" height="4" rx="0.75" {...stroke} opacity="0.6" />
        <path d="M9.5 3v3.5M14.5 3v3.5M9.5 17.5V21M14.5 17.5V21" {...stroke} />
        <path d="M3 9.5h3.5M3 14.5h3.5M17.5 9.5H21M17.5 14.5H21" {...stroke} />
      </>
    ),
  },
};

export function ProjectMark({ slug, className }: { slug: string; className?: string }) {
  const glyph = GLYPHS[slug] ?? {
    name: slug,
    node: <circle cx="12" cy="12" r="7" {...stroke} />,
  };
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={glyph.name} className={className}>
      {glyph.node}
    </svg>
  );
}

/**
 * Real project marks, taken from each repo rather than invented here:
 *
 *   phantom     assets/phantom-mascot.svg
 *   policyctl   docs/src/assets/logo.svg
 *   skillproof  site/public/logo.svg + logo-dark.svg
 *
 * These keep their own colours on purpose. Six identical monochrome glyphs is
 * exactly the "everything looks the same" problem, and a rack of app tiles is
 * the one place where per-item colour is expected, like a home screen.
 *
 * niki and backstop only ever shipped wide wordmarks (200Ã—60 and 1200Ã—300) with
 * a baked background, which is unreadable inside a square tile — so they keep
 * the monoline mark here, and their real wordmark is used on the case-file page
 * where a wide lockup actually belongs. forge-cpu has no brand asset at all.
 */
const REAL: Record<string, { light: string; dark: string }> = {
  phantom: {
    light: "/logos/systems/phantom.svg",
    dark: "/logos/systems/phantom.svg",
  },
  policyctl: {
    light: "/logos/systems/policyctl.svg",
    dark: "/logos/systems/policyctl.svg",
  },
  skillproof: {
    light: "/logos/systems/skillproof.svg",
    dark: "/logos/systems/skillproof-dark.svg",
  },
};

export function hasRealMark(slug: string) {
  return slug in REAL;
}

/**
 * Real wordmarks, used at full column width on the case-file page rather than
 * inside a square tile. Both ship with a baked background, which is why they
 * sit on their own card rather than inline with the text.
 */
export const WORDMARK: Record<string, string> = {
  niki: "/logos/systems/niki.svg",
  backstop: "/logos/systems/backstop.svg",
};

/** The real mark for a system, rendered as a light/dark pair. Null when absent. */
export function SystemLogo({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const mark = REAL[slug];
  if (!mark) return null;
  return (
    <>
      <img
        src={mark.light}
        alt={slug}
        className={cn("dark:hidden", className)}
        loading="lazy"
        decoding="async"
      />
      <img
        src={mark.dark}
        alt=""
        aria-hidden
        className={cn("hidden dark:block", className)}
        loading="lazy"
        decoding="async"
      />
    </>
  );
}

/**
 * iOS-style app icon: superellipse container, inset hairline, top highlight,
 * glyph in the accent. Geometry is borrowed from the platform, colour stays
 * monochrome so a grid of six does not fracture the single-accent palette.
 */
export function AppIcon({
  slug,
  className,
  size = "md",
}: {
  slug: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const box = { sm: "size-10", md: "size-14", lg: "size-16" }[size];
  const glyph = { sm: "size-5", md: "size-7", lg: "size-8" }[size];
  const inner = { sm: "size-6", md: "size-9", lg: "size-11" }[size];
  const real = hasRealMark(slug);
  return (
    <span
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-[22.5%] text-chroma",
        "border border-border bg-card shadow-[0_1px_2px_rgb(0_0_0/0.14),inset_0_1px_0_rgb(255_255_255/0.09)]",
        box,
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgb(255_255_255/0.09),transparent_58%)]"
      />
      {real ? (
        <SystemLogo slug={slug} className={cn("relative", inner)} />
      ) : (
        <ProjectMark slug={slug} className={cn("relative", glyph)} />
      )}
    </span>
  );
}
