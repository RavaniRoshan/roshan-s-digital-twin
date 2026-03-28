import { Link, useLocation } from "react-router-dom";
import { Moon, SquareTerminal, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { siteContent } from "@/content/siteContent";

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { resumeHref } = siteContent.profile;

  return (
    <div className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2">
      <nav className="rounded-2xl border border-foreground/10 bg-background/40 backdrop-blur-xl shadow-lg shadow-background/20">
        <div className="flex items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2 text-foreground no-underline transition-colors hover:text-primary">
            <SquareTerminal className="h-5 w-5" />
            <span className="text-lg font-semibold">roshan ravani</span>
          </Link>

          <div className="flex items-center gap-1 text-sm">
            <Link
              to="/"
              className={`rounded px-2 py-1 no-underline transition-colors ${
                location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              to="/works"
              className={`rounded px-2 py-1 no-underline transition-colors ${
                location.pathname === "/works" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              works
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              to="/news"
              className={`rounded px-2 py-1 no-underline transition-colors ${
                location.pathname.startsWith("/news") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              news
            </Link>
            <span className="text-muted-foreground">/</span>
            <a
              href={resumeHref}
              download
              className="rounded px-2 py-1 text-muted-foreground no-underline transition-colors hover:text-foreground"
            >
              resume
            </a>
            <span className="ml-2 text-muted-foreground">/</span>
            <button
              onClick={toggleTheme}
              className="ml-2 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
