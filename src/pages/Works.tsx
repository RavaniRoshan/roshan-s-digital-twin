import { useState } from "react";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import { ProjectCard } from "@/components/ProjectCard";
import { FadeUp } from "@/components/Reveal";
import { site } from "@/content/site";

const FILTERS = ["all", ...Array.from(new Set(site.projects.map((p) => p.language.toLowerCase())))];

export function Works() {
  const [filter, setFilter] = useState("all");
  const visible =
    filter === "all" ? site.projects : site.projects.filter((p) => p.language.toLowerCase() === filter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <FadeUp>
        <p className="font-mono text-xs tracking-[0.25em] text-electric uppercase">~/systems</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">systems index</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Agent infrastructure, reliability layers, and systems experiments — each with a case file.
        </p>
      </FadeUp>
      <FadeUp delay={0.1}>
        <Tabs value={filter} onValueChange={setFilter} className="mt-8">
          <TabsList variant="underline">
            {FILTERS.map((f) => (
              <TabsTab key={f} value={f} className="font-mono">
                {f}
              </TabsTab>
            ))}
          </TabsList>
        </Tabs>
      </FadeUp>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <FadeUp key={p.slug} delay={Math.min(i * 0.06, 0.3)}>
            <ProjectCard project={p} />
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
