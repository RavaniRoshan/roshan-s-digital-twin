import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { usePrefs } from "@/hooks/usePrefs";
import type { Track } from "@/content/site";

/**
 * Single, on-demand Spotify player.
 *
 * Deliberately an overlay rather than something in the document flow. Spotify
 * stopped exposing 30-second preview MP3s to newly registered API apps, so the
 * only way to play audio in a browser is their embed widget — a third-party
 * iframe, which is the one thing on this page capable of costing real
 * performance. Three things keep that cost off the critical path:
 *
 *   1. Nothing is created until a row is clicked, so a cold load ships zero
 *      iframes and zero third-party JS. The deck, emoji and logos do not
 *      compete with Spotify's widget for the main thread.
 *   2. It is `fixed`, so it is out of flow and cannot move anything. CLS stays
 *      at 0 whether or not it is open.
 *   3. Only ever one, keyed to the open track, so opening a second track
 *      replaces the iframe instead of stacking five of them.
 *
 * The widget cannot be themed to the accent system — Spotify only exposes
 * theme=0 (dark) and theme=1 (light) — hence the separate light and dark
 * chrome. It is re-keyed on theme change, which restarts playback; a theme
 * toggle mid-song is rare enough to be worth the simplicity.
 */
export function SpotifyDock({ track, onClose }: { track: Track | null; onClose: () => void }) {
  const { theme } = usePrefs();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape closes, and focus moves into the dialog so the keyboard is not left
  // behind on the row that opened it.
  useEffect(() => {
    if (!track) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [track, onClose]);

  if (!track) return null;

  const id = track.url.split("/").pop();
  const src = `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=${theme === "dark" ? 0 : 1}`;

  return (
    <div
      role="dialog"
      aria-label={`Now playing: ${track.title} by ${track.artist}`}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4"
    >
      <div className="pointer-events-auto w-full max-w-[640px] overflow-hidden rounded-lg border border-border bg-background shadow-[0_8px_30px_rgb(0_0_0/0.28)]">
        <div className="flex items-center gap-3 border-b border-border px-3 py-2">
          <img
            src={track.art}
            alt=""
            aria-hidden
            width={28}
            height={28}
            className="size-7 shrink-0 rounded-[4px] object-cover"
          />
          <span className="min-w-0 flex-1 truncate text-sm font-semibold">{track.title}</span>
          <a
            href={track.url}
            target="_blank"
            rel="noreferrer"
            className="mono shrink-0 text-xs o-2 transition-opacity hover:o-1"
          >
            spotify ↗
          </a>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close player"
            className="shrink-0 cursor-pointer o-2 transition-opacity hover:o-1"
          >
            <X className="size-4" />
          </button>
        </div>
        <iframe
          key={theme}
          title={`${track.title} by ${track.artist} on Spotify`}
          src={src}
          width="100%"
          height="152"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="block border-0"
        />
      </div>
    </div>
  );
}
