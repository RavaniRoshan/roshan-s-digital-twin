import { useState } from "react";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import { Fade, Section, SectionHead } from "@/components/Reveal";
import { SystemCard } from "@/components/SystemCard";
import { site } from "@/content/site";

const FILTERS = ["all", "rust", "python", "typescript", "zig"] as const;

export function Systems() {
  const [filter, setFilter] = useState<string>("all");
  const visible = site.systems.filter(
    (s) => filter === "all" || s.language.toLowerCase() === filter,
  );

  return (
    <Section className="border-t-0 pt-12">
      <Fade>
        <SectionHead label="inventory" title="all systems" meta={`${visible.length} of ${site.systems.length}`} />
      </Fade>

      <Fade delay={0.06}>
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList variant="underline" className="max-w-full overflow-x-auto">
            {FILTERS.map((f) => (
              <TabsTab key={f} value={f} className="font-mono uppercase">
                {f}
              </TabsTab>
            ))}
          </TabsList>
        </Tabs>
      </Fade>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((sys, i) => (
          <Fade key={sys.slug} delay={Math.min(i * 0.05, 0.3)}>
            <SystemCard system={sys} />
          </Fade>
        ))}
      </div>
    </Section>
  );
}
