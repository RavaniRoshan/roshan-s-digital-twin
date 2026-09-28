/**
 * Gutter field fragment shader for SpaceUI's Paper Shader runtime.
 *
 * This is a WebGL2 pipeline: the runtime ships a vertex shader that already
 * begins `#version 300 es`, and it does NOT prepend a version directive to the
 * fragment stage — it only rewrites precision qualifiers. So this file has to
 * declare its own version, and that means ES 3.00 syntax throughout: an
 * explicit `out` for the fragment result, and `fwidth` available as core
 * rather than behind the derivatives extension.
 *
 * Getting either detail wrong is not a warning. A mismatched version pair fails
 * to link, `program` stays null, and the runtime renders nothing while leaving
 * a default-sized canvas in the DOM — which is exactly the "shader is
 * invisible" symptom.
 *
 * The runtime sets `u_resolution` and `u_time`. `u_tint`, `u_opacity`,
 * `u_inner`, `u_pointer` and `u_hover` are ours: the first three are seeded
 * through the component's `uniforms` prop, and the last two are pushed per
 * frame through the imperative handle (`setUniforms`) as the pointer moves.
 * Both routes work because the runtime calls getUniformLocation for every key
 * it was constructed with, so a uniform only has to exist in the *initial*
 * prop to be updatable later.
 *
 * Tuned for two tall, narrow gutters beside a 640px column: a sparse lattice
 * that drifts slowly, and a cursor field that pulls the rules toward the
 * pointer and brightens them as it passes. Single colour, low alpha — the
 * point is that it never competes with the text.
 */
export const GUTTER_FRAGMENT = /* glsl */ `#version 300 es
precision mediump float;

in vec2 v_patternUV;

uniform vec2  u_resolution;
uniform float u_time;
uniform vec3  u_tint;
uniform float u_opacity;
uniform float u_inner;    // normalised half-width of the column
uniform vec2  u_pointer;  // cursor in UV space, y already flipped
uniform float u_hover;     // 0 when the pointer is away, 1 when it is over a gutter

out vec4 fragColor;

/** Antialiased line mask: ~1.0 on a rule, 0.0 well away from it. */
float rule(float coord, float density, float thickness) {
  float f = fract(coord * density - 0.5) - 0.5;
  float d = abs(f) / max(fwidth(coord * density), 0.0001);
  return 1.0 - min(d * thickness, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  // Slow downward drift plus a lateral sway, so the strips never look like a
  // conveyor belt.
  vec2 drift = vec2(sin(u_time * 0.05) * 0.012, u_time * 0.018);

  // Cursor field. Falling off to nothing at ~0.18 of the viewport keeps the
  // distortion local: the lattice bends near the pointer and the rest of the
  // gutter is untouched, rather than the whole strip warping at once.
  vec2  toPointer = uv - u_pointer;
  float d = length(toPointer);
  float near = 1.0 - smoothstep(0.0, 0.18, d);
  near *= u_hover;

  // Attraction, not a shockwave: warp the sampling coordinates toward the
  // pointer so the existing rules bend into it. Sampling space rather than
  // adding an offset afterwards means the lattice stays continuous — moving
  // pixels would tear the lines apart instead of curving them.
  vec2 pull = (d > 0.0001 ? toPointer / d : vec2(0.0)) * near * 0.03;

  // One calm, sparse lattice at roughly 210px. An earlier pass ran a fine grid
  // plus a denser "heavy" layer, which read as chain-link fence across a gutter
  // this large rather than as depth.
  float g = rule(uv.x + drift.x + pull.x, 9.0, 0.5) * 0.55
          + rule(uv.y + drift.y + pull.y, 9.0, 0.5) * 0.45;

  // Rules passing under the cursor pick up a little more light.
  float a = g * u_opacity * (1.0 + near * 1.1);

  // Rise away from the column's own hairline rather than starting at full
  // strength against it, so the field reads as depth behind the layout.
  float toColumn = abs(abs(uv.x - 0.5) - u_inner);
  a *= smoothstep(0.0, 0.055, toColumn);

  // Fade the top and bottom so the strips have no hard seam.
  a *= smoothstep(0.0, 0.16, uv.y) * (1.0 - smoothstep(0.84, 1.0, uv.y));

  if (a < 0.002) discard;

  // Premultiplied output. The runtime's context sets premultipliedAlpha, so it
  // blends with (ONE, ONE_MINUS_SRC_ALPHA): the colour channels are added
  // directly. Emitting an unpremultiplied vec4(u_tint, a) therefore paints the
  // full accent at full strength and makes u_opacity a no-op — the field reads
  // as saturated blue graph paper no matter how low the alpha is set.
  fragColor = vec4(u_tint * a, a);
}
`;
