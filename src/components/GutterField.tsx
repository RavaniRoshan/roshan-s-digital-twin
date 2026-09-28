import { useEffect, useState } from "react";
import PaperShader from "@/components/shader/paper-shader";
import { GUTTER_FRAGMENT } from "@/lib/paperShader";
import { usePrefs } from "@/hooks/usePrefs";

const COLUMN = 640;

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
  const { accent } = usePrefs();
  const [ok, setOk] = useState<boolean | null>(null);
  const [tint, setTint] = useState<[number, number, number]>([0.5, 0.7, 0.9]);
  const [reduce, setReduce] = useState(false);
  const [live, setLive] = useState(false);

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
  }, [accent]);

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

  if (ok === null || !live) return null;

  return (
    <div
      aria-hidden
      className="gutter-mask pointer-events-none fixed inset-0 z-0"
    >
      {ok ? (
        <PaperShader
          className="size-full"
          fragmentShader={GUTTER_FRAGMENT}
          speed={reduce ? 0 : 0.5}
          minPixelRatio={1}
          maxPixelCount={900_000}
          uniforms={{
            u_tint: tint,
            u_opacity: 0.06,
            u_inner: (COLUMN / 2 + 1) / Math.max(window.innerWidth, 1),
          }}
        />
      ) : (
        <div className="size-full bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px)] [background-size:48px_100%] opacity-40" />
      )}
    </div>
  );
}

export { COLUMN };
