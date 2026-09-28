import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A working model of a token budget with a circuit breaker, in the page.
 *
 * This exists because the alternative signals are not available. Star counts and
 * follower numbers are the conventional proof of engineering work, and at two
 * followers and seven stars they advertise the opposite of what they are meant
 * to. What is available is the work itself: so the site demonstrates the system
 * it is selling rather than asserting that the system exists.
 *
 * It is a real reducer, not an animation. The same four states a guard needs —
 * closed, open, half-open, tripped — and the same three failure thresholds used
 * in practice (N consecutive failures to trip, a cool-down before probing, a
 * small success budget to close again). Changing the budget re-renders the
 * decision path from the same numbers every time.
 */

type Breaker = "closed" | "open" | "half-open";

interface Sample {
  id: number;
  /** Simulated tokens charged by this call. */
  cost: number;
  ok: boolean;
}

const PRESETS = [
  { id: "healthy", label: "healthy", budget: 20_000, failRate: 0.04, latency: 140 },
  { id: "noisy", label: "noisy upstream", budget: 12_000, failRate: 0.42, latency: 900 },
  { id: "runaway", label: "runaway loop", budget: 4_000, failRate: 0.06, latency: 120 },
] as const;

/** Consecutive failures that trip the breaker. */
const FAILURE_THRESHOLD = 4;
/** Fraction of the budget still spendable while probing in half-open. */
const PROBE_BUDGET = 0.12;

function nextCost(latency: number) {
  // Long calls cost more, which is the real relationship and the reason a
  // latency spike is a budget event rather than just a slow request.
  return Math.round(180 + latency * (0.55 + Math.random() * 1.1));
}

export function BudgetDemo() {
  const [preset, setPreset] = useState<(typeof PRESETS)[number]["id"]>("noisy");
  // Explicit generics: PRESETS is `as const`, so the initialisers would otherwise
  // pin state to a single literal and reject every other preset.
  const [budget, setBudget] = useState<number>(PRESETS[1].budget);
  const [failRate, setFailRate] = useState<number>(PRESETS[1].failRate);
  const [latency, setLatency] = useState<number>(PRESETS[1].latency);
  const [spent, setSpent] = useState(0);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [breaker, setBreaker] = useState<Breaker>("closed");
  const [consecutive, setConsecutive] = useState(0);
  const [trippedAt, setTrippedAt] = useState<number | null>(null);
  const [running, setRunning] = useState(false);

  const state = useRef({ spent: 0, consecutive: 0, breaker: "closed" as Breaker, probe: 0 });

  // Latency and failure rate are read through refs inside the interval, so
  // dragging a slider does not tear down and rebuild the loop on every tick.
  const latencyRef = useRef(latency);
  latencyRef.current = latency;
  const failRef = useRef(failRate);
  failRef.current = failRate;

  const spend = useCallback(
    (ok: boolean) => {
      const cost = nextCost(latencyRef.current);
      const s = state.current;

      if (s.breaker === "open") return;

      // In half-open a limited probe budget is allowed through so the breaker
      // can actually observe recovery instead of waiting for a real request.
      const ceiling = s.breaker === "half-open" ? budget * PROBE_BUDGET : budget;
      if (s.spent + cost > ceiling) {
        s.breaker = "open";
        s.consecutive = 0;
        setBreaker("open");
        setConsecutive(0);
        setTrippedAt(s.spent);
        setRunning(false);
        return;
      }

      s.spent += cost;
      if (ok) {
        s.consecutive = 0;
        s.probe = 0;
        if (s.breaker === "half-open") {
          s.breaker = "closed";
          setBreaker("closed");
          setTrippedAt(null);
        }
      } else {
        s.consecutive += 1;
        s.probe += 1;
        if (s.consecutive >= FAILURE_THRESHOLD) {
          s.breaker = "open";
          setBreaker("open");
          setTrippedAt(s.spent);
          setRunning(false);
          return;
        }
      }

      setSpent(s.spent);
      setConsecutive(s.consecutive);
      setSamples((prev) => [...prev.slice(-39), { id: s.spent, cost, ok }]);
    },
    [budget],
  );

  // Latency is read inside the interval, which closes over the state at the time
  // the effect ran. A ref keeps the interval stable so changing the slider does
  // not tear down and rebuild the loop on every drag.
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      spend(Math.random() > failRef.current);
    }, Math.max(90, latencyRef.current));
    return () => window.clearInterval(id);
  }, [running, spend]);

  const applyPreset = useCallback((id: (typeof PRESETS)[number]["id"]) => {
    const p = PRESETS.find((x) => x.id === id) ?? PRESETS[0];
    setPreset(id);
    setBudget(p.budget);
    setFailRate(p.failRate);
    setLatency(p.latency);
    state.current = { spent: 0, consecutive: 0, breaker: "closed", probe: 0 };
    setSpent(0);
    setConsecutive(0);
    setSamples([]);
    setBreaker("closed");
    setTrippedAt(null);
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    state.current = { spent: 0, consecutive: 0, breaker: "closed", probe: 0 };
    setSpent(0);
    setConsecutive(0);
    setSamples([]);
    setBreaker("closed");
    setTrippedAt(null);
  }, []);

  const used = budget > 0 ? Math.min(1, spent / budget) : 0;
  const remaining = Math.max(0, budget - spent);

  const tone =
    breaker === "open" ? "text-[var(--color-warning)]" : breaker === "half-open" ? "text-[var(--color-info)]" : "text-[var(--color-success)]";

  const verdict = useMemo(() => {
    if (breaker === "open") {
      return trippedAt !== null && spent >= budget
        ? `budget exhausted at ${spent.toLocaleString()} tokens — call refused, no charge`
        : `${FAILURE_THRESHOLD} consecutive failures — call refused, no charge`;
    }
    if (breaker === "half-open") return "probing with a 12% budget slice";
    if (consecutive > 0) {
      return `${consecutive} of ${FAILURE_THRESHOLD} failures before trip`;
    }
    return "accepting calls";
  }, [breaker, spent, budget, trippedAt, consecutive]);

  return (
    <div className="flat-hair border">
      <div className="flex flex-wrap items-center gap-2 border-b px-3 py-2">
        <span className="mono text-[0.625rem] tracking-[0.14em] o-3 uppercase">live budget</span>
        <span className={cn("mono ml-auto inline-flex items-center gap-1.5 text-xs", tone)}>
          <span
            className={cn(
              "size-1.5 rounded-full",
              breaker === "open" ? "bg-[var(--color-warning)]" : "bg-[var(--color-success)]",
              running && "animate-pulse-glow",
            )}
          />
          {breaker}
        </span>
      </div>

      <div className="space-y-4 p-3">
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPreset(p.id)}
              aria-pressed={preset === p.id}
              className={cn(
                "flat mono cursor-pointer px-2 py-1 text-[0.625rem] transition-opacity",
                preset === p.id ? "text-chroma" : "o-3 hover:o-2",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div>
          <div className="mono mb-1.5 flex items-baseline justify-between text-[0.625rem]">
            <span className="o-3">budget</span>
            <span className="tabular-nums">
              {spent.toLocaleString()} / {budget.toLocaleString()}
            </span>
          </div>
          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-muted)]">
            <div
              className={cn(
                "h-full rounded-full transition-[width] duration-150",
                breaker === "open" ? "bg-[var(--color-warning)]" : "bg-chroma",
              )}
              style={{ width: `${used * 100}%` }}
            />
          </div>
          <p className="mono mt-1.5 text-[0.625rem] o-3">
            {verdict} &middot; {remaining.toLocaleString()} left
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mono mb-1 block text-[0.625rem] o-3">
              failure rate <span className="tabular-nums">{Math.round(failRate * 100)}%</span>
            </span>
            <input
              type="range"
              min={0}
              max={90}
              value={Math.round(failRate * 100)}
              onChange={(e) => {
                setFailRate(Number(e.target.value) / 100);
                setPreset("healthy");
              }}
              className="w-full accent-[var(--color-chroma)]"
            />
          </label>
          <label className="block">
            <span className="mono mb-1 block text-[0.625rem] o-3">
              latency <span className="tabular-nums">{latency}ms</span>
            </span>
            <input
              type="range"
              min={60}
              max={1400}
              step={20}
              value={latency}
              onChange={(e) => {
                setLatency(Number(e.target.value));
                setPreset("healthy");
              }}
              className="w-full accent-[var(--color-chroma)]"
            />
          </label>
        </div>

        <div className="flex h-8 items-end gap-px" aria-hidden>
          {samples.map((s) => (
            <span
              key={s.id}
              className={cn("flex-1 rounded-t-[1px]", s.ok ? "bg-chroma/45" : "bg-[var(--color-warning)]/70")}
              style={{ height: `${Math.max(8, Math.min(100, (s.cost / 1400) * 100))}%` }}
            />
          ))}
          {samples.length === 0 && (
            <span className="mono w-full text-center text-[0.625rem] o-3">
              run the loop to see the breaker work
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            disabled={breaker === "open"}
            className={cn(
              "flat mono cursor-pointer px-3 py-1.5 text-xs transition-opacity",
              breaker === "open" ? "o-3" : "text-chroma",
            )}
          >
            {running ? "halt" : "run"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="mono cursor-pointer px-3 py-1.5 text-xs o-3 transition-opacity hover:o-2"
          >
            reset
          </button>
          <span className="mono ml-auto text-[0.625rem] o-3">
            4 failures trip &middot; 12% probe slice recovers
          </span>
        </div>
      </div>
    </div>
  );
}
