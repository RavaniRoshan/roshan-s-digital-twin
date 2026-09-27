import { ArrowUpRight, Printer } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FadeUp } from "@/components/Reveal";
import { site } from "@/content/site";

export function Resume() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <FadeUp className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarImage src={site.profile.avatar} alt={site.profile.name} />
            <AvatarFallback className="font-mono">RR</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-mono text-xs tracking-[0.25em] text-electric uppercase">~/resume</p>
            <h1 className="mt-1 text-4xl font-extrabold tracking-tight">{site.profile.name}</h1>
            <p className="mt-1 font-mono text-xs text-muted-foreground">{site.profile.headline}</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => window.print()}>
          <Printer className="size-4" /> print
        </Button>
      </FadeUp>

      <FadeUp delay={0.05}>
        <div className="mt-8 space-y-3">
          {site.profile.about.map((p) => (
            <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      </FadeUp>

      <Separator className="my-10" />

      <FadeUp>
        <h2 className="font-mono text-xs tracking-[0.25em] text-electric uppercase">experience</h2>
        {site.experience.map((e) => (
          <div key={e.role} className="mt-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-bold">
                {e.role} <span className="font-normal text-muted-foreground">· {e.organization}</span>
              </p>
              <span className="font-mono text-xs text-muted-foreground">{e.period}</span>
            </div>
            <ul className="mt-2 space-y-1.5">
              {e.points.map((pt) => (
                <li key={pt.slice(0, 24)} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-electric">▸</span> {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </FadeUp>

      <Separator className="my-10" />

      <FadeUp>
        <h2 className="font-mono text-xs tracking-[0.25em] text-electric uppercase">education</h2>
        {site.education.map((e) => (
          <div key={e.degree} className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-bold">
              {e.degree} <span className="font-normal text-muted-foreground">· {e.institution}</span>
            </p>
            <span className="font-mono text-xs text-muted-foreground">{e.period}</span>
          </div>
        ))}
      </FadeUp>

      <Separator className="my-10" />

      <FadeUp>
        <h2 className="font-mono text-xs tracking-[0.25em] text-electric uppercase">capabilities</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {site.skillGroups.map((g) => (
            <Card key={g.title}>
              <CardHeader>
                <CardTitle className="font-mono text-xs font-medium text-electric">{g.title}</CardTitle>
                <CardDescription className="flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <Badge key={item} variant="secondary" size="sm">
                      {item}
                    </Badge>
                  ))}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </FadeUp>

      <Separator className="my-10" />

      <FadeUp>
        <h2 className="font-mono text-xs tracking-[0.25em] text-electric uppercase">certifications</h2>
        <div className="mt-4 space-y-0">
          {site.certifications.map((c) => (
            <div key={c.title} className="flex items-baseline justify-between gap-4 border-t py-3 last:border-b">
              <p className="text-sm">
                <span className="font-bold">{c.title}</span>{" "}
                <span className="text-muted-foreground">· {c.issuer}</span>
                {c.href && (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Verify ${c.title}`}
                    className="ml-2 inline-flex items-center text-electric hover:underline"
                  >
                    <ArrowUpRight className="size-3.5" />
                  </a>
                )}
              </p>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">{c.issued}</span>
            </div>
          ))}
        </div>
      </FadeUp>
    </div>
  );
}
