import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { siteContent } from "@/content/siteContent";

const projectTags = ["all", "product", "ai", "oss", "research"] as const;

const WorksPage = () => {
  const [activeTag, setActiveTag] = useState<string>("all");
  const { projects, certifications } = siteContent;

  const filteredProjects =
    activeTag === "all" ? projects : projects.filter((project) => project.tags.includes(activeTag));

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="mb-4 text-2xl font-semibold text-foreground sm:text-3xl">works</h1>

      <p className="mb-2 text-sm leading-7 text-foreground/80">
        This page collects the projects I want the site to point to first, along with the certifications that support the direction of the work.
      </p>
      <p className="mb-8 text-sm leading-7 text-foreground/80">
        The emphasis is on AI-native products, developer tooling, and systems work that ships with clear product intent.
      </p>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-foreground">1. featured projects</h2>

        <div className="mb-6 flex flex-wrap gap-2">
          {projectTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded border px-3 py-1 text-xs transition-colors ${
                activeTag === tag
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary text-secondary-foreground hover:border-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className={`rounded border bg-card p-4 ${
                project.featured ? "border-primary/40" : "border-border"
              }`}
            >
              <h3 className="mb-1 font-semibold text-foreground">{project.title}</h3>
              <div className="mb-2 flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded bg-secondary px-2 py-0.5 text-xs text-primary">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mb-2 text-xs text-muted-foreground">{project.period}</p>
              <p className="mb-3 text-sm leading-7 text-foreground/80">{project.description}</p>
              {project.highlights?.length ? (
                <ul className="mb-4 space-y-2 text-xs leading-6 text-foreground/70">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>- {highlight}</li>
                  ))}
                </ul>
              ) : null}
              <div className="flex flex-wrap gap-2">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-border bg-secondary px-3 py-2 text-xs text-foreground no-underline transition-colors hover:border-primary"
                >
                  view project
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                {project.secondaryLink ? (
                  <Link
                    to={project.secondaryLink.href}
                    className="inline-flex items-center gap-2 rounded border border-border px-3 py-2 text-xs text-foreground no-underline transition-colors hover:border-primary"
                  >
                    {project.secondaryLink.label}
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-foreground">2. certifications</h2>
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className={`flex items-start justify-between gap-4 rounded border bg-card p-4 ${
                cert.featured ? "border-primary/30" : "border-border"
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded border border-border bg-white/90 p-2 shadow-sm">
                    <BrandLogo domain={cert.issuerDomain} label={cert.issuer} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{cert.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {cert.issuer} / {cert.issued}
                    </p>
                  </div>
                </div>
                {cert.skills?.length ? (
                  <p className="mt-2 text-xs text-foreground/65">{cert.skills.join(" / ")}</p>
                ) : null}
              </div>
              {cert.href ? (
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-border px-3 py-2 text-xs text-foreground no-underline transition-colors hover:border-primary"
                >
                  credential
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <p className="text-sm italic text-foreground/80">
        More detailed product notes now live in the news section, starting with the OpenJCK feature.
      </p>
    </div>
  );
};

export default WorksPage;
