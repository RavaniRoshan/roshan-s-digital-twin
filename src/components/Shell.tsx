import { useEffect, useState, type ReactNode } from "react";
import { ControlPanel } from "@/components/ControlPanel";
import { Noise } from "@/components/Noise";
import { Ticker, type TickerItem } from "@/components/Ticker";
import { site } from "@/content/site";

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
    <header className="flex items-end justify-between py-6 sm:items-center">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <div className="poster shrink-0">
          <img
            src={site.identity.avatar}
            alt={site.identity.name}
            width={60}
            height={60}
            loading="lazy"
            decoding="async"
            className="block h-8 w-8 sm:h-[60px] sm:w-[60px]"
          />
        </div>
        <div>
          <p className="text-sm leading-tight font-semibold">{site.identity.name}</p>
          <p className="text-sm leading-tight o-2">{site.identity.role}</p>
        </div>
      </div>
      <div className="text-right text-sm lg:mr-[52px]">
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
