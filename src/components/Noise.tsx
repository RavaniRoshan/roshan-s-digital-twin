/** Fixed film-grain layer. Mirrors the reference's feTurbulence overlay. */
export function Noise() {
  return (
    <svg className="grain" aria-hidden="true">
      <filter id="rr-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#rr-grain)" />
    </svg>
  );
}
