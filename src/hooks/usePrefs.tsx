import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "dark" | "light";
export type ColumnAlign = "left" | "center" | "right";

const ALIGN: Record<ColumnAlign, { ml: string; mr: string; bl: string; br: string }> = {
  left: { ml: "0px", mr: "auto", bl: "none", br: "1px solid" },
  center: { ml: "auto", mr: "auto", bl: "1px solid", br: "1px solid" },
  right: { ml: "auto", mr: "0px", bl: "1px solid", br: "none" },
};

type Prefs = {
  theme: Theme;
  align: ColumnAlign;
  setTheme: (t: Theme) => void;
  setAlign: (a: ColumnAlign) => void;
  cycleAlign: () => void;
};

const PrefsContext = createContext<Prefs | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function PrefsProvider({ children }: { children: React.ReactNode }) {  const [theme, setThemeState] = useState<Theme>(() => read<Theme>("rr:theme", "dark"));
  const [align, setAlignState] = useState<ColumnAlign>(() =>
    read<ColumnAlign>("rr:align", "left"),
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    const v = ALIGN[align];
    root.style.setProperty("--column-ml", v.ml);
    root.style.setProperty("--column-mr", v.mr);
    root.style.setProperty("--column-bl", `${v.bl} var(--color-border)`);
    root.style.setProperty("--column-br", `${v.br} var(--color-border)`);
  }, [align]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      window.localStorage.setItem("rr:theme", JSON.stringify(t));
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
  }, []);

  const setAlign = useCallback((a: ColumnAlign) => {
    setAlignState(a);
    try {
      window.localStorage.setItem("rr:align", JSON.stringify(a));
    } catch {
      /* storage unavailable — alignment still applies for this session */
    }
  }, []);

  const cycleAlign = useCallback(() => {
    setAlignState((prev) => {
      const order: ColumnAlign[] = ["left", "center", "right"];
      const next = order[(order.indexOf(prev) + 1) % order.length];
      try {
        window.localStorage.setItem("rr:align", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ theme, align, setTheme, setAlign, cycleAlign }),
    [theme, align, setTheme, setAlign, cycleAlign],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used inside PrefsProvider");
  return ctx;
}
