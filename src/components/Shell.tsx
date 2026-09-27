import { Suspense, lazy, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetHeader, SheetPanel, SheetPopup, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_ITEMS, type NavItem } from "@/components/nav-items";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const CommandBar = lazy(() =>
  import("@/components/CommandBar").then((m) => ({ default: m.CommandBar })),
);


function useIstClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleTimeString("en-GB", {
    timeZone: site.identity.timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function RailLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  return (
    <NavLink
      to={item.to}
      end={item.to === "/"}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "group relative flex items-center gap-3 border-l-2 py-2.5 pl-4 transition-colors",
          isActive
            ? "border-electric text-foreground"
            : "border-transparent text-muted-foreground hover:text-foreground",
        )
      }
    >
      {({ isActive }) => (
        <>
          <span className={cn("readout text-[0.625rem]", isActive ? "text-electric" : "text-muted-foreground/60")}>
            {item.index}
          </span>
          <span className="font-mono text-sm">{item.label}</span>
          <span className="ml-auto text-[0.625rem] tracking-wider text-muted-foreground/50 uppercase group-hover:text-muted-foreground">
            {item.hint}
          </span>
        </>
      )}
    </NavLink>
  );
}

function Identity() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-md border border-electric/40 bg-electric/10 font-mono text-sm font-bold text-electric">
        {site.identity.monogram}
      </span>
      <span className="min-w-0">
        <span className="block truncate font-mono text-sm font-semibold">{site.identity.name}</span>
        <span className="block truncate text-[0.625rem] tracking-wider text-muted-foreground uppercase">
          {site.identity.role}
        </span>
      </span>
    </Link>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const clock = useIstClock();
  const [paletteReady, setPaletteReady] = useState(false);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => setTimeout(cb, 400));
    const id = idle(() => setPaletteReady(true));
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
    };
  }, []);

  const openPalette = () =>
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
      {paletteReady && (
        <Suspense fallback={null}>
          <CommandBar />
        </Suspense>
      )}

      {/* Fixed left rail — desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r bg-background lg:flex">
        <div className="px-5 py-6">
          <Identity />
        </div>
        <div className="h-px accent-rule opacity-40" />
        <nav className="flex flex-1 flex-col gap-0.5 px-0 py-6">
          {NAV_ITEMS.map((item) => (
            <RailLink key={item.to} item={item} />
          ))}
        </nav>
        <div className="border-t px-5 py-4">
          <p className="flex items-center gap-2 font-mono text-[0.625rem] text-muted-foreground">
            <span className="size-1.5 animate-pulse-glow rounded-full bg-electric" />
            {site.identity.location}
          </p>
          <p className="readout mt-1.5 text-xs text-foreground/80">{clock} IST</p>
          <p className="mt-3 flex items-center gap-1.5 text-[0.625rem] text-muted-foreground">
            <Search className="size-3" />
            press
            <kbd className="rounded border px-1 font-mono">⌘K</kbd>
            to search
          </p>
        </div>
      </aside>

      {/* Top bar — mobile / tablet */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background/90 px-4 backdrop-blur-md lg:hidden">
        <Identity />
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" onClick={openPalette} aria-label="Search">
            <Search />
          </Button>
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon-sm" />}>
              <Menu aria-label="Open navigation" />
            </SheetTrigger>
            <SheetPopup side="right">
              <SheetHeader>
                <SheetTitle className="font-mono">navigate</SheetTitle>
              </SheetHeader>
              <SheetPanel>
                <nav className="flex flex-col py-2">
                  {NAV_ITEMS.map((item) => (
                    <RailLink key={item.to} item={item} />
                  ))}
                </nav>
              </SheetPanel>
            </SheetPopup>
          </Sheet>
        </div>
      </header>

      <main className="lg:pl-60">{children}</main>
    </div>
  );
}
