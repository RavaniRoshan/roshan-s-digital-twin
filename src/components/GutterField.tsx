import { useEffect, useRef, useState } from "react";
import PaperShader from "@/components/shader/paper-shader";
import { GUTTER_FRAGMENT } from "@/lib/paperShader";
import { usePrefs } from "@/hooks/usePrefs";

const COLUMN = 640;

/** Radius of the cursor's influence, in UV. Matches `near` in the shader. */
const HOVER_RADIUS = 0.18;
/** Fraction of the radius the sampling coordinates are pulled by at the centre. */
const PULL = 0.03;

/**
 * Opacity is per-mode because the same alpha does not read the same on a light
 * background. The tint already inverts with the theme (--accent-chroma is a dark
 * blue in light mode, a light blue in dark), but a ~13-level delta on white is
 * perceptually far weaker than the same delta on near-black, so light mode
 * needs roughly double the alpha for the field to register at all.
 */
const OPACITY = { dark: 0.075, light: 0.15 } as const;

function hasWebGL2() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2"));
  } catch {
    return false;
  }
}

/**
 * Reads the live accent as a normalised rgb triple. Done through a throwaway
 * element rather than parsing the hsl() string by hand, so the shader follows
 * whichever accent family is active without duplicating the token values here.
 */
function readAccentRGB(): [number, number, number] {
  const probe = document.createElement("span");
  probe.style.color = "var(--accent-chroma)";
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  document.body.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();
  const m = computed.match(/[\d.]+/g);
  if (!m || m.length < 3) return [0.5, 0.7, 0.9];
  return [Number(m[0]) / 255, Number(m[1]) / 255, Number(m[2]) / 255];
}

/**
 * Background that lives ONLY in the blank space either side of the column.
 *
 * The column has no background of its own, so a full-bleed layer would show
 * straight through the text. A mask cuts a transparent band exactly one column
 * wide out of the middle, which is what confines the effect to the gutters.
 *
 * Paper Shader's runtime throws on a missing WebGL2 context and has no WebGPU
 * path, so capability is probed first and a static grid stands in when it is
 * unavailable — otherwise the strips would just be blank.
 */
export function GutterField() {
  const { accent, theme } = usePrefs();
  const [ok, setOk] = useState<boolean | null>(null);
  const [tint, setTint] = useState<[number, number, number]>([0.5, 0.7, 0.9]);
  const [reduce, setReduce] = useState(false);
  const [live, setLive] = useState(false);

  const shader = useRef<{ setUniforms: (u: Record<string, unknown>) => void } | null>(null);
  const pointer = useRef<[number, number]>([0.5, 0.5]);
  const hover = useRef(0);
  const target = useRef(0);
  const frame = useRef(0);
  const pushed = useRef<[number, number]>([-1, -1]);
  const pushedHover = useRef(-1);

  useEffect(() => {
    setOk(hasWebGL2());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setTint(readAccentRGB());
  }, [accent, theme]);

  // Mount only after the browser has painted and gone quiet. A live WebGL
  // context competing for the first frame is a direct LCP tax, and this layer
  // is decoration — nothing above the fold depends on it.
  useEffect(() => {
    if (ok === null) return;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 600));
    const id = idle(() => setLive(true));
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
    };
  }, [ok]);

  /**
   * Pointer tracking. Writes go through the runtime's imperative handle rather
   * than the `uniforms` prop: that prop is diffed by identity and pushed
   * through an async resolver, so re-rendering on every mousemove would both
   * churn React and lag the cursor behind the frame.
   *
   * Writes are coalesced into one rAF and the hover value is eased, because an
   * instantaneous on/off makes the field pop rather than respond.
   */
  /**
   * Pointer tracking. Writes go through the runtime's imperative handle rather
   * than the `uniforms` prop: that prop is diffed by identity and pushed
   * through an async resolver, so re-rendering on every mousemove would both
   * churn React and lag the cursor behind the frame.
   *
   * The eased value has to be pushed for two separate reasons, and conflating
   * them is the easy bug: the hover amount changing, and the cursor having
   * moved. Once the easing settles at 1, `target - hover` is 0 forever, so
   * pushing only on delta would freeze the field in place and it would stop
   * following the pointer. Hence the last-pushed bookkeeping.
   */
  useEffect(() => {
    if (!live || reduce) return;
    const w = window.innerWidth;
    const h = window.innerHeight;

    const tick = () => {
      frame.current = 0;

      const d = target.current - hover.current;
      hover.current = Math.abs(d) > 0.002 ? hover.current + d * 0.14 : target.current;

      const p = pointer.current;
      if (
        hover.current !== pushedHover.current ||
        p[0] !== pushed.current[0] ||
        p[1] !== pushed.current[1]
      ) {
        pushed.current = [p[0], p[1]];
        pushedHover.current = hover.current;
        shader.current?.setUniforms({ u_pointer: p, u_hover: hover.current });
      }

      // Stay scheduled while engaged, and until a fade-out finishes. Otherwise
      // a settled field would never notice the pointer moving again.
      if (target.current === 1 || hover.current > 0.001) {
        frame.current = requestAnimationFrame(tick);
      }
    };

    const ensure = () => {
      if (!frame.current) frame.current = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      pointer.current = [e.clientX / w, 1 - e.clientY / h];
      target.current = Math.min(e.clientX, w - e.clientX) < COLUMN / 2 + 24 ? 0 : 1;
      ensure();
    };
    const onLeave = () => {
      target.current = 0;
      ensure();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerleave", onLeave);
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = 0;
      hover.current = 0;
      pushed.current = [-1, -1];
      pushedHover.current = -1;
    };
  }, [live, reduce]);

  if (ok === null || !live) return null;

  return (
    <div aria-hidden className="gutter-mask pointer-events-none fixed inset-0 z-0">
      {ok ? (
        <PaperShader
          ref={shader as never}
          className="size-full"
          fragmentShader={GUTTER_FRAGMENT}
          speed={reduce ? 0 : 0.5}
          minPixelRatio={1}
          maxPixelCount={900_000}
          uniforms={{
            u_tint: tint,
            u_opacity: theme === "dark" ? OPACITY.dark : OPACITY.light,
            u_inner: (COLUMN / 2 + 1) / Math.max(window.innerWidth, 1),
            u_pointer: [0.5, 0.5] as [number, number],
            u_hover: 0,
          }}
        />
      ) : (
        <div className="size-full bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px)] [background-size:48px_100%] opacity-40" />
      )}
    </div>
  );
}

export { COLUMN, HOVER_RADIUS, PULL };
