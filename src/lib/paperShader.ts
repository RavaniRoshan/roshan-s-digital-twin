/**
 * Gutter field fragment shader for SpaceUI's Paper Shader runtime (WebGL2,
 * `#version 300 es`, so `fwidth` is core rather than an extension).
 *
 * The runtime injects `u_resolution` and `u_time`. `u_tint` and `u_opacity`
 * are ours and arrive through the component's `uniforms` prop.
 *
 * Tuned for two tall, narrow side gutters around a 640px column: a fine grid
 * with the vertical rules weighted heavier, drifting slowly downward, so the
 * strips read as a moving data feed rather than wallpaper. Single colour, low
 * alpha — the whole point is that it never competes with the text.
 */
export const GUTTER_FRAGMENT = /* glsl */ `
precision mediump float;

uniform float u_time;
uniform vec3  u_tint;
uniform float u_opacity;

/** Antialiased line mask: 1.0 on a rule, 0.0 between rules. */
float rule(float coord, float density, float thickness) {
  float f = fract(coord * density - 0.5) - 0.5;
  float d = abs(f) / max(fwidth(coord * density), 0.0001);
  return 1.0 - min(d * thickness, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  // Slow downward drift, plus a slower lateral sway so it never looks like a
  // conveyor belt.
  vec2 drift = vec2(sin(u_time * 0.05) * 0.012, u_time * 0.018);

  float fine   = rule(uv.x + drift.x, 44.0, 1.0) * 0.30
               + rule(uv.y + drift.y, 44.0, 1.0) * 0.18;
  float heavy  = rule(uv.x + drift.x, 11.0, 1.0) * 0.34;

  float a = (fine + heavy) * u_opacity;

  // Fade out toward the top and bottom edges so the strips have no hard seam,
  // and dim slightly toward the horizontal centre of each gutter.
  a *= smoothstep(0.0, 0.18, uv.y) * (1.0 - smoothstep(0.82, 1.0, uv.y));
  a *= 0.55 + 0.45 * (1.0 - abs(uv.x - 0.5) * 2.0);

  if (a < 0.002) discard;
  gl_FragColor = vec4(u_tint, a);
}
`;
