import { useEffect, useRef, useState } from "react";
import { useMotionValue } from "motion/react";
import { ProximityGrid } from "@/components/blocks/interactive-grid-hero/proximity-grid";
import { usePrefs } from "@/hooks/usePrefs";

const COLUMN = 640;

/**
 * Cursor-reactive field that lives ONLY in the blank space either side of the
 * column.
 *
 * The column has no background of its own, so a full-bleed layer would show
 * straight through the text. A mask cuts a transparent band exactly one column
 * wide out of the middle, which is what confines the effect to the gutters.
 *
 * Pointer tracking is external rather than the component's built-in listener.
 * This layer is `pointer-events-none` and sits under the whole page, so it can
 * never receive a pointer event itself; handing it MotionValues from a window
 * listener also means cells under the column keep updating while the cursor is
 * over the gutters, instead of going inert the moment the pointer crosses the
 * mask boundary.
 *
 * Mounting is deferred to idle for the same reason as before: nothing above the
 * fold depends on this layer, and a first frame spent on decoration is a
 * direct LCP cost.
 */
export function GutterField() {
  const { theme } = usePrefs();
  const [ok, setOk] = useState<boolean | null>(null);
  const [reduce, setReduce] = useState(false);
  const [live, setLive] = useState(false);

  const pointerX = useMotionValue(-9999);
  const pointerY = useMotionValue(-9999);
  const pointerActive = useMotionValue(0);
  const frame = useRef(0);
  const target = useRef(0);

  useEffect(() => {
    // The grid is a plain DOM implementation with no WebGL dependency, so this
    // probe is now only guarding against reduced-motion-only environments.
    setOk(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (ok === null) return;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 600));
    const id = idle(() => setLive(true));
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
    };
  }, [ok]);

  useEffect(() => {
    if (!live || reduce) return;
    const w = window.innerWidth;

    const apply = () => {
      frame.current = 0;
      pointerActive.set(target.current);
    };

    const onMove = (e: PointerEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
      // Distance to the nearest horizontal edge. The gutters are the strips at
      // the two edges, so a SMALL distance means the cursor is in a gutter and a
      // large one means it is over the masked-out column.
      const toEdge = Math.min(e.clientX, w - e.clientX);
      target.current = toEdge < COLUMN / 2 + 24 ? 1 : 0;
      if (!frame.current) frame.current = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      target.current = 0;
      if (!frame.current) frame.current = requestAnimationFrame(apply);
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
      pointerActive.set(0);
    };
  }, [live, reduce, pointerX, pointerY, pointerActive]);

  if (ok === null || !live) return null;

  return (
    <div aria-hidden className="gutter-mask pointer-events-none fixed inset-0 z-0">
      <ProximityGrid
        className="h-full min-h-0 w-full bg-transparent"
        cellSize={72}
        gap={4}
        radius="rounded"
        proximity={3}
        inset={6}
        pointerX={pointerX}
        pointerY={pointerY}
        pointerActive={pointerActive}
        data-accent-probe={theme}
      />
    </div>
  );
}

export { COLUMN };
