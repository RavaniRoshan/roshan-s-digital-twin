import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, SquareTerminal, Sun, Menu } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { siteContent } from "@/content/siteContent";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { resumeHref } = siteContent.profile;
  const isMobile = useIsMobile();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const NavLinks = ({ onClick, className }: { onClick?: () => void; className?: string }) => (
    <>
      <Link
        to="/"
        onClick={onClick}
        className={cn(
          "rounded px-3 py-2 no-underline transition-colors",
          className,
          location.pathname === "/" ? "text-primary" : "text-foreground/70 hover:text-foreground"
        )}
      >
        home
      </Link>
      <Link
        to="/works"
        onClick={onClick}
        className={cn(
          "rounded px-3 py-2 no-underline transition-colors",
          className,
          location.pathname === "/works" ? "text-primary" : "text-foreground/70 hover:text-foreground"
        )}
      >
        works
      </Link>
      <Link
        to="/news"
        onClick={onClick}
        className={cn(
          "rounded px-3 py-2 no-underline transition-colors",
          className,
          location.pathname.startsWith("/news") ? "text-primary" : "text-foreground/70 hover:text-foreground"
        )}
      >
        news
      </Link>
      <Link
        to="/resume"
        onClick={onClick}
        className={cn("rounded px-3 py-2 text-foreground/70 no-underline transition-colors hover:text-foreground", className)}
      >
        resume
      </Link>
      <button
        onClick={(e) => {
          toggleTheme({ clientX: e.clientX, clientY: e.clientY });
          onClick?.();
        }}
        className={cn("rounded-lg p-2 text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground", className)}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </>
  );

  // Mobile: Sheet drawer
  if (isMobile) {
    return (
      <div className="fixed top-3 left-3 right-3 z-50">
        <nav className="rounded-xl border border-border bg-background/90 backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-2.5">
            <Link to="/" className="flex items-center gap-2 text-foreground no-underline">
              <SquareTerminal className="h-5 w-5" />
              <span className="text-sm font-semibold">roshan ravani</span>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <button
                  ref={menuButtonRef}
                  className="rounded-lg p-2 text-foreground/70 transition-colors hover:bg-foreground/5"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] max-w-sm p-0">
                <div className="flex h-full flex-col p-6">
                  <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
                    <Link to="/" className="flex items-center gap-2 text-foreground">
                      <SquareTerminal className="h-5 w-5" />
                      <span className="text-lg font-semibold">roshan ravani</span>
                    </Link>
                  </div>
                  <nav className="flex flex-1 flex-col gap-2">
                    {[
                      { to: "/", label: "home" },
                      { to: "/works", label: "works" },
                      { to: "/news", label: "news" },
                    ].map((item) => (
                      <SheetClose key={item.to} asChild>
                        <Link
                          to={item.to}
                          className={cn(
                            "rounded px-3 py-3 text-sm no-underline transition-colors",
                            location.pathname === item.to
                              ? "text-primary"
                              : "text-foreground/70 hover:text-foreground"
                          )}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                     <SheetClose asChild>
                       <Link
                         to="/resume"
                         className="rounded px-3 py-3 text-sm text-foreground/70 no-underline transition-colors hover:text-foreground"
                       >
                         resume
                       </Link>
                     </SheetClose>
                    <SheetClose asChild>
                      <button
                        onClick={() => {
                          // Use hamburger button position for transition origin
                          const rect = menuButtonRef.current?.getBoundingClientRect();
                          const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
                          const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
                          toggleTheme({ clientX: x, clientY: y });
                        }}
                        className="rounded-lg px-3 py-3 text-sm text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
                        aria-label="Toggle theme"
                      >
                        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      </button>
                    </SheetClose>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    );
  }

  // Desktop: full nav
  return (
    <div className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2">
      <nav className="rounded-full border border-border bg-background/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2 text-foreground no-underline transition-colors hover:text-primary">
            <SquareTerminal className="h-5 w-5" />
            <span className="text-lg font-semibold">roshan ravani</span>
          </Link>

          <div className="flex items-center gap-2 text-sm">
            <NavLinks className="!py-2" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
