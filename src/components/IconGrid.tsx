import { AppIcon } from "@/components/ProjectIcon";
import { site } from "@/content/site";

/**
 * iOS-home-screen moment. Six app-icon tiles, each opening its case file.
 * Geometry is the platform's; colour stays monochrome so the grid reads as
 * one set rather than six competing brands.
 */
export function IconGrid({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <ul className="grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-4">
      {site.systems.map((s) => (
        <li key={s.slug}>
          <button
            type="button"
            onClick={() => onOpen(s.slug)}
            className="group flex w-full cursor-pointer flex-col items-center gap-2"
          >
            <span className="relative">
              <AppIcon slug={s.slug} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
              {s.status === "active" && (
                <span className="absolute -right-0.5 -bottom-0.5 size-2.5 animate-pulse-glow rounded-full border-2 border-background bg-chroma" />
              )}
            </span>
            <span className="max-w-full truncate text-xs o-2 transition-colors group-hover:o-1">
              {s.codename}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
