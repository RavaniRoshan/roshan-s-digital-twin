
# Footer Watermark Redesign

## What Changes

### 1. Blended Watermark Illustration
- Remove the bordered, "poster-like" image approach
- Replace with an SVG-based illustration (brain-circuit motif) rendered directly in the footer, using CSS to make it truly blend into the background:
  - Use `absolute` positioning to fill the entire footer area
  - Apply radial gradient mask/fade so edges dissolve into the background seamlessly
  - Very low opacity (0.03 light / 0.06 dark) so it feels like a subtle texture, not a sticker
  - Use `mix-blend-mode: multiply` (light) / `screen` (dark) for natural blending

### 2. Your Quote Overlay
- Add the quote in a large, ultra-light, slightly rotated text overlaying the watermark area:
  - *"sometimes or most times the best way is just the way you know to do it"*
  - Styled as faint, italic monospace text with low opacity to match watermark feel

### 3. Stylized Signature
- Replace the plain text signature with a stylized cursive/script SVG signature reading "Ravani Roshan"
- Positioned bottom-right with slight rotation (-3deg), small size, muted color

### 4. Layout
- The watermark section spans the full footer width with generous vertical padding
- Footer content (email, social links, copyright) sits below, unchanged
- Everything uses CSS gradients and masks to fade naturally into the background color

## Technical Details

**Files modified:**
- `src/components/Footer.tsx` -- Complete rewrite of watermark section with inline SVG illustration, quote text, and stylized signature SVG. Remove the imported PNG image.
- `src/index.css` -- Add a utility class for radial gradient mask fade effect.

**Approach:**
- Use an inline SVG for the illustration (circuit/neural pattern) so we can style it with `currentColor` and theme-aware opacity -- this ensures it inherits the foreground color and truly blends rather than looking like an image pasted on top.
- Apply CSS `mask-image: radial-gradient(ellipse, black 30%, transparent 70%)` to fade edges smoothly into the background.
- The quote text uses `text-foreground/[0.04]` opacity so it reads as a ghostly watermark.
- The signature uses a hand-drawn SVG path for a cursive feel.
