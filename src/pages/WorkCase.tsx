import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FadeUp } from "@/components/Reveal";
import { site } from "@/content/site";
import { NotFound } from "./NotFound";

export function WorkCase() {
  const { slug } = useParams();
  const index = site.projects.findIndex((p) => p.slug === slug);
  if (index === -1) return <NotFound />;
  const project = site.projects[index];
  const prev = site.projects[(index - 1 + site.projects.length) % site.projects.length];
  const next = site.projects[(index + 1) % site.projects.length];

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <FadeUp>
        <Button variant="ghost" size="sm" render={<Link to="/works" />}>
          <ArrowLeft className="size-3.5" /> systems index
        </Button>
      </FadeUp>
      <FadeUp delay={0.05}>
        <p className="mt-8 font-mono text-xs tracking-[0.25em] text-electric uppercase">case file</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-2 font-mono text-sm text-electric/90">{project.tagline}</p>
      </FadeUp>
      <FadeUp delay={0.1}>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge variant="outline">{project.language}</Badge>
          <Badge variant="secondary">
            <Star className="size-3" /> {project.stars}
          </Badge>
          {project.license && <Badge variant="secondary">{project.license}</Badge>}
          {project.active && <Badge variant="success">active</Badge>}
          {project.topics.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>
      </FadeUp>
      <FadeUp delay={0.15}>
        <p className="mt-6 text-lg leading-relaxed">{project.description}</p>
      </FadeUp>
      <FadeUp delay={0.2}>
        <ul className="mt-8 space-y-3">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-muted-foreground">
              <span className="text-electric">▸</span> {b}
            </li>
          ))}
        </ul>
      </FadeUp>
      <FadeUp delay={0.25}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button render={<a href={project.href} target="_blank" rel="noreferrer" />}>
            <Github className="size-4" /> repository
          </Button>
          {project.homepage && (
            <Button variant="outline" render={<a href={project.homepage} target="_blank" rel="noreferrer" />}>
              live demo <ArrowUpRight className="size-4" />
            </Button>
          )}
        </div>
      </FadeUp>
      <Separator className="my-12" />
      <nav className="flex items-center justify-between gap-4">
        <Button variant="ghost" render={<Link to={`/works/${prev.slug}`} />}>
          <ArrowLeft className="size-4" /> {prev.title}
        </Button>
        <Button variant="ghost" render={<Link to={`/works/${next.slug}`} />}>
          {next.title} <ArrowRight className="size-4" />
        </Button>
      </nav>
    </article>
  );
}
