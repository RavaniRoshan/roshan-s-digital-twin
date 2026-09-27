export interface SocialLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  language: string;
  stars: number;
  license?: string;
  href: string;
  homepage?: string;
  topics: string[];
  featured: boolean;
  active: boolean;
}

export interface LogEntry {
  date: string;
  text: string;
  href?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  issued: string;
  href?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Site {
  profile: {
    name: string;
    handle: string;
    headline: string;
    location: string;
    intro: string;
    about: string[];
    focus: string[];
    avatar: string;
    socials: SocialLink[];
    stats: Stat[];
  };
  projects: Project[];
  log: LogEntry[];
  certifications: Certification[];
  skillGroups: SkillGroup[];
  education: { degree: string; institution: string; period: string }[];
}

export const site: Site = {
  profile: {
    name: "Ravani Roshan",
    handle: "RavaniRoshan",
    headline: "AI systems builder — autonomous agents, reliability tooling, developer infrastructure",
    location: "Ahmedabad, Gujarat, India",
    intro:
      "I build practical, reliable AI systems: autonomous agents, computer-use automation, and the infrastructure that keeps ambitious systems dependable once they meet real tools, real users, and real-world constraints.",
    about: [
      "I work on autonomous and multi-agent systems for planning, coding, testing, and review — with reliability and containment as first-class features, not afterthoughts.",
      "My stack is Rust, Python, and TypeScript with Docker-based execution environments, spanning agent reliability (budgets, backpressure, retries, circuit breakers, observability) to sandboxed developer tooling.",
      "Alongside my B.Tech in computer science engineering at Silver Oak University, I ship open-source systems and care about useful products, thoughtful design, and safeguards that keep a swarm of agents from becoming a very confident expense report.",
    ],
    focus: [
      "niki — hermetic multi-agent coding system, flagship under active development",
      "backstop — in-process token budgets and guardrails for agent loops",
      "policyctl + skillproof — deterministic policy runtime and proof registry for coding agents",
    ],
    avatar: "https://avatars.githubusercontent.com/u/153442693?v=4",
    socials: [
      { label: "github", href: "https://github.com/RavaniRoshan" },
      { label: "linkedin", href: "https://www.linkedin.com/in/roshan-ravani-3a79882a3/" },
      { label: "x", href: "https://x.com/RoshanAIs" },
      { label: "email", href: "mailto:ravaniroshansingh@gmail.com" },
    ],
    stats: [
      { value: "06", label: "flagship systems" },
      { value: "189", label: "public repos" },
      { value: "03", label: "core languages" },
    ],
  },
  projects: [
    {
      slug: "niki",
      title: "niki",
      tagline: "Hermetic multi-agent coding system",
      description:
        "Isolated AI agents independently plan, code, test, and review in Docker sandboxes, then hand you a reviewable git branch. Fire-and-forget, BYOK, built in Rust.",
      bullets: [
        "Hermetic Docker/Podman sandboxes — agents never touch your host or production",
        "Plan → code → test → review pipeline producing reviewable git branches",
        "Fire-and-forget execution with bring-your-own-key model access",
      ],
      language: "Rust",
      stars: 2,
      license: "Apache-2.0",
      href: "https://github.com/RavaniRoshan/niki",
      homepage: "https://niki-web.pages.dev",
      topics: ["multi-agent", "sandbox", "docker", "rust", "coding-agent", "byok"],
      featured: true,
      active: true,
    },
    {
      slug: "backstop",
      title: "backstop",
      tagline: "AI SDK reliability layer",
      description:
        "Stop agent loops from burning your budget — in-process token budgets for OpenAI and Anthropic, with backpressure, retries, circuit breaking, and metrics.",
      bullets: [
        "In-process token budgets that brake runaway loops before cost explodes",
        "Backpressure, retries, and circuit breakers for OpenAI and Anthropic workflows",
        "Metrics surface so spend and failure modes stay legible",
      ],
      language: "Python",
      stars: 0,
      license: "MIT",
      href: "https://github.com/RavaniRoshan/backstop",
      homepage: "https://backinstop.vercel.app",
      topics: ["guardrails", "budget", "llm", "python", "openai", "anthropic"],
      featured: true,
      active: true,
    },
    {
      slug: "phantom",
      title: "phantom",
      tagline: "Background computer-use agent for Windows",
      description:
        "A Rust-powered Windows automation agent built to work quietly in the background — the invisible computer-use layer for the desktop.",
      bullets: [
        "Background-mode operation — automation without taking over the machine",
        "Native Windows control primitives under an agent-friendly interface",
        "Built in Rust for a small, fast, dependable footprint",
      ],
      language: "Rust",
      stars: 0,
      license: "Apache-2.0",
      href: "https://github.com/RavaniRoshan/phantom",
      topics: ["computer-use", "automation", "windows", "rust"],
      featured: true,
      active: false,
    },
    {
      slug: "policyctl",
      title: "policyctl",
      tagline: "Deterministic policy runtime for coding agents",
      description:
        "A deterministic policy runtime that sits between the agent and your codebase — provider-agnostic guardrails for AI coding tools.",
      bullets: [
        "Deterministic policy checks between agent intent and code mutation",
        "Provider-agnostic — one runtime across coding agents and models",
        "Policy-as-code approach to AI safety at the tool layer",
      ],
      language: "TypeScript",
      stars: 1,
      license: "MIT",
      href: "https://github.com/RavaniRoshan/policyctl",
      homepage: "https://policyctl-web.pages.dev/",
      topics: ["policy-engine", "ai-safety", "ai-governance", "typescript"],
      featured: false,
      active: true,
    },
    {
      slug: "skillproof",
      title: "skillproof",
      tagline: "Open registry of proof for agent skills",
      description:
        "SkillProof is an open registry of proof for agent skills — verifiable evidence that a skill does what it claims, for an ecosystem learning to trust agents.",
      bullets: [
        "Open registry model — anyone can publish and verify skill proofs",
        "Evidence-first trust for the agent skills ecosystem",
        "Companion to policy-gated execution: prove it, then run it",
      ],
      language: "TypeScript",
      stars: 0,
      license: "MIT",
      href: "https://github.com/RavaniRoshan/skillproof",
      homepage: "https://skillproof-psi.vercel.app",
      topics: ["skills", "skill-management", "ai-safety", "typescript"],
      featured: false,
      active: true,
    },
    {
      slug: "forge-cpu",
      title: "forge-cpu",
      tagline: "SOTA CPU MoE small-batch prefill in Zig",
      description:
        "Pushing CPU inference forward: state-of-the-art mixture-of-experts small-batch prefill in Zig — beating llama.cpp where Zig SOTA loses.",
      bullets: [
        "MoE small-batch prefill kernels hand-tuned for CPU",
        "Zig implementation chasing SOTA where existing runtimes fall short",
        "Systems-level performance work underpinning practical local inference",
      ],
      language: "Zig",
      stars: 0,
      href: "https://github.com/RavaniRoshan/forge-cpu",
      topics: ["inference", "moe", "zig", "performance"],
      featured: false,
      active: false,
    },
  ],
  log: [
    {
      date: "sep 2026",
      text: "niki under active development — hermetic sandbox pipeline and reviewable-branch flow taking shape.",
      href: "https://github.com/RavaniRoshan/niki",
    },
    {
      date: "sep 2026",
      text: "backstop guardrails iterating — token budgets for OpenAI and Anthropic agent loops.",
      href: "https://github.com/RavaniRoshan/backstop",
    },
    {
      date: "sep 2026",
      text: "skillproof launched — open registry of proof for agent skills.",
      href: "https://github.com/RavaniRoshan/skillproof",
    },
    {
      date: "sep 2026",
      text: "policyctl policy runtime evolving — deterministic checks between agents and codebases.",
      href: "https://github.com/RavaniRoshan/policyctl",
    },
    {
      date: "sep 2026",
      text: "forge-cpu experiment — SOTA CPU MoE small-batch prefill in Zig.",
      href: "https://github.com/RavaniRoshan/forge-cpu",
    },
    {
      date: "jul 2026",
      text: "phantom — background computer-use agent for Windows.",
      href: "https://github.com/RavaniRoshan/phantom",
    },
  ],
  certifications: [
    { title: "Claude Code in Action", issuer: "Anthropic", issued: "Mar 2026", href: "https://verify.skilljar.com/c/e6gqnx8xn2w5" },
    { title: "Claude 101", issuer: "Anthropic", issued: "Mar 2026" },
    { title: "AI Fluency Framework & Foundations", issuer: "Anthropic", issued: "Mar 2026" },
    {
      title: "Transformer Models and BERT Model",
      issuer: "Google",
      issued: "Mar 2026",
    },
    {
      title: "Responsible AI for Developers: Privacy & Safety",
      issuer: "Google",
      issued: "Jan 2026",
      href: "https://www.skills.google/public_profiles/66247599-bda3-4997-a75c-5146258d420d/badges/21419557",
    },
    {
      title: "Machine Learning Operations (MLOps) for Generative AI",
      issuer: "Google",
      issued: "Dec 2025",
      href: "https://www.skills.google/public_profiles/66247599-bda3-4997-a75c-5146258d420d/badges/21227335",
    },
    {
      title: "Building toward Computer Use with Anthropic",
      issuer: "DeepLearning.AI",
      issued: "Mar 2025",
      href: "https://learn.deeplearning.ai/accomplishments/6b5022b3-80b5-401c-9a7d-c407188b103a",
    },
    {
      title: "AI Agents in LangGraph",
      issuer: "DeepLearning.AI",
      issued: "2024",
      href: "https://learn.deeplearning.ai/accomplishments/ebe94656-8e70-4b8e-afd0-384d7046c9c6",
    },
    {
      title: "Finetuning Large Language Models",
      issuer: "DeepLearning.AI",
      issued: "2024",
      href: "https://learn.deeplearning.ai/accomplishments/06d9afa2-51ae-4932-bcb4-767f94bc926c",
    },
  ],
  skillGroups: [
    { title: "languages", items: ["Rust", "Python", "TypeScript", "JavaScript", "C++", "Zig"] },
    { title: "agents & reliability", items: ["multi-agent orchestration", "token budgets", "backpressure", "retries", "circuit breakers", "observability", "policy runtimes"] },
    { title: "ai platforms", items: ["OpenAI", "Anthropic", "LangChain", "Hugging Face", "LLM evaluation", "agent memory"] },
    { title: "infra & product", items: ["Docker", "sandboxed execution", "React", "Next.js", "Vite", "Tailwind CSS"] },
  ],
  education: [
    {
      degree: "B.Tech, Computer Science Engineering",
      institution: "Silver Oak University, Ahmedabad",
      period: "2023 — Present",
    },
  ],
};
