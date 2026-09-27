import { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Github, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/works", label: "systems" },
  { to: "/log", label: "log" },
  { to: "/resume", label: "resume" },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NavItems({ onNavigate, mobile = false }: { onNavigate?: () => void; mobile?: boolean }) {
  return (
    <>
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "font-mono text-sm transition-colors",
              mobile ? "py-2 text-lg" : "text-muted-foreground hover:text-foreground",
              isActive && "text-electric",
            )
          }
        >
          <span className="text-electric/60">~/</span>
          {link.label}
        </NavLink>
      ))}
    </>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ScrollToTop />
      <header className="fixed inset-x-0 top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="font-mono text-sm font-bold tracking-tight">
            rr<span className="text-electric">://</span>ravani
            <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse-glow bg-electric" />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <NavItems />
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="size-1.5 animate-pulse-glow rounded-full bg-electric" />
              open to build
            </span>
            <Button size="icon-sm" variant="ghost" render={<a href="https://github.com/RavaniRoshan" target="_blank" rel="noreferrer" aria-label="GitHub" />}>
              <Github />
            </Button>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger render={<Button size="icon-sm" variant="ghost" />}>
                <Menu aria-label="Open menu" />
              </SheetTrigger>
              <SheetPopup side="right">
                <SheetHeader>
                  <SheetTitle className="font-mono">navigate</SheetTitle>
                </SheetHeader>
                <SheetPanel>
                  <nav className="flex flex-col gap-2 p-6 pt-0">
                    <SheetClose render={<NavLink to="/" className="py-2 font-mono text-lg" />}>
                      <span className="text-electric/60">~/</span>home
                    </SheetClose>
                    {LINKS.map((link) => (
                      <SheetClose key={link.to} render={<NavLink to={link.to} className="py-2 font-mono text-lg" />}>
                        <span className="text-electric/60">~/</span>
                        {link.label}
                      </SheetClose>
                    ))}
                  </nav>
                </SheetPanel>
              </SheetPopup>
            </Sheet>
          </div>
        </div>
      </header>
      <div className="flex-1 pt-16">{children}</div>
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            <span className="text-electric">$</span> ravani-roshan — {new Date().getFullYear()} · ahmedabad, in
          </p>
          <div className="flex flex-wrap gap-4">
            {site.profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="transition-colors hover:text-electric"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
