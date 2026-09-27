import { ArrowUpRight, Github, Star } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { System } from "@/content/site";

function Pip({ status }: { status: System["status"] }) {
  const color =
    status === "active"
      ? "bg-chroma"
      : status === "research"
        ? "bg-info"
        : status === "stable"
          ? "bg-success"
          : "bg-muted-foreground/50";
  return <span className={`inline-block size-1.5 shrink-0 rounded-full ${color}`} />;
}

export function SystemDialog({
  system,
  open,
  onOpenChange,
}: {
  system: System | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup className="max-w-xl">
        {system && (
          <>
            <DialogTitle className="text-lg font-semibold tracking-tight">
              {system.codename}
            </DialogTitle>
            <DialogDescription className="mono text-xs o-3">{system.tagline}</DialogDescription>

            <div className="px-6 pb-6">
              <div className="mt-1 mb-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-y py-2.5 text-xs">
                <span className="flex items-center gap-1.5">
                  <Pip status={system.status} />
                  {system.status}
                </span>
                <span className="o-3">{system.role}</span>
                <span className="o-3">{system.language}</span>
                <span className="o-3">{system.runtime}</span>
                <span className="ml-auto flex items-center gap-1 o-2">
                  <Star className="size-3" />
                  {system.stars}
                </span>
              </div>

              <p className="text-sm leading-relaxed">{system.summary}</p>

              <p className="mono mt-5 mb-2 text-xs tracking-[0.14em] o-3 uppercase">the problem</p>
              <p className="text-sm leading-relaxed o-2">{system.problem}</p>

              <p className="mono mt-5 mb-2 text-xs tracking-[0.14em] o-3 uppercase">the approach</p>
              <ul className="space-y-2">
                {system.approach.map((a) => (
                  <li key={a} className="flex gap-2.5 text-sm leading-relaxed o-2">
                    <span className="text-chroma">▸</span>
                    {a}
                  </li>
                ))}
              </ul>

              <p className="mono mt-5 mb-2 text-xs tracking-[0.14em] o-3 uppercase">capabilities</p>
              <ul className="space-y-2">
                {system.capabilities.map((c) => (
                  <li key={c} className="flex gap-2.5 text-sm leading-relaxed o-2">
                    <span className="text-chroma">▸</span>
                    {c}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {system.topics.map((t) => (
                  <span key={t} className="mono rounded border px-2 py-0.5 text-[0.625rem] o-3">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Button size="sm" render={<a href={system.href} target="_blank" rel="noreferrer" />}>
                  <Github className="size-3.5" /> repository
                </Button>
                {system.homepage && (
                  <Button
                    size="sm"
                    variant="outline"
                    render={<a href={system.homepage} target="_blank" rel="noreferrer" />}
                  >
                    live <ArrowUpRight className="size-3.5" />
                  </Button>
                )}
                <DialogClose render={<Button size="sm" variant="ghost" />}>close</DialogClose>
              </div>
            </div>
          </>
        )}
      </DialogPopup>
    </Dialog>
  );
}
