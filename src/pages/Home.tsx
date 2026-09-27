import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GridBackdrop } from "@/components/GridBackdrop";
import { ProjectCard } from "@/components/ProjectCard";
import { BlurWords, FadeUp, Reel } from "@/components/Reveal";
import { site } from "@/content/site";

const flagship = site.projects.find((p) => p.slug === "niki") ?? site.projects[0];
const featured = site.projects.filter((p) => p.featured && p.slug !== flagship.slug);

export function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <GridBackdrop />
        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28">
          <FadeUp>
            <p className="flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
              <span className="size-1.5 animate-pulse-glow rounded-full bg-electric" />
              agent status: awake · {site.profile.location}
            </p>
          </FadeUp>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-6xl">
            <Reel
              prefix="i build"
              words={["reliable agents.", "guardrail layers.", "hermetic sandboxes.", "dev infrastructure."]}
            />
          </h1>
          <BlurWords
            text={site.profile.intro}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          />
          <FadeUp delay={0.15} className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" render={<Link to="/works" />}>
              view systems <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" render={<Link to="/log" />}>
              read build log
            </Button>
          </FadeUp>
          <FadeUp delay={0.25}>
            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4">
              {site.profile.stats.map((stat) => (
                <div key={stat.label} className="border-l-2 border-electric/60 pl-4">
                  <dt className="order-2 mt-1 font-mono text-xs text-muted-foreground">{stat.label}</dt>
                  <dd className="order-1 font-mono text-3xl font-bold">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <FadeUp>
          <p className="font-mono text-xs tracking-[0.25em] text-electric uppercase">flagship</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">{flagship.title} — {flagship.tagline}</h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <Card className="mt-6 border-electric/30">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{flagship.language}</Badge>
                <Badge variant="success">active</Badge>
                {flagship.topics.slice(0, 3).map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
              <CardDescription className="text-base text-foreground">{flagship.description}</CardDescription>
            </CardHeader>
            <CardPanel>
              <ul className="space-y-2">
                {flagship.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="text-electric">▸</span> {b}
                  </li>
                ))}
              </ul>
            </CardPanel>
            <CardFooter className="flex flex-wrap gap-3">
              <Button render={<Link to={`/works/${flagship.slug}`} />}>
                open case file <ArrowUpRight className="size-4" />
              </Button>
              <Button variant="outline" render={<a href={flagship.href} target="_blank" rel="noreferrer" />}>
                <Github className="size-4" /> repository
              </Button>
            </CardFooter>
          </Card>
        </FadeUp>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <FadeUp className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] text-electric uppercase">systems index</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">more builds</h2>
          </div>
          <Button variant="ghost" render={<Link to="/works" />}>
            all systems <ArrowRight className="size-4" />
          </Button>
        </FadeUp>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featured.map((p, i) => (
            <FadeUp key={p.slug} delay={i * 0.08}>
              <ProjectCard project={p} />
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <FadeUp>
          <p className="font-mono text-xs tracking-[0.25em] text-electric uppercase">current focus</p>
        </FadeUp>
        <div className="mt-4 space-y-0">
          {site.profile.focus.map((f, i) => (
            <FadeUp key={f} delay={i * 0.06}>
              <div className="flex gap-4 border-t py-4 last:border-b">
                <span className="font-mono text-xs text-electric">0{i + 1}</span>
                <p className="font-mono text-sm">{f}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <FadeUp className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] text-electric uppercase">build log</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">latest signals</h2>
          </div>
          <Button variant="ghost" render={<Link to="/log" />}>
            full log <ArrowRight className="size-4" />
          </Button>
        </FadeUp>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {site.log.slice(0, 3).map((entry, i) => (
            <FadeUp key={`${entry.date}-${i}`} delay={i * 0.08}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="font-mono text-xs font-medium text-electric">{entry.date}</CardTitle>
                  <CardDescription className="text-sm text-foreground">{entry.text}</CardDescription>
                </CardHeader>
              </Card>
            </FadeUp>
          ))}
        </div>
        <Separator className="mt-14" />
        <FadeUp className="flex flex-col items-start justify-between gap-4 py-10 sm:flex-row sm:items-center">
          <p className="max-w-md font-mono text-sm text-muted-foreground">
            building agent systems with reliability as a first-class feature. let's talk.
          </p>
          <Button size="lg" render={<a href="mailto:ravaniroshansingh@gmail.com" />}>
            start a conversation <ArrowUpRight className="size-4" />
          </Button>
        </FadeUp>
      </section>
    </>
  );
}
