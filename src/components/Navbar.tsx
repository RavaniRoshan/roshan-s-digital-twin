import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
