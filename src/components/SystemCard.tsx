import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Star } from "lucide-react";
import { Pip } from "@/components/Reveal";
import { site, type System } from "@/content/site";
import { cn } from "@/lib/utils";

export function SystemCard({ system, compact = false }: { system: System; compact?: boolean }) {
  return (
    <Link
      to={`/systems/${system.slug}`}
      className={cn(
        "panel group flex flex-col gap-3 p-4 transition-colors hover:border-electric/50",
        compact && "p-3",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Pip tone={system.status} />
          <span className="truncate font-mono text-sm font-semibold">{system.codename}</span>
        </div>
        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric" />
      </div>

      <p className="font-mono text-[0.6875rem] tracking-wider text-electric/80 uppercase">{system.role}</p>

      {!compact && <p className="text-sm leading-relaxed text-muted-foreground">{system.summary}</p>}

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 font-mono text-[0.625rem] text-muted-foreground">
        <span className="uppercase">{system.language}</span>
        <span className="text-muted-foreground/40">/</span>
        <span className="uppercase">{system.status}</span>
        <span className="ml-auto flex items-center gap-1">
          <Star className="size-3" />
          {system.stars}
        </span>
      </div>
    </Link>
  );
}

export function SystemFlagship({ system }: { system: System }) {
  return (
    <div className="panel-flush overflow-hidden">
      <div className="grid gap-0 md:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-4 p-5 sm:p-7">
          <div className="flex items-center gap-2">
            <Pip tone={system.status} />
            <span className="label text-electric">flagship · {system.role}</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{system.codename}</h3>
            <p className="mt-1 font-mono text-sm text-electric/80">{system.tagline}</p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{system.summary}</p>
          <ul className="space-y-2">
            {system.capabilities.map((c) => (
              <li key={c} className="flex gap-2.5 text-sm text-muted-foreground">
                <span className="text-electric">▸</span>
                {c}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={system.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-3 py-1.5 font-mono text-xs transition-colors hover:border-electric/50 hover:text-electric"
            >
              <Github className="size-3.5" /> repository
            </a>
            {system.homepage && (
              <a
                href={system.homepage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-xs transition-colors hover:border-electric/50 hover:text-electric"
              >
                live <ArrowUpRight className="size-3.5" />
              </a>
            )}
            <Link
              to={`/systems/${system.slug}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-xs transition-colors hover:border-electric/50 hover:text-electric"
            >
              case file <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-px border-t bg-border md:grid-cols-1 md:border-t-0 md:border-l">
          <Readout label="language" value={system.language} />
          <Readout label="runtime" value={system.runtime} />
          <Readout label="license" value={system.license ?? "unspecified"} />
          <Readout label="status" value={system.status} />
        </dl>
      </div>
    </div>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-4">
      <dt className="label">{label}</dt>
      <dd className="readout mt-1.5 text-sm text-foreground">{value}</dd>
    </div>
  );
}

export const flagship = site.systems[0];
