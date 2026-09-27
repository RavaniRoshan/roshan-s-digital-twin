import { ArrowUpRight } from "lucide-react";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/spaceui/timeline";
import { Fade, Section, SectionHead } from "@/components/Reveal";
import { site } from "@/content/site";

const TONE: Record<string, string> = {
  shipped: "bg-success",
  active: "bg-electric animate-pulse-glow",
  killed: "bg-destructive",
};

export function TimelinePage() {
  return (
    <Section className="border-t-0 pt-12">
      <Fade>
        <SectionHead label="ship log" title="build timeline" meta={`${site.timeline.length} events`} />
      </Fade>

      <Fade delay={0.06}>
        <div className="relative pl-1">
          {/* spine */}
          <span aria-hidden className="absolute top-2 bottom-2 left-[0.9375rem] w-px bg-border" />
          <Timeline defaultValue={site.timeline.length} className="gap-0">
            {site.timeline.map((event, i) => (
              <TimelineItem key={event.id} step={site.timeline.length - i} className="pb-8 last:pb-0">
                <TimelineIndicator
                  className={`-left-6 size-3.5 border-2 border-background ${TONE[event.status]}`}
                />
                <TimelineHeader>
                  <TimelineDate className="label text-electric">{event.date}</TimelineDate>
                  <TimelineTitle className="text-base font-semibold text-foreground">
                    {event.title}
                  </TimelineTitle>
                </TimelineHeader>
                <TimelineContent className="max-w-2xl leading-relaxed">
                  {event.body}{" "}
                  {event.href && (
                    <a
                      href={event.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-0.5 font-mono text-xs text-electric hover:underline"
                    >
                      source <ArrowUpRight className="size-3" />
                    </a>
                  )}
                </TimelineContent>
                <TimelineSeparator className="hidden" />
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </Fade>
    </Section>
  );
}
