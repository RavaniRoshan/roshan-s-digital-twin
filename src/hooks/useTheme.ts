import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored) return stored;
      return "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback((e?: { clientX: number; clientY: number }) => {
    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? window.innerHeight / 2;
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");

    if (!document.startViewTransition) {
      if (isDark) root.classList.remove("dark");
      else root.classList.add("dark");
      setTheme(isDark ? "light" : "dark");
      return;
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      if (isDark) root.classList.remove("dark");
      else root.classList.add("dark");
    });

    setTheme(isDark ? "light" : "dark");

    transition.ready.then(() => {
      // Animate new root expanding from point
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
      // Animate old root shrinking to point
      document.documentElement.animate(
        {
          clipPath: [
            `circle(${endRadius}px at ${x}px ${y}px)`,
            `circle(0px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          pseudoElement: "::view-transition-old(root)",
        },
      );
    });
  }, []);

  return { theme, toggleTheme };
};
