import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ControlPanel } from "@/components/ControlPanel";
import { Noise } from "@/components/Noise";
import { Ticker, type TickerItem } from "@/components/Ticker";
import { site } from "@/content/site";

const ROLES = [
  "AI systems builder",
  "agent reliability",
  "sandbox + policy",
  "developer infrastructure",
];

/**
 * Fixed-width vertical swap. Replaces SpaceUI's MorphingText, which animates
 * character-by-character — at 640px that read as a scramble and the label never
 * had room for its longest string. This holds a constant min-width so the
 * layout never reflows, and only ever two words are in flight.
 */
function RoleLine() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % ROLES.length), 3000);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative block h-5 min-w-[19ch] overflow-hidden text-left">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={ROLES[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm leading-tight o-2"
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function useIstClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () =>
      setT(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: site.identity.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function Header() {
  const clock = useIstClock();
  return (
    <header className="flex items-end justify-between gap-6 py-6 sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-3.5">
        <div className="poster shrink-0">
          <img
            src={site.identity.avatar}
            alt={site.identity.name}
            width={60}
            height={60}
            loading="lazy"
            decoding="async"
            className="block h-9 w-9 sm:h-[52px] sm:w-[52px]"
          />
        </div>
        <div className="min-w-0">
          <p className="serif text-lg leading-tight">{site.identity.name}</p>
          <RoleLine />
        </div>
      </div>
      <div className="shrink-0 text-right text-sm lg:mr-[52px]">
        <p className="leading-tight">{site.identity.location}</p>
        <p className="mono flex items-center justify-end gap-1.5 leading-tight o-2">
          <span className="size-1.5 animate-pulse-glow rounded-full bg-chroma" />
          {clock}
        </p>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-16 flex items-stretch justify-between border-t text-sm">
      <a
        href="#top"
        className="border-r px-4 py-4 font-semibold transition-opacity hover:o-2"
      >
        {new Date().getFullYear()}
      </a>
      <div className="flex">
        {site.identity.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="border-l px-4 py-4 transition-opacity hover:o-1"
          >
            <span className="o-2">{s.label}</span>
          </a>
        ))}
      </div>
    </footer>
  );
}

export function Shell({ children, ticker }: { children: ReactNode; ticker: TickerItem[] }) {
  return (
    <div id="top" className="min-h-screen">
      <Noise />
      <ControlPanel />
      <div className="column relative flex min-h-screen w-full max-w-[640px] flex-col">
        <div className="px-4">
          <Header />
        </div>
        <Ticker items={ticker} label="INDEX" />
        <div className="flex-1 px-4 pb-16">{children}</div>
        <div className="px-4">
          <Footer />
        </div>
      </div>
    </div>
  );
}
