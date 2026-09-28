import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "dark" | "light";
export type Accent = "cyan" | "ember" | "oxblood" | "ultramarine";

export const ACCENTS: { id: Accent; label: string; note: string }[] = [
  { id: "ember", label: "ember", note: "neutral warm black" },
  { id: "cyan", label: "cyan", note: "cold blue-grey" },
  { id: "oxblood", label: "oxblood", note: "warm espresso" },
  { id: "ultramarine", label: "ultra", note: "deep navy" },
];

type Prefs = {
  theme: Theme;
  accent: Accent;
  setTheme: (t: Theme) => void;
  setAccent: (a: Accent) => void;
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
export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => read<Theme>("rr:theme", "dark"));
  const [accent, setAccentState] = useState<Accent>(() => read<Accent>("rr:accent", "ember"));

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.accent = accent;
  }, [accent]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      window.localStorage.setItem("rr:theme", JSON.stringify(t));
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
  }, []);

  const setAccent = useCallback((a: Accent) => {
    setAccentState(a);
    try {
      window.localStorage.setItem("rr:accent", JSON.stringify(a));
    } catch {
      /* storage unavailable — accent still applies for this session */
    }
  }, []);

  const value = useMemo(
    () => ({ theme, accent, setTheme, setAccent }),
    [theme, accent, setTheme, setAccent],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used inside PrefsProvider");
  return ctx;
}
