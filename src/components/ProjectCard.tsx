import { Link } from "react-router-dom";
import { ArrowUpRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@/components/ui/card";
import type { Project } from "@/content/site";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group h-full transition-colors hover:border-electric/50">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" size="sm">
            {project.language}
          </Badge>
          <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
            <Star className="size-3" /> {project.stars}
            {project.active && (
              <span className="ml-2 size-1.5 animate-pulse-glow rounded-full bg-electric" title="active" />
            )}
          </span>
        </div>
        <CardTitle className="text-xl">
          <Link to={`/works/${project.slug}`} className="transition-colors group-hover:text-electric">
            {project.title}
          </Link>
        </CardTitle>
        <CardDescription className="font-mono text-xs text-electric/80">{project.tagline}</CardDescription>
      </CardHeader>
      <CardPanel>
        <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.topics.slice(0, 4).map((topic) => (
            <Badge key={topic} variant="secondary" size="sm">
              {topic}
            </Badge>
          ))}
        </div>
      </CardPanel>
      <CardFooter>
        <Button variant="ghost" size="sm" render={<Link to={`/works/${project.slug}`} />}>
          open case file <ArrowUpRight className="size-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
