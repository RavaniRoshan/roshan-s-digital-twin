import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl">
      <nav className="rounded-2xl border border-foreground/10 bg-background/40 backdrop-blur-xl shadow-lg shadow-background/20">
        <div className="px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline text-foreground hover:text-primary transition-colors">
            <span className="text-xl">⚡</span>
            <span className="font-semibold text-lg">ravani roshan</span>
          </Link>
          <div className="flex items-center gap-1 text-sm">
            <Link
              to="/"
              className={`no-underline px-2 py-1 rounded transition-colors ${
                location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              home
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link
              to="/works"
              className={`no-underline px-2 py-1 rounded transition-colors ${
                location.pathname === "/works" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              works
            </Link>
            <span className="text-muted-foreground ml-2">·</span>
            <button
              onClick={toggleTheme}
              className="ml-2 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
