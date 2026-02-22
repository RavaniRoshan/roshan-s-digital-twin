import { useState } from "react";

const projectTags = ["all", "ai", "web", "tool", "research"] as const;

const projects = [
  {
    title: "Agent-X",
    tags: ["ai", "web"],
    date: "Oct 2024 - Dec 2024",
    description: "AI agent that automates browser tasks using vision-language models. Interacts with websites from plain English instructions, leveraging Python, FastAPI, Playwright, React, and Gemini 2.5.",
    links: [{ label: "Code", href: "https://github.com/RavaniRoshan" }],
  },
  {
    title: "LegacyLens",
    tags: ["ai", "tool"],
    date: "Nov 2024 - Dec 2024",
    description: "The AI Archaeologist. Turn 1M+ lines of legacy spaghetti code into a living dependency map using Gemini 3.0 Pro. Visualize fragility, trace logic, and chat with your monolith.",
    links: [{ label: "Code", href: "https://github.com/RavaniRoshan" }],
  },
  {
    title: "RAG Course Project",
    tags: ["ai", "research"],
    date: "Jun 2024 - Sep 2024",
    description: "Comprehensive RAG course covering theory, production-ready code, and 15 modules—reranking, chunking, embeddings, vector DBs, hybrid search, query optimization, and agentic workflows.",
    links: [{ label: "Code", href: "https://github.com/RavaniRoshan" }],
  },
  {
    title: "AXIOM-ONE",
    tags: ["ai", "research"],
    date: "Aug 2024 - Dec 2024",
    description: "A Research-Grade Reasoning System. A thinking-first research agent that decomposes problems, runs multi-step reasoning loops, validates its own outputs, and exposes the entire thought pipeline.",
    links: [{ label: "Code", href: "https://github.com/RavaniRoshan" }],
  },
];

const certifications = [
  { emoji: "🎓", title: "Building toward Computer Use with Anthropic", org: "Anthropic", date: "Mar 2025" },
  { emoji: "🏢", title: "Software Engineering Job Simulations", org: "EA, Walmart, Goldman Sachs (Forage)", date: "2024" },
  { emoji: "🤖", title: "AI Agents in LangGraph", org: "DeepLearning.AI", date: "2024" },
  { emoji: "🚀", title: "Finetuning Large Language Models", org: "DeepLearning.AI", date: "2024" },
  { emoji: "🎨", title: "Front End Development Libraries", org: "freeCodeCamp", date: "Feb 2025" },
  { emoji: "👁️", title: "Prompt Engineering for Vision Models", org: "DeepLearning.AI", date: "Dec 2024" },
  { emoji: "🧠", title: "Machine Learning with Python", org: "Cognitive Class", date: "Dec 2024" },
  { emoji: "🔗", title: "Blockchain Masterclass", org: "CFTE", date: "" },
];

const WorksPage = () => {
  const [activeTag, setActiveTag] = useState<string>("all");

  const filteredProjects = activeTag === "all"
    ? projects
    : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">my works</h1>

      <p className="text-sm text-foreground/80 mb-2">
        i've built and contributed to multiple AI-powered products, research tools, and open-source projects.
        i don't just solve problems—i create solutions that make the original problem look like it was asking for it.
      </p>
      <p className="text-sm text-foreground/80 mb-8">
        my work can also be found on{" "}
        <a href="https://github.com/RavaniRoshan" target="_blank" rel="noopener noreferrer">github</a> and{" "}
        <a href="https://www.linkedin.com/in/ravani-roshan" target="_blank" rel="noopener noreferrer">linkedin</a>.
      </p>

      {/* Projects */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-foreground">1. featured projects</h2>

        <div className="flex flex-wrap gap-2 mb-6">
          {projectTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`text-xs px-3 py-1 rounded border transition-colors ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-secondary-foreground border-border hover:border-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <div key={project.title} className="border border-border rounded p-4 bg-card">
              <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
              <div className="flex flex-wrap gap-1 mb-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded bg-secondary text-primary">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mb-2">{project.date}</p>
              <p className="text-sm text-foreground/80 mb-3">{project.description}</p>
              <div className="flex gap-2">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1 rounded border border-border bg-secondary text-foreground no-underline hover:border-primary transition-colors"
                  >
                    🐙 {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-foreground">2. certifications</h2>
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div key={cert.title} className="border border-border rounded p-3 bg-card flex items-start gap-3">
              <span className="text-lg flex-shrink-0">{cert.emoji}</span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{cert.title}</p>
                <p className="text-xs text-muted-foreground">
                  {cert.org}{cert.date ? ` · ${cert.date}` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="text-sm text-foreground/80 italic">
        i'm constantly involved in several projects across AI, full-stack engineering, and agentic systems.
        if you're working on something exciting, i'd love to connect!
      </p>
    </div>
  );
};

export default WorksPage;
