import { Suspense, lazy, useEffect, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { LoadingOrb } from "@/components/orb/loading";
import { Fade, Pip, Section, SectionHead } from "@/components/Reveal";
import { SystemCard, SystemFlagship, flagship } from "@/components/SystemCard";
import { site } from "@/content/site";

function Uptime() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const started = Date.now();
    const id = setInterval(() => setSeconds(Math.floor((Date.now() - started) / 1000)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return <span className="readout">{`${h}:${m}:${s}`}</span>;
}

const GitHubActivity = lazy(() =>
  import("@/components/spaceui/github-activity").then((m) => ({ default: m.GitHubActivity })),
);

function Heatmap() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="panel-flush p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Pip tone="nominal" />
          <span className="label text-foreground/80">commit telemetry · 52 weeks</span>
        </div>
        <span className="label">live · no key</span>
      </div>
      {mounted ? (
        <Suspense
          fallback={
            <div className="flex h-24 items-center justify-center">
              <LoadingOrb size={40} className="text-electric" />
            </div>
          }
        >
          <div className="overflow-x-auto pb-1">
            <GitHubActivity
              user={site.identity.handle}
              shape="rounded"
              showHeader={false}
              title=""
              subtitle=""
            />
          </div>
        </Suspense>
      ) : (
        <div className="flex h-24 items-center justify-center">
          <LoadingOrb size={40} className="text-electric" />
        </div>
      )}
    </div>
  );
}

export function Dashboard() {
  const supporting = site.systems.filter((s) => s.slug !== flagship.slug);

  return (
    <>
      {/* Status header */}
      <section className="relative overflow-hidden px-5 pt-12 pb-10 sm:px-8 sm:pt-16">
        <div aria-hidden className="grid-field pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_20%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-5xl">
          <Fade>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="readout flex items-center gap-2 text-xs text-muted-foreground">
                <Pip tone="active" />
                {site.identity.shell}
              </span>
              <span className="h-3 w-px bg-border" />
              <span className="label">uptime {site.identity.location}</span>
              <span className="h-3 w-px bg-border" />
              <span className="label">
                session <Uptime />
              </span>
            </div>
          </Fade>

          <Fade delay={0.06}>
            <h1 className="mt-6 max-w-3xl text-3xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-5xl">
              I build agent systems that stay{" "}
              <span className="text-electric">containment-aware</span> and{" "}
              <span className="text-electric">budget-bound</span>.
            </h1>
          </Fade>

          <Fade delay={0.12}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {site.identity.summary}
            </p>
          </Fade>

          <Fade delay={0.18}>
            <p className="mt-4 max-w-xl border-l-2 border-electric/50 pl-4 font-mono text-xs leading-relaxed text-foreground/70">
              {site.identity.statement}
            </p>
          </Fade>

          <Fade delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-2">
              <Link
                to="/systems"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-mono text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                inspect systems <ArrowRight className="size-4" />
              </Link>
              <a
                href={`mailto:${site.identity.socials.at(-1)?.handle}@gmail.com`}
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 font-mono text-sm transition-colors hover:border-electric/50 hover:text-electric"
              >
                <Mail className="size-4" /> establish contact
              </a>
            </div>
          </Fade>
        </div>
      </section>

      {/* Telemetry KPI row */}
      <Section>
        <Fade>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border lg:grid-cols-4">
            {site.telemetry.map((t) => (
              <div key={t.label} className="bg-card p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="label">{t.label}</span>
                  <Pip tone={t.status} />
                </div>
                <p className="readout mt-2 text-2xl font-bold sm:text-3xl">{t.value}</p>
                {t.delta && <p className="mt-1 font-mono text-[0.625rem] text-muted-foreground">{t.delta}</p>}
              </div>
            ))}
          </div>
        </Fade>
      </Section>

      {/* Commit heatmap */}
      <Section>
        <Fade>
          <SectionHead label="telemetry" title="commit activity" meta="github · live" />
        </Fade>
        <Fade delay={0.06}>
          <Heatmap />
        </Fade>
      </Section>

      {/* Flagship */}
      <Section>
        <Fade>
          <SectionHead label="primary" title="flagship system" meta={flagship.status} />
        </Fade>
        <Fade delay={0.06}>
          <SystemFlagship system={flagship} />
        </Fade>
      </Section>

      {/* Supporting systems */}
      <Section>
        <Fade className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="label text-electric">supporting</span>
              <span className="h-px flex-1 accent-rule opacity-50" />
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">the rest of the rack</h2>
          </div>
          <Link
            to="/systems"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-electric"
          >
            all systems <ArrowRight className="size-3.5" />
          </Link>
        </Fade>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {supporting.map((sys, i) => (
            <Fade key={sys.slug} delay={Math.min(i * 0.05, 0.25)}>
              <SystemCard system={sys} />
            </Fade>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section>
        <Fade>
          <div className="panel-flush flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="max-w-md">
              <div className="flex items-center gap-3">
                <span className="label text-electric">open channel</span>
                <span className="h-px flex-1 accent-rule opacity-50" />
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">building agent infrastructure?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Sandboxing, budgets, policy enforcement, or local inference — I am interested in the hard versions.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              {site.identity.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="rounded-md border border-border px-3 py-2 font-mono text-xs transition-colors hover:border-electric/50 hover:text-electric"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </Fade>
      </Section>
    </>
  );
}
