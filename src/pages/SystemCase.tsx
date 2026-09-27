import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Star } from "lucide-react";
import { Fade, Pip, Section } from "@/components/Reveal";
import { site } from "@/content/site";
import { NotFound } from "./NotFound";

export function SystemCase() {
  const { slug } = useParams();
  const index = site.systems.findIndex((s) => s.slug === slug);
  if (index === -1) return <NotFound />;
  const system = site.systems[index];
  const prev = site.systems[(index - 1 + site.systems.length) % site.systems.length];
  const next = site.systems[(index + 1) % site.systems.length];

  return (
    <Section className="border-t-0 pt-12">
      <Fade>
        <Link
          to="/systems"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-electric"
        >
          <ArrowLeft className="size-3.5" /> all systems
        </Link>
      </Fade>

      <Fade delay={0.05}>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="label text-electric">case file</span>
          <span className="h-3 w-px bg-border" />
          <span className="label flex items-center gap-1.5">
            <Pip tone={system.status} /> {system.status}
          </span>
        </div>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">{system.codename}</h1>
        <p className="mt-2 font-mono text-sm text-electric/80">{system.tagline}</p>
      </Fade>

      <Fade delay={0.1}>
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-4">
          {[
            { k: "role", v: system.role },
            { k: "language", v: system.language },
            { k: "runtime", v: system.runtime },
            { k: "license", v: system.license ?? "unspecified" },
          ].map((row) => (
            <div key={row.k} className="bg-card p-3.5">
              <dt className="label">{row.k}</dt>
              <dd className="readout mt-1.5 text-sm">{row.v}</dd>
            </div>
          ))}
        </dl>
      </Fade>

      <Fade delay={0.14}>
        <div className="mt-10 grid gap-8 md:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="label mb-3 text-electric">the problem</h2>
            <p className="text-base leading-relaxed text-foreground/90">{system.problem}</p>

            <h2 className="label mt-8 mb-3 text-electric">the approach</h2>
            <ul className="space-y-3">
              {system.approach.map((a) => (
                <li key={a} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="text-electric">▸</span>
                  {a}
                </li>
              ))}
            </ul>

            <h2 className="label mt-8 mb-3 text-electric">capabilities</h2>
            <ul className="space-y-3">
              {system.capabilities.map((c) => (
                <li key={c} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="text-electric">▸</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-3">
            <div className="panel p-4">
              <p className="label">topics</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {system.topics.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-border px-2 py-0.5 font-mono text-[0.625rem] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="panel p-4">
              <p className="label">signal</p>
              <p className="readout mt-2 flex items-center gap-1.5 text-2xl font-bold">
                <Star className="size-4 text-electric" />
                {system.stars}
              </p>
              <p className="mt-1 text-[0.625rem] text-muted-foreground">github stars</p>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={system.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 font-mono text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Github className="size-3.5" /> repository
              </a>
              {system.homepage && (
                <a
                  href={system.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-xs transition-colors hover:border-electric/50 hover:text-electric"
                >
                  live deployment <ArrowUpRight className="size-3.5" />
                </a>
              )}
            </div>
          </aside>
        </div>
      </Fade>

      <Fade delay={0.18}>
        <nav className="mt-12 flex items-center justify-between gap-4 border-t pt-6">
          <Link
            to={`/systems/${prev.slug}`}
            className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-electric"
          >
            <ArrowLeft className="size-3.5" /> {prev.codename}
          </Link>
          <Link
            to={`/systems/${next.slug}`}
            className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-electric"
          >
            {next.codename} <ArrowRight className="size-3.5" />
          </Link>
        </nav>
      </Fade>
    </Section>
  );
}
