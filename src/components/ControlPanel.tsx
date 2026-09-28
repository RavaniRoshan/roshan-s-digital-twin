import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import { ACCENTS, usePrefs, type Accent, type ColumnAlign } from "@/hooks/usePrefs";
import { cn } from "@/lib/utils";

const ALIGNMENTS: { id: ColumnAlign; label: string }[] = [
  { id: "left", label: "left" },
  { id: "center", label: "center" },
  { id: "right", label: "right" },
];

function Sliders() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="4" y1="21" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

export function ControlPanel() {
  const { theme, align, accent, setTheme, setAlign, setAccent } = usePrefs();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon-sm"
            className="flat fixed top-6 right-4 z-50 lg:top-8 lg:right-6"
          />
        }
      >
        <Sliders />
        <span className="sr-only">Display controls</span>
      </SheetTrigger>
      <SheetPopup side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-sm font-semibold">display</SheetTitle>
        </SheetHeader>
        <SheetPanel className="px-6 pt-0 pb-6">
          <div className="space-y-6">
            <div>
              <p className="mono mb-2 text-xs tracking-[0.14em] o-3 uppercase">theme</p>
              <div className="flex gap-2">
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className="flex-1"
                >
                  <Moon className="size-3.5" /> dark
                </Button>
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                  className="flex-1"
                >
                  <Sun className="size-3.5" /> light
                </Button>
              </div>
            </div>

            <div>
              <p className="mono mb-2 text-xs tracking-[0.14em] o-3 uppercase">accent</p>
              <div className="grid grid-cols-4 gap-1.5">
                {ACCENTS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAccent(a.id as Accent)}
                    aria-pressed={accent === a.id}
                    className={cn(
                      "flat flex cursor-pointer flex-col items-center gap-1.5 px-1 py-2 transition-opacity",
                      accent === a.id ? "o-1" : "o-3 hover:o-2",
                    )}
                  >
                    <span
                      className="size-4 rounded-full"
                      style={{ background: "var(--accent-chroma)" }}
                    />
                    <span className="mono text-[0.5625rem] tracking-wide">{a.label}</span>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs o-3">
                {ACCENTS.find((a) => a.id === accent)?.note} Â· swaps neutrals and accent together
              </p>
            </div>

            <div>
              <p className="mono mb-2 text-xs tracking-[0.14em] o-3 uppercase">column</p>
              <Tabs value={align} onValueChange={(v) => setAlign(v as ColumnAlign)}>
                <TabsList variant="underline" className="w-full">
                  {ALIGNMENTS.map((a) => (
                    <TabsTab key={a.id} value={a.id} className={cn("flex-1 font-mono text-xs")}>
                      {a.label}
                    </TabsTab>
                  ))}
                </TabsList>
              </Tabs>
              <p className="mt-2 text-xs o-3">
                Stays 640px wide. This slides it against the viewport and shifts which hairline is
                drawn. Centered on load.
              </p>
            </div>

            <div>
              <p className="mono mb-2 text-xs tracking-[0.14em] o-3 uppercase">system</p>
              <dl className="space-y-1.5 text-xs">
                {[
                  ["shell", "base-ui + motion"],
                  ["registry", "spaceui"],
                  ["columns", "640px / fixed"],
                  ["routing", "single column"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <dt className="o-3">{k}</dt>
                    <dd className="mono o-2">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </SheetPanel>
      </SheetPopup>
    </Sheet>
  );
}
