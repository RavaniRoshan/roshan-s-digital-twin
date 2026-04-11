export interface SocialLink {
  label: string;
  href: string;
  brandDomain?: string;
  iconMode?: "brandfetch" | "text";
}

export interface Stat {
  value: string;
  label: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Project {
  title: string;
  period: string;
  description: string;
  longDescription?: string;
  tags: string[];
  href: string;
  featured: boolean;
  highlights?: string[];
  secondaryLink?: ProjectLink;
}

export interface Certification {
  title: string;
  issuer: string;
  issued: string;
  href?: string;
  skills?: string[];
  featured?: boolean;
  issuerDomain?: string;
}

export interface NewsSection {
  heading: string;
  paragraphs?: string[];
  listItems?: string[];
  code?: {
    language: string;
    content: string;
  };
}

export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  featured: boolean;
  contentSections: NewsSection[];
  hrefs: ProjectLink[];
}

export interface UpdateItem {
  date: string;
  text: string;
  href?: string;
  internal?: boolean;
}

export interface SiteContent {
  profile: {
    name: string;
    headline: string;
    location: string;
    intro: string;
    resumeHref: string;
    about: string[];
    currentFocus: string[];
    socials: SocialLink[];
    stats: Stat[];
    skills: SkillGroup[];
    updates: UpdateItem[];
  };
  projects: Project[];
  certifications: Certification[];
  newsPosts: NewsPost[];
}

export const siteContent: SiteContent = {
  profile: {
    name: "roshan ravani",
    headline: "product builder building ai systems and full-stack products",
    location: "ahmedabad, gujarat, india",
    intro:
      "I build AI-native products, developer tools, and web systems that turn complex workflows into something clear, usable, and production-ready.",
    resumeHref: "/resume/roshan-ravani-resume-2026.pdf",
    about: [
      "I am an AI engineer and full-stack developer with a strong product instinct. My work sits at the intersection of agentic systems, retrieval pipelines, developer tooling, and product execution.",
      "Alongside my B.Tech in computer science engineering at Silver Oak University, I work on open-source products, technical community initiatives with GDG Ahmedabad, and practical systems that are meant to ship, scale, and stay legible.",
    ],
    currentFocus: [
      "openjck - a local-first debugger for ai agent loops with timeline traces and failure intelligence",
      "zero-comp - a solar weather intelligence platform for real-time flare prediction and operational risk reduction",
      "commitboy - an automated changelog pipeline that turns raw commits into release-ready notes",
      "product patterns for agentic ai, rag systems, and developer-facing workflows",
    ],
    socials: [
      { label: "github", href: "https://github.com/RavaniRoshan", brandDomain: "github.com", iconMode: "brandfetch" },
      { label: "linkedin", href: "https://www.linkedin.com/in/roshan-ravani-3a79882a3/", brandDomain: "linkedin.com", iconMode: "brandfetch" },
      { label: "x", href: "https://x.com/RoshanAIs", brandDomain: "x.com", iconMode: "brandfetch" },
      { label: "instagram", href: "https://www.instagram.com/ravaniroshan_11/", brandDomain: "instagram.com", iconMode: "brandfetch" },
      { label: "email", href: "mailto:ravaniroshansingh@gmail.com", iconMode: "text" },
    ],
    stats: [
      { value: "1200+", label: "commits" },
      { value: "8", label: "ai models fine-tuned" },
      { value: "3", label: "hackathons won" },
    ],
    skills: [
      {
        title: "product + systems",
        items: ["product strategy", "system architecture", "ux-minded implementation", "developer tooling"],
      },
      {
        title: "ai + agents",
        items: ["agentic ai", "rag", "llm orchestration", "evaluation loops", "prompt design"],
      },
      {
        title: "frontend + backend",
        items: ["react", "next.js", "typescript", "python", "fastapi", "postgresql"],
      },
      {
        title: "cloud + delivery",
        items: ["docker", "aws", "vercel", "supabase", "git", "production docs"],
      },
    ],
    updates: [
      {
        date: "mar 2026",
        text: "openjck v0.2.1 shipped with a live dashboard, trace drill-down, and failure intelligence.",
        href: "/news/openjck",
        internal: true,
      },
      {
        date: "mar 2026",
        text: "completed claude code in action, claude 101, and ai fluency certifications from anthropic.",
      },
      {
        date: "2025-2026",
        text: "continued building zero-comp and commitboy while deepening product work around ai-native systems.",
        href: "/works",
        internal: true,
      },
    ],
  },
  projects: [
    {
      title: "OpenJCK",
      period: "2024 - Present",
      description:
        "Local-first visual debugging for AI agent loops, with trace timelines, root-cause analysis, token tracking, and a zero-config Python plus Node workflow.",
      longDescription:
        "OpenJCK helps developers inspect what an agent did, why it failed, and where recovery broke down without sending traces to the cloud.",
      tags: ["oss", "ai", "product"],
      href: "https://github.com/RavaniRoshan/openjck",
      featured: true,
      highlights: [
        "Python instrumentation plus an npm viewer that share the same local trace store",
        "Failure intelligence engine with root-cause and recovery-point analysis",
        "Designed for raw Python agents and framework-based agent stacks",
      ],
      secondaryLink: {
        label: "read the feature note",
        href: "/news/openjck",
      },
    },
    {
      title: "WinScript MCP",
      period: "2025 - Present",
      description:
        "A Windows-native automation API, packaged as an MCP server, that gives AI agents the same system-level desktop control that AppleScript gives on macOS.",
      longDescription:
        "WinScript is a state-aware, replayable, audited Windows automation server for AI agents. It wraps 4 fragmented Windows automation primitives — UI Automation, COM, Win32, and OCR — into a single MCP server that any agent can call.",
      tags: ["oss", "ai", "product"],
      href: "https://github.com/RavaniRoshan/winscript-mcp",
      featured: true,
      highlights: [
        "Five-layer selector fallback chain for reliable UI automation",
        "State diffing after every action with full audit logs",
        "Workflow recorder and replay with semantic intent layer",
      ],
    },
    {
      title: "Commitboy",
      period: "2024 - Present",
      description:
        "An automated changelog product that turns commit history into polished release notes with Groq-powered summarization and GitHub-native delivery.",
      longDescription:
        "Commitboy removes manual changelog work by parsing commits, summarizing updates, and committing release-ready notes directly into the repo workflow.",
      tags: ["product", "oss"],
      href: "https://github.com/RavaniRoshan/commitboy",
      featured: true,
      highlights: [
        "Built on Next.js 14, Groq, Vercel, and GitHub App workflows",
        "Designed around push-to-main automation",
      ],
    },
    {
      title: "AXiOM-ONE",
      period: "2025 - Present",
      description:
        "A reasoning-first research system that decomposes hard problems, runs structured loops, and exposes intermediate thinking artifacts for auditability.",
      longDescription:
        "AXiOM-ONE is designed for correctness-sensitive tasks where explanation quality, failure detection, and transparent reasoning matter more than conversational polish.",
      tags: ["research", "ai"],
      href: "https://github.com/RavaniRoshan/AXiOM",
      featured: false,
      highlights: [
        "Multi-step reasoning and self-verification loops",
        "Built around research-grade visibility rather than chatbot behavior",
      ],
    },
    {
      title: "Agent-X",
      period: "Oct 2024 - Dec 2024",
      description:
        "Browser-native automation agent that translates natural-language instructions into safe web actions using vision-language models.",
      longDescription:
        "Agent-X focuses on reliable browser execution, transparent actions, and a reusable architecture for repeatable workflows.",
      tags: ["product", "ai"],
      href: "https://github.com/RavaniRoshan/Agent-X",
      featured: false,
      highlights: [
        "Built with Python, FastAPI, Playwright, React, and Gemini 2.5",
        "Focused on web-native execution and safety controls",
      ],
    },
    {
      title: "ZERO-COMP Solar Weather API",
      period: "2024 - Present",
      description:
        "Enterprise-grade solar flare prediction platform powered by the NASA-IBM Surya-1.0 transformer model, built for teams that need timely solar weather intelligence.",
      longDescription:
        "ZERO-COMP combines real-time predictions, dashboard views, API access, and WebSocket delivery for satellite, aviation, and grid operations.",
      tags: ["product", "ai"],
      href: "https://github.com/RavaniRoshan",
      featured: false,
      highlights: [
        "Prediction refreshes every 10 minutes",
        "API, dashboard, and streaming access in one stack",
        "FastAPI, Next.js 14, Supabase, WebSockets, and transformer models",
      ],
    },
    {
      title: "RAG Course Project",
      period: "Jun 2024 - Sep 2024",
      description:
        "A 15-module course project covering chunking, reranking, hybrid search, embeddings, vector databases, query optimization, and agentic RAG workflows.",
      longDescription:
        "The project is structured for developers who want production-oriented retrieval skills rather than only conceptual introductions.",
      tags: ["research", "ai"],
      href: "https://github.com/RavaniRoshan/Rag-course",
      featured: false,
      highlights: [
        "Production-grade RAG patterns and deployment concepts",
        "Designed as an implementation-friendly learning path",
      ],
    },
  ],
  certifications: [
    {
      title: "Claude 101",
      issuer: "Anthropic",
      issued: "Mar 2026",
      featured: true,
      skills: ["anthropic claude"],
      issuerDomain: "anthropic.com",
    },
    {
      title: "AI Fluency Framework & Foundations",
      issuer: "Anthropic",
      issued: "Mar 2026",
      featured: true,
      skills: ["ai fluency"],
      issuerDomain: "anthropic.com",
    },
    {
      title: "AI Fluency for Students",
      issuer: "Anthropic",
      issued: "Mar 2026",
      href: "https://verify.skilljar.com/c/e7nj6fioewnu",
      featured: true,
      skills: ["ai fluency", "anthropic"],
      issuerDomain: "anthropic.com",
    },
    {
      title: "Claude Code in Action",
      issuer: "Anthropic",
      issued: "Mar 2026",
      href: "https://verify.skilljar.com/c/e6gqnx8xn2w5",
      featured: true,
      skills: ["anthropic claude", "developer tools"],
      issuerDomain: "anthropic.com",
    },
    {
      title: "Transformer Models and BERT Model",
      issuer: "Google",
      issued: "Mar 2026",
      featured: true,
      skills: ["transformer models", "bert"],
      issuerDomain: "google.com",
    },
    {
      title: "Responsible AI for Developers: Privacy & Safety",
      issuer: "Google",
      issued: "Jan 2026",
      href: "https://www.skills.google/public_profiles/66247599-bda3-4997-a75c-5146258d420d/badges/21419557",
      skills: ["responsible ai", "privacy"],
      issuerDomain: "google.com",
    },
    {
      title: "Machine Learning Operations (MLOps) for Generative AI",
      issuer: "Google",
      issued: "Dec 2025",
      href: "https://www.skills.google/public_profiles/66247599-bda3-4997-a75c-5146258d420d/badges/21227335",
      skills: ["mlops", "generative ai"],
      issuerDomain: "google.com",
    },
    {
      title: "Building toward Computer Use with Anthropic",
      issuer: "DeepLearning.AI",
      issued: "Mar 2025",
      href: "https://learn.deeplearning.ai/accomplishments/6b5022b3-80b5-401c-9a7d-c407188b103a",
      skills: ["ai", "anthropic", "llm"],
      issuerDomain: "deeplearning.ai",
    },
    {
      title: "AI Agents in LangGraph",
      issuer: "DeepLearning.AI",
      issued: "2024",
      href: "https://learn.deeplearning.ai/accomplishments/ebe94656-8e70-4b8e-afd0-384d7046c9c6",
      skills: ["agents"],
      issuerDomain: "deeplearning.ai",
    },
    {
      title: "Building AI Browser Agents",
      issuer: "DeepLearning.AI",
      issued: "2024",
      href: "https://learn.deeplearning.ai/accomplishments/4ad74d27-d86f-4a31-a9f8-71692b72e2e7",
      skills: ["ai agents"],
      issuerDomain: "deeplearning.ai",
    },
    {
      title: "Finetuning Large Language Models",
      issuer: "DeepLearning.AI",
      issued: "2024",
      href: "https://learn.deeplearning.ai/accomplishments/06e5affd-51ae-4932-bcb4-767f94bc926c",
      skills: ["fine tuning", "llm"],
      issuerDomain: "deeplearning.ai",
    },
    {
      title: "LangChain for LLM Application Development",
      issuer: "DeepLearning.AI",
      issued: "2024",
      href: "https://learn.deeplearning.ai/accomplishments/06d9afa2-4db9-4085-a8e9-b81c1b7dc343",
      skills: ["langchain", "llm"],
      issuerDomain: "deeplearning.ai",
    },
    {
      title: "Agent Communication Protocol (ACP)",
      issuer: "DeepLearning.AI",
      issued: "2024",
      href: "https://learn.deeplearning.ai/accomplishments/4e46f175-9b1d-4605-bd4b-17003928e532",
      skills: ["ai"],
      issuerDomain: "deeplearning.ai",
    },
  ],
  newsPosts: [
    {
      slug: "openjck",
      title: "OpenJCK is the new flagship release on the site",
      date: "Mar 19, 2026",
      summary:
        "OpenJCK is a local-first debugger for AI agent loops that replaces blind logging with structured traces, failure intelligence, and a visual run viewer.",
      featured: true,
      contentSections: [
        {
          heading: "the problem",
          paragraphs: [
            "AI agent debugging still breaks down into guesswork far too often. A run fails deep inside a loop, and you are left stitching together logs, print statements, and partial context to understand what happened.",
            "OpenJCK is built to make that process inspectable. Instead of treating an agent run like a black box, it records the sequence of decisions, tool calls, outputs, failures, and recovery points in a format you can actually inspect.",
          ],
        },
        {
          heading: "what openjck is",
          paragraphs: [
            "OpenJCK pairs a Python instrumentation library with an npm-powered viewer. The Python side captures traces from your agent code, and the viewer reads the same local store to render timelines, trace detail, and failure analysis.",
            "The design principle is simple: keep debugging local, make the failure chain legible, and avoid adding heavy setup just to understand what your own system did.",
          ],
          listItems: [
            "local-first trace storage with no cloud dependency",
            "timeline inspection for steps, tool calls, outputs, and errors",
            "token, cost, and latency visibility for model calls",
            "failure intelligence that identifies root cause and last recovery point",
          ],
        },
        {
          heading: "quick start concept",
          paragraphs: [
            "The product is intentionally small on setup. Instrument the Python agent, run it normally, then open the viewer to inspect the trace.",
          ],
          code: {
            language: "python",
            content:
              "from openjck import trace, trace_llm, trace_tool\n\n@trace(name=\"research_agent\")\ndef run_agent(task: str):\n    response = call_llm([{\"role\": \"user\", \"content\": task}])\n    results = web_search(response.message.content)\n    write_file(\"output.md\", results)\n\n@trace_llm\ndef call_llm(messages: list):\n    ...\n\n@trace_tool\ndef web_search(query: str) -> str:\n    ...",
          },
        },
        {
          heading: "why it matters",
          paragraphs: [
            "Most tooling around LLM observability is either cloud-first, framework-bound, or too heavy for fast local iteration. OpenJCK is positioned around a different workflow: you should be able to debug raw Python agents and framework-based loops without changing how you build.",
            "That makes it useful both as a developer tool and as a product signal. It shows the kind of systems work I care about: practical AI infrastructure that helps people ship with more confidence.",
          ],
        },
        {
          heading: "current release highlights",
          paragraphs: [
            "The current release line adds more than a trace viewer. The recent updates introduced a live dashboard, step drill-down views, persistent storage, and the failure intelligence layer that summarizes why a run became unrecoverable.",
          ],
          listItems: [
            "live dashboard with real-time updates",
            "trace detail view with timeline inspection",
            "agent drill-down page with pattern analysis",
            "sqlite-backed persistence for the npm viewer",
            "mobile-responsive UI and time filters",
          ],
        },
      ],
      hrefs: [
        { label: "github repository", href: "https://github.com/RavaniRoshan/openjck", external: true },
        { label: "documentation site", href: "https://openjck.vercel.app/", external: true },
      ],
    },
  ],
};
