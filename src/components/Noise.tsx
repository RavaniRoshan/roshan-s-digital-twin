/**
 * Film grain.
 *
 * Was a full-viewport SVG `feTurbulence` filter, which is a real per-frame
 * rasterisation cost for an effect that never changes. Replaced with a 160px
 * tile of the same noise, inlined as a background image: the browser rasterises
 * one small tile once and repeats it, so the full-viewport layer costs nothing
 * to paint and cannot shift layout.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export function Noise() {
  return (
    <div
      aria-hidden
      className="grain"
      style={{ backgroundImage: GRAIN, backgroundRepeat: "repeat" }}
    />
  );
}
