import { ArrowUpRight, Printer } from "lucide-react";
import { Fade, Pip, Section, SectionHead } from "@/components/Reveal";
import { site } from "@/content/site";

const LEVEL_WIDTH = { core: "w-full", proficient: "w-3/4", working: "w-1/2" } as const;
const LEVEL_COLOR = {
  core: "bg-electric",
  proficient: "bg-info",
  working: "bg-muted-foreground/50",
} as const;

export function Resume() {
  return (
    <>
      <Section className="border-t-0 pt-12">
        <Fade className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <SectionHead label="operator" title="capability matrix" />
            <p className="text-sm leading-relaxed text-muted-foreground">{site.identity.summary}</p>
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-xs transition-colors hover:border-electric/50 hover:text-electric"
          >
            <Printer className="size-3.5" /> print
          </button>
        </Fade>

        <Fade delay={0.06}>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {site.skills.map((track) => (
              <div key={track.track} className="panel p-4">
                <p className="label text-electric">{track.track}</p>
                <ul className="mt-3 space-y-2.5">
                  {track.items.map((item) => (
                    <li key={item.name} className="flex items-center gap-3">
                      <span className="w-40 shrink-0 truncate font-mono text-xs text-foreground/85">
                        {item.name}
                      </span>
                      <span className="h-1 flex-1 overflow-hidden rounded-full bg-border">
                        <span
                          className={`block h-full ${LEVEL_WIDTH[item.level]} ${LEVEL_COLOR[item.level]}`}
                        />
                      </span>
                      <span className="w-16 shrink-0 text-right font-mono text-[0.5625rem] tracking-wider text-muted-foreground uppercase">
                        {item.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Fade>
      </Section>

      <Section>
        <Fade>
          <SectionHead label="background" title="education" />
        </Fade>
        <Fade delay={0.05}>
          {site.education.map((e) => (
            <div key={e.degree} className="panel flex flex-wrap items-baseline justify-between gap-3 p-4">
              <div>
                <p className="font-semibold">{e.degree}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{e.institution}</p>
              </div>
              <span className="label">{e.period}</span>
            </div>
          ))}
        </Fade>
      </Section>

      <Section>
        <Fade>
          <SectionHead label="verified" title="credentials" meta={`${site.credentials.length} badges`} />
        </Fade>
        <Fade delay={0.05}>
          <div className="overflow-hidden rounded-lg border">
            {site.credentials.map((c) => (
              <div
                key={c.title}
                className="flex flex-wrap items-center justify-between gap-3 border-b bg-card px-4 py-3 last:border-b-0"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Pip tone="nominal" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{c.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{c.issuer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="label">{c.issued}</span>
                  {c.href && (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Verify ${c.title}`}
                      className="text-electric transition-opacity hover:opacity-70"
                    >
                      <ArrowUpRight className="size-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Fade>
      </Section>

      <Section>
        <Fade>
          <div className="panel-flush flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="label text-electric">statement</p>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {site.identity.statement}
              </p>
            </div>
            <a
              href={`mailto:${site.identity.socials.at(-1)?.handle}@gmail.com`}
              className="shrink-0 rounded-md bg-primary px-4 py-2 text-center font-mono text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              get in touch
            </a>
          </div>
        </Fade>
      </Section>
    </>
  );
}
