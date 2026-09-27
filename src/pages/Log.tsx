import { ArrowUpRight } from "lucide-react";
import { FadeUp } from "@/components/Reveal";
import { site } from "@/content/site";

export function Log() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <FadeUp>
        <p className="font-mono text-xs tracking-[0.25em] text-electric uppercase">~/log</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">build log</h1>
        <p className="mt-4 text-muted-foreground">Signals from the workshop — shipped systems and active threads.</p>
      </FadeUp>
      <div className="mt-10">
        {site.log.map((entry, i) => (
          <FadeUp key={`${entry.date}-${entry.text.slice(0, 16)}`} delay={Math.min(i * 0.05, 0.25)}>
            <div className="flex gap-5 border-t py-5 last:border-b">
              <span className="w-20 shrink-0 font-mono text-xs text-electric">{entry.date}</span>
              <p className="text-sm leading-relaxed">
                {entry.text}{" "}
                {entry.href && (
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-0.5 font-mono text-xs text-electric hover:underline"
                  >
                    source <ArrowUpRight className="size-3" />
                  </a>
                )}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
