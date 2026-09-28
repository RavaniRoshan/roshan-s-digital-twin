import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { Block, Row, SectionLabel, StatusDot } from "@/components/Rows";
import { AppIcon } from "@/components/ProjectIcon";
import { WORDMARK } from "@/components/ProjectIcon";
import { Shell } from "@/components/Shell";
import type { TickerItem } from "@/components/Ticker";
import { site } from "@/content/site";
import { NotFound } from "./NotFound";

const TICKER: TickerItem[] = [
  { id: "case", label: "case file", meta: "detail", href: "#case" },
  { id: "approach", label: "approach", meta: "how", href: "#approach" },
  { id: "rack", label: "rack", meta: "all systems", href: "/#systems" },
];

export function SystemPage() {
  const { slug } = useParams();
  const system = site.systems.find((s) => s.slug === slug);
  if (!system) return <NotFound />;

  const others = site.systems.filter((s) => s.slug !== system.slug);
  const i = site.systems.indexOf(system);
  const prev = site.systems[(i - 1 + site.systems.length) % site.systems.length];
  const next = site.systems[(i + 1) % site.systems.length];
  const wordmark = WORDMARK[system.slug];

  return (
    <Shell ticker={TICKER}>
      <Block id="case">
        <Link
          to="/"
          className="mono inline-flex items-center gap-1.5 text-xs o-3 transition-colors hover:o-1"
        >
          <ArrowLeft className="size-3.5" /> rack
        </Link>

        <div className="mt-6 flex items-start gap-4">
          <AppIcon slug={system.slug} size="lg" />
          <div className="min-w-0">
            <h1 className="text-xl font-semibold tracking-tight">{system.codename}</h1>
            <p className="mono text-xs o-3">{system.tagline}</p>
          </div>
        </div>

        {wordmark && (
          // The real lockup from the repo. niki and backstop only ever shipped a
          // wide wordmark, so it is used here at full column width rather than
          // being shrunk into an unreadable square tile.
          <div className="mt-5 flex justify-center rounded-md border bg-card p-5">
            <img
              src={wordmark}
              alt={`${system.codename} wordmark`}
              className="max-h-14 w-auto"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-y py-2.5 text-xs">
          <span className="flex items-center gap-1.5">
            <StatusDot status={system.status} />
            {system.status}
          </span>
          <span className="o-3">{system.role}</span>
          <span className="o-3">{system.language}</span>
          <span className="o-3">{system.runtime}</span>
          {system.license && <span className="o-3">{system.license}</span>}
        </div>

        <p className="mt-5 text-sm leading-relaxed">{system.summary}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {system.topics.map((t) => (
            <span key={t} className="mono rounded border px-2 py-0.5 text-[0.625rem] o-3">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={system.href}
            target="_blank"
            rel="noreferrer"
            className="glass flex items-center gap-2 rounded px-3 py-2 text-sm transition-colors hover:border-chroma/50"
          >
            <Github className="size-3.5" /> repository
          </a>
          {system.homepage && (
            <a
              href={system.homepage}
              target="_blank"
              rel="noreferrer"
              className="glass flex items-center gap-2 rounded px-3 py-2 text-sm transition-colors hover:border-chroma/50"
            >
              live <ArrowUpRight className="size-3.5" />
            </a>
          )}
        </div>
      </Block>

      <Block id="problem">
        <SectionLabel>the problem</SectionLabel>
        <p className="text-sm leading-relaxed o-2">{system.problem}</p>
      </Block>

      <Block id="approach">
        <SectionLabel>the approach</SectionLabel>
        <ul className="space-y-2.5">
          {system.approach.map((a) => (
            <li key={a} className="flex gap-3 text-sm leading-relaxed o-2">
              <span className="text-chroma">→</span>
              {a}
            </li>
          ))}
        </ul>
        <h3 className="mono mt-6 mb-2 text-xs tracking-[0.14em] o-3 uppercase">capabilities</h3>
        <ul className="space-y-2.5">
          {system.capabilities.map((c) => (
            <li key={c} className="flex gap-3 text-sm leading-relaxed o-2">
              <span className="text-chroma">→</span>
              {c}
            </li>
          ))}
        </ul>
      </Block>

      <Block id="rack">
        <SectionLabel>rest of the rack</SectionLabel>
        <div className="border-t">
          {others.map((s) => (
            <Row
              key={s.slug}
              label={s.codename}
              badge={s.status}
              value={s.language}
              href={`/s/${s.slug}`}
            />
          ))}
        </div>
        <nav className="mt-8 flex items-center justify-between gap-4 border-t pt-4">
          <Link to={`/s/${prev.slug}`} className="mono text-xs o-2 transition-colors hover:o-1">
            <ArrowLeft className="mr-1 inline size-3.5" />
            {prev.codename}
          </Link>
          <Link to={`/s/${next.slug}`} className="mono text-xs o-2 transition-colors hover:o-1">
            {next.codename}
            <ArrowUpRight className="ml-1 inline size-3.5" />
          </Link>
        </nav>
      </Block>
    </Shell>
  );
}
