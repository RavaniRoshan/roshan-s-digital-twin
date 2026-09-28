import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { LoadingOrb } from "@/components/orb/loading";
import { Block, Row, SectionLabel, SquareControl } from "@/components/Rows";
import { Shell } from "@/components/Shell";
import { IconGrid } from "@/components/IconGrid";
import { RackTable } from "@/components/RackTable";
import { BlurRevealText } from "@/components/spaceui/blur-reveal-text";
import { CopyButton } from "@/components/spaceui/copy";
import { SignalRow } from "@/components/Glyph";
import { Animoji } from "@/components/Animoji";
import { BudgetDemo } from "@/components/BudgetDemo";
import { Logo } from "@/components/Logo";
import { SpotifyDock } from "@/components/SpotifyDock";
import type { TickerItem } from "@/components/Ticker";
import { site, type Track } from "@/content/site";

const GitHubActivity = lazy(() =>
  import("@/components/spaceui/github-activity").then((m) => ({ default: m.GitHubActivity })),
);

const email = "ravaniroshansingh@gmail.com";

const TICKER: TickerItem[] = [
  { id: "about", label: "about", meta: "position", href: "#about" },
  { id: "systems", label: "rack", meta: `${site.systems.length} builds`, href: "#systems" },
  { id: "index", label: "index", meta: "sortable", href: "#index" },
  { id: "telemetry", label: "telemetry", meta: "live", href: "#telemetry" },
  { id: "credentials", label: "credentials", meta: `${site.credentials.length}`, href: "#credentials" },
];

/* Telemetry deck — horizontal snap carousel reusing the reference's card
   mechanics: fixed-width slides, border-right dividers, edge fade, square
   prev/next controls. Reads the live heatmap sideways instead of stacked. */
function Deck() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 2,
    });
  }, []);

  useEffect(() => {
    measure();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const nudge = (dir: 1 | -1) =>
    trackRef.current?.scrollBy({ left: dir * 400, behavior: "smooth" });

  const slide =
    "flex w-[calc(100vw-2rem)] shrink-0 snap-start flex-col justify-between border-r p-5 sm:w-[400px]";

  return (
    <div className="relative">
      <div className="relative">
        <div ref={trackRef} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto border-y">
          <div
            className="flex w-[calc(100vw-2rem)] shrink-0 snap-start flex-col justify-between border-r p-3 sm:w-full"
            style={{ minHeight: 260 }}
          >
            <div>
              <p className="mono mb-3 text-xs tracking-[0.14em] o-3 uppercase">commit activity</p>
              <Suspense
                fallback={
                  <div className="flex h-20 items-center justify-center">
                    <LoadingOrb size={32} className="text-chroma" />
                  </div>
                }
              >
                <div className="telemetry-calendar overflow-x-auto">
                  <GitHubActivity
                    user={site.identity.handle}
                    shape="rounded"
                    showHeader={false}
                    title=""
                    subtitle=""
                  />
                </div>
              </Suspense>
            </div>
            <p className="mono mt-5 text-xs o-3">github · live fetch, no key · full year</p>
          </div>

          <div className={slide} style={{ minHeight: 220 }}>
            <div>
              <p className="mono mb-3 text-xs tracking-[0.14em] o-3 uppercase">rack readout</p>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                {site.telemetry.map((t) => (
                  <div key={t.label}>
                    <dt className="text-xs o-3">{t.label}</dt>
                    <dd className="mono text-xl font-semibold">{t.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mono mt-5 text-xs o-3">core: rust · python · typescript</p>
          </div>

          <div className={slide} style={{ minHeight: 220 }}>
            <div>
              <p className="mono mb-3 text-xs tracking-[0.14em] o-3 uppercase">by language</p>
              <ul className="space-y-1.5">
                {site.systems.map((s) => (
                  <li key={s.slug} className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="o-2">{s.codename}</span>
                    <span className="mono text-xs o-3 uppercase">{s.language}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mono mt-5 text-xs o-3">
              {site.systems.length} systems · {new Set(site.systems.map((s) => s.language)).size} languages
            </p>
          </div>

          <div
            className="flex w-[calc(100vw-2rem)] shrink-0 snap-start flex-col justify-between p-5 sm:w-[400px]"
            style={{ minHeight: 220 }}
          >
            <div>
              <p className="mono mb-3 text-xs tracking-[0.14em] o-3 uppercase">recent signals</p>
              <ul className="space-y-2.5">
                {site.timeline.slice(0, 3).map((e) => (
                  <li key={e.id} className="text-sm leading-snug">
                    <span className="mono mr-2 text-[0.625rem] o-3">{e.date}</span>
                    <span className="o-2">{e.title}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mono mt-5 text-xs o-3">newest first</p>
          </div>
        </div>

        {!edge.end && (
          <div aria-hidden className="fade-r pointer-events-none absolute inset-y-0 right-0 w-12" />
        )}
      </div>

      <div className="flex">
        <SquareControl label="Previous" onClick={() => nudge(-1)} disabled={edge.start}>
          <ArrowLeft className="size-4 o-2" />
        </SquareControl>
        <SquareControl label="Next" onClick={() => nudge(1)} disabled={edge.end}>
          <ArrowRight className="size-4 o-2" />
        </SquareControl>
      </div>
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();
  const open = useCallback((slug: string) => navigate(`/s/${slug}`), [navigate]);
  const [playing, setPlaying] = useState<Track | null>(null);

  return (
    <Shell ticker={TICKER}>
      <Block id="about">
        <SectionLabel n={1}>position</SectionLabel>
        <p className="mono mb-3 text-sm o-2">
          <Animoji>hey 👋 — i build the unglamorous half of agent infrastructure</Animoji>
        </p>
        <div className="space-y-4 text-sm leading-relaxed">
          <BlurRevealText
            text={site.identity.summary}
            splitBy="words"
            stagger={0.018}
            blurAmount="6px"
            delay={0.05}
            yOffset={5}
          />
          {site.identity.bio.map((p) => (
            <p key={p.slice(0, 24)} className="o-2">
              {p}
            </p>
          ))}
          <p className="border-l pl-4 italic o-2">{site.identity.statement}</p>
        </div>
        <SignalRow
          className="pt-1"
          items={[
            { glyph: "build", label: "hermetic" },
            { glyph: "receipt", label: "auditable" },
            { glyph: "shield", label: "contained" },
            { glyph: "chart", label: "observable" },
          ]}
        />
      </Block>

      <Block id="systems">
        <SectionLabel n={2}>rack</SectionLabel>
        <IconGrid onOpen={open} />
        <div className="mt-6 border-t">
          {site.systems.map((s) => (
            <Row
              key={s.slug}
              label={s.codename}
              badge={s.status}
              value={s.language}
              onSelect={() => open(s.slug)}
            />
          ))}
        </div>
        <p className="mt-3 text-xs o-3">tap an icon or a row to open its case file</p>
      </Block>

      <Block id="index">
        <SectionLabel n={3}>rack index</SectionLabel>
        <RackTable onOpen={open} />
        <p className="mt-3 text-xs o-3">sortable · click any row for the case file</p>
      </Block>

      <Block id="telemetry">
        <SectionLabel n={4}>telemetry</SectionLabel>
        <Deck />
      </Block>

      <Block id="capabilities">
        <SectionLabel n={5}>capabilities</SectionLabel>
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          {site.skills.map((track) => (
            <div key={track.track}>
              <p className="mono mb-2.5 o-3">{track.track}</p>
              <ul>
                {track.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-2.5 border-b py-1.5"
                    style={{
                      opacity:
                        item.level === "core" ? 1 : item.level === "proficient" ? 0.72 : 0.5,
                    }}
                  >
                    {item.logo ? (
                      <Logo id={item.logo} title={item.name} />
                    ) : (
                      <span className="size-4 shrink-0" aria-hidden />
                    )}
                    <span className="flex-1 truncate text-sm">{item.name}</span>
                    <span className="mono o-3">{item.level.slice(0, 4)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Block>

      <Block id="signals">
        <SectionLabel n={6}>signals</SectionLabel>
        <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {site.achievements.map((a) => (
            <div key={a.id} className="flex items-baseline gap-3 border-b pb-2">
              <span className="mono text-xs text-chroma tabular-nums">
                {a.count}&times;
              </span>
              <span className="flex-1 truncate text-sm">{a.label}</span>
              <span className="mono shrink-0 text-[0.625rem] o-3">{a.detail}</span>
            </div>
          ))}
        </div>
        <p className="mono mt-3 text-xs o-3">
          public GitHub achievements &middot; github.com/RavaniRoshan
        </p>
      </Block>

      <Block id="lab">
        <SectionLabel n={7}>try it</SectionLabel>
        <p className="mb-3 text-sm leading-relaxed o-2">
          This is <code className="mono">backstop</code>&rsquo;s decision logic, running in your browser
          rather than described in a screenshot. Raise the failure rate and the breaker trips on four
          consecutive failures; drop the budget and it trips on spend instead. Nothing here is a
          recording.
        </p>
        <BudgetDemo />
      </Block>

      <Block id="notes">
        <SectionLabel n={8}>notes</SectionLabel>
        <div className="border-t">
          {site.notes.map((n) => (
            <article key={n.id} className="border-b py-3 last:border-b-0">
              <div className="mb-1.5 flex items-baseline gap-3">
                <time className="mono shrink-0 text-[0.625rem] o-3">{n.date}</time>
                {n.href ? (
                  <a
                    href={n.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-sm font-semibold underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
                  >
                    {n.title}
                  </a>
                ) : (
                  <h3 className="flex-1 text-sm font-semibold">{n.title}</h3>
                )}
              </div>
              <p className="text-sm leading-relaxed o-2">{n.body}</p>
            </article>
          ))}
        </div>
      </Block>

      <Block id="works">
        <SectionLabel n={9}>also shipping</SectionLabel>
        <div className="border-t">
          {site.activeRepos.map((r) => (
            <Row
              key={r.slug}
              label={r.slug}
              badge={r.language}
              value={r.license ?? "repo"}
              href={r.href}
            />
          ))}
        </div>
        <p className="mono mt-3 text-xs o-3">
          real repositories, linked to source — descriptions are GitHub&rsquo;s own
        </p>
      </Block>

      {site.music.length > 0 && (
        <Block id="music">
          <SectionLabel n={10}>rotation</SectionLabel>
          <div className="border-t">
            {site.music.map((t) => (
              <Row
                key={t.url}
                label={t.title}
                badge={t.artist}
                value="play"
                onSelect={() => setPlaying(t)}
                lead={
                  <img
                    src={t.art}
                    alt=""
                    aria-hidden
                    width={28}
                    height={28}
                    loading="lazy"
                    decoding="async"
                    className="size-7 shrink-0 rounded-[4px] object-cover"
                  />
                }
              />
            ))}
          </div>
          <p className="mono mt-3 text-xs o-3">five that got me through the build</p>
        </Block>
      )}
      <Block id="credentials">
        <SectionLabel n={11}>credentials</SectionLabel>
        <div className="border-t">
          {site.credentials.map((c) => (
            <Row
              key={c.title}
              label={c.title}
              badge={c.issuer}
              value={c.href ? "verify ↗" : c.issued}
              href={c.href}
              muted={!c.href}
            />
          ))}
        </div>
      </Block>

      <Block id="contact">
        <SectionLabel n={12}>contact</SectionLabel>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={`mailto:${email}`}
            className="flat flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:border-chroma/50"
          >
            <Mail className="size-3.5" /> email
          </a>
          <CopyButton
            content={email}
            size="sm"
            variant="outline"
            className="rounded-[3px]"
            aria-label="Copy email address"
          />
          {site.identity.socials
            .filter((s) => s.href.startsWith("http"))
            .map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flat px-3 py-2 text-sm transition-colors hover:border-chroma/50"
              >
                {s.label}
              </a>
            ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed o-2">
          Sandboxing, budgets, policy enforcement, or local inference — I am interested in the hard
          versions.
        </p>
      </Block>

      <Block id="colophon">
        <SectionLabel n={13}>colophon</SectionLabel>
        <dl className="space-y-2 text-sm">
          {[
            ["built with", "react 19 · vite · tailwind v4 · spaceui · motion"],
            ["type", "instrument sans · instrument serif · ibm plex mono"],
            ["gutters", "spaceui proximity grid, cursor-reactive, deferred to idle"],
            ["tracking", "none. no analytics, no cookies, no third-party scripts"],
            ["source", "public — github.com/RavaniRoshan/roshan-s-digital-twin"],
            ["machine", "llms.txt and llms-full.txt generated at build time"],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-4 border-b pb-2">
              <dt className="mono w-24 shrink-0 text-xs o-3">{k}</dt>
              <dd className="mono min-w-0 flex-1 text-xs break-words">{v}</dd>
            </div>
          ))}
        </dl>
      </Block>
      <SpotifyDock track={playing} onClose={() => setPlaying(null)} />
    </Shell>
  );
}
