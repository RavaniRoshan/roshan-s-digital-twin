export interface SocialLink {
  label: string;
  handle: string;
  href: string;
}

export interface Telemetry {
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  status: "nominal" | "active" | "standby" | "degraded";
}

export interface SystemNode {
  slug: string;
  codename: string;
  tagline: string;
  summary: string;
  role: string;
  language: string;
  runtime: string;
  status: "active" | "stable" | "archived" | "research";
  stars: number;
  license?: string;
  href: string;
  homepage?: string;
  topics: string[];
  capabilities: string[];
  problem: string;
  approach: string[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  body: string;
  status: "shipped" | "active" | "killed";
  href?: string;
}

export interface Credential {
  title: string;
  issuer: string;
  issued: string;
  href?: string;
}

export interface SkillMatrix {
  track: string;
  items: { name: string; level: "core" | "proficient" | "working" }[];
}

export const site = {
  identity: {
    name: "Ravani Roshan",
    handle: "RavaniRoshan",
    monogram: "RR",
    role: "AI systems builder",
    discipline: "autonomous agents · reliability · developer infrastructure",
    location: "Ahmedabad, IN",
    timezone: "Asia/Kolkata",
    shell: "ravani@agentforge:~$",
    summary:
      "I build autonomous agent systems, computer-use automation, and the infrastructure that keeps them dependable once they meet real tools, real users, and real-world constraints.",
    statement:
      "Reliability and containment are first-class features. A swarm of agents should never become a very confident expense report.",
    socials: [
      { label: "github", handle: "RavaniRoshan", href: "https://github.com/RavaniRoshan" },
      { label: "x", handle: "@RoshanAIs", href: "https://x.com/RoshanAIs" },
      {
        label: "linkedin",
        handle: "in/roshan-ravani",
        href: "https://www.linkedin.com/in/roshan-ravani-3a79882a3/",
      },
      { label: "email", handle: "ravaniroshansingh", href: "mailto:ravaniroshansingh@gmail.com" },
    ] satisfies SocialLink[],
  },

  telemetry: [
    { label: "public repos", value: "189", status: "nominal" },
    { label: "flagship systems", value: "06", status: "active" },
    { label: "core languages", value: "03", delta: "rust · py · ts", status: "nominal" },
    { label: "pinned stars", value: "03", status: "standby" },
  ] satisfies Telemetry[],

  systems: [
    {
      slug: "niki",
      codename: "niki",
      tagline: "hermetic multi-agent coding system",
      summary:
        "Isolated agents independently plan, code, test, and review inside Docker sandboxes, then hand you a reviewable git branch.",
      role: "flagship",
      language: "Rust",
      runtime: "docker · podman",
      status: "active",
      stars: 2,
      license: "Apache-2.0",
      href: "https://github.com/RavaniRoshan/niki",
      homepage: "https://niki-web.pages.dev",
      topics: ["multi-agent", "sandbox", "coding-agent", "byok", "rust"],
      capabilities: [
        "Hermetic sandboxes — agents never touch the host or production",
        "Plan → code → test → review pipeline emitting reviewable branches",
        "Fire-and-forget execution with bring-your-own-key model access",
      ],
      problem:
        "Multi-agent coding tools usually grant every agent the same ambient authority on one machine. A single mis-planned agent can read the wrong secrets, clobber unrelated work, or burn a budget on a loop that will never converge.",
      approach: [
        "Each agent runs in its own disposable container with an explicit, minimal capability set.",
        "Agents hand back git branches, not direct writes — a human or a reviewer merges.",
        "BYOK model access keeps spend attributable to a single run.",
      ],
    },
    {
      slug: "backstop",
      codename: "backstop",
      tagline: "ai sdk reliability layer",
      summary:
        "In-process token budgets, backpressure, retries, and circuit breakers that brake agent loops before cost, rate limits, or chaos take the wheel.",
      role: "reliability",
      language: "Python",
      runtime: "openai · anthropic",
      status: "active",
      stars: 0,
      license: "MIT",
      href: "https://github.com/RavaniRoshan/backstop",
      homepage: "https://backinstop.vercel.app",
      topics: ["guardrails", "budget", "llm", "openai", "anthropic"],
      capabilities: [
        "Token budgets enforced in-process, not by hope",
        "Backpressure, retry policy, and circuit breaking per provider",
        "Metrics surface so spend and failure modes stay legible",
      ],
      problem:
        "An agent loop that retries on a rate limit is a financial instrument pointed at your own account. Most guardrails live outside the process, where they cannot see the loop that is actually spinning.",
      approach: [
        "Budgets enforced at the call site, inside the same process as the agent.",
        "Circuit breakers trip on repeated provider failure instead of hammering it.",
        "Provider-agnostic so one policy layer covers OpenAI and Anthropic.",
      ],
    },
    {
      slug: "policyctl",
      codename: "policyctl",
      tagline: "deterministic policy runtime",
      summary:
        "A provider-agnostic deterministic policy runtime that sits between the agent and your codebase.",
      role: "governance",
      language: "TypeScript",
      runtime: "node",
      status: "active",
      stars: 1,
      license: "MIT",
      href: "https://github.com/RavaniRoshan/policyctl",
      homepage: "https://policyctl-web.pages.dev/",
      topics: ["policy-engine", "ai-safety", "ai-governance", "typescript"],
      capabilities: [
        "Deterministic checks between agent intent and code mutation",
        "Provider-agnostic — one runtime across agents and models",
        "Policy-as-code for the tool layer, not just the prompt",
      ],
      problem:
        "Prompt-level instructions tell an agent what it should do. Nothing stops it. Policy has to be a deterministic layer the agent cannot talk its way past.",
      approach: [
        "Policies evaluate as code, so the same rule applies to any model or provider.",
        "The runtime sits on the mutation path, not in the conversation.",
        "Rules are reviewable, versionable, and testable like any other code.",
      ],
    },
    {
      slug: "skillproof",
      codename: "skillproof",
      tagline: "open registry of proof for agent skills",
      summary:
        "An open registry where agent skills carry verifiable evidence of what they actually do.",
      role: "governance",
      language: "TypeScript",
      runtime: "node",
      status: "active",
      stars: 0,
      license: "MIT",
      href: "https://github.com/RavaniRoshan/skillproof",
      homepage: "https://skillproof-psi.vercel.app",
      topics: ["skills", "skill-management", "ai-safety", "typescript"],
      capabilities: [
        "Open registry model — anyone can publish and verify skill proofs",
        "Evidence-first trust for a skills ecosystem learning to self-police",
        "Pairs with policy-gated execution: prove it, then let it run",
      ],
      problem:
        "Agent skills are distributed as text and trusted on vibes. There is no shared, checkable answer to whether a skill does what its description claims.",
      approach: [
        "Proofs are published openly so anyone can audit or dispute them.",
        "Verification is decoupled from authorship.",
        "Complements policyctl — evidence before permission.",
      ],
    },
    {
      slug: "phantom",
      codename: "phantom",
      tagline: "background computer-use agent for windows",
      summary:
        "A Rust-powered Windows automation agent built to work quietly in the background rather than take over the machine.",
      role: "automation",
      language: "Rust",
      runtime: "windows · uia",
      status: "stable",
      stars: 0,
      license: "Apache-2.0",
      href: "https://github.com/RavaniRoshan/phantom",
      topics: ["computer-use", "automation", "windows", "rust"],
      capabilities: [
        "Background-mode operation without hijacking the desktop",
        "Native Windows control primitives behind an agent-friendly interface",
        "Small, fast, dependable Rust footprint",
      ],
      problem:
        "Most desktop automation visibly takes the machine over — the cursor moves, windows steal focus, and you cannot use your own computer while it works.",
      approach: [
        "Operate on background primitives instead of synthetic input.",
        "Keep the resident footprint small enough to leave running.",
        "Expose actions as discrete, auditable steps.",
      ],
    },
    {
      slug: "forge-cpu",
      codename: "forge-cpu",
      tagline: "sota cpu moe small-batch prefill in zig",
      summary:
        "Pushing CPU inference forward: state-of-the-art mixture-of-experts small-batch prefill in Zig, beating llama.cpp where Zig SOTA loses.",
      role: "research",
      language: "Zig",
      runtime: "cpu · simd",
      status: "research",
      stars: 0,
      href: "https://github.com/RavaniRoshan/forge-cpu",
      topics: ["inference", "moe", "zig", "performance"],
      capabilities: [
        "MoE small-batch prefill kernels tuned specifically for CPU",
        "Zig implementation chasing SOTA where existing runtimes fall short",
        "Systems work underpinning practical local inference",
      ],
      problem:
        "Local inference is the only way to keep agent workloads private, but CPU throughput is the bottleneck for the small-batch prefill that interactive agents actually generate.",
      approach: [
        "Hand-write the prefill path rather than generalising a training-oriented kernel.",
        "Target small batches, which is the interactive-agent regime.",
        "Beat a known baseline on its own benchmark before claiming anything.",
      ],
    },
  ] satisfies SystemNode[],

  timeline: [
    {
      id: "t1",
      date: "SEP 2026",
      title: "skillproof — open registry of proof for agent skills",
      body: "Launched the registry: agent skills publish verifiable evidence of what they do, so the ecosystem can audit before it trusts.",
      status: "shipped",
      href: "https://github.com/RavaniRoshan/skillproof",
    },
    {
      id: "t2",
      date: "SEP 2026",
      title: "niki — hermetic sandbox pipeline taking shape",
      body: "Isolated plan, code, test, and review agents running in disposable containers and returning reviewable git branches instead of touching the host.",
      status: "active",
      href: "https://github.com/RavaniRoshan/niki",
    },
    {
      id: "t3",
      date: "SEP 2026",
      title: "backstop — budgets enforced in-process",
      body: "Token budgets, backpressure, retries, and circuit breakers wired directly into the OpenAI and Anthropic call path so a runaway loop trips a breaker instead of a billing alert.",
      status: "active",
      href: "https://github.com/RavaniRoshan/backstop",
    },
    {
      id: "t4",
      date: "SEP 2026",
      title: "policyctl — deterministic policy runtime",
      body: "Moved policy out of the prompt and onto the mutation path, where it evaluates as reviewable code and cannot be argued with by a model.",
      status: "active",
      href: "https://github.com/RavaniRoshan/policyctl",
    },
    {
      id: "t5",
      date: "SEP 2026",
      title: "forge-cpu — zig moe prefill experiment",
      body: "Started benchmarking hand-written mixture-of-experts small-batch prefill kernels against llama.cpp on CPU.",
      status: "active",
      href: "https://github.com/RavaniRoshan/forge-cpu",
    },
    {
      id: "t6",
      date: "JUL 2026",
      title: "phantom — background computer-use agent",
      body: "Shipped the Windows automation agent that works on background primitives instead of hijacking the desktop with synthetic input.",
      status: "shipped",
      href: "https://github.com/RavaniRoshan/phantom",
    },
  ] satisfies TimelineEvent[],

  skills: [
    {
      track: "languages",
      items: [
        { name: "Rust", level: "core" },
        { name: "Python", level: "core" },
        { name: "TypeScript", level: "core" },
        { name: "Zig", level: "working" },
        { name: "C++", level: "working" },
      ],
    },
    {
      track: "agent reliability",
      items: [
        { name: "multi-agent orchestration", level: "core" },
        { name: "token budgets", level: "core" },
        { name: "circuit breakers", level: "core" },
        { name: "sandboxed execution", level: "proficient" },
        { name: "observability", level: "proficient" },
      ],
    },
    {
      track: "ai platforms",
      items: [
        { name: "Anthropic", level: "core" },
        { name: "OpenAI", level: "core" },
        { name: "LLM evaluation", level: "proficient" },
        { name: "Hugging Face", level: "proficient" },
        { name: "agent memory", level: "working" },
      ],
    },
    {
      track: "infrastructure",
      items: [
        { name: "Docker", level: "core" },
        { name: "Linux", level: "proficient" },
        { name: "CI/CD", level: "proficient" },
        { name: "React", level: "proficient" },
        { name: "Tailwind", level: "proficient" },
      ],
    },
  ] satisfies SkillMatrix[],

  credentials: [
    { title: "Claude Code in Action", issuer: "Anthropic", issued: "MAR 2026", href: "https://verify.skilljar.com/c/e6gqnx8xn2w5" },
    { title: "Claude 101", issuer: "Anthropic", issued: "MAR 2026" },
    { title: "AI Fluency Framework & Foundations", issuer: "Anthropic", issued: "MAR 2026" },
    { title: "Transformer Models and BERT", issuer: "Google", issued: "MAR 2026" },
    {
      title: "Responsible AI: Privacy & Safety",
      issuer: "Google",
      issued: "JAN 2026",
      href: "https://www.skills.google/public_profiles/66247599-bda3-4997-a75c-5146258d420d/badges/21419557",
    },
    {
      title: "MLOps for Generative AI",
      issuer: "Google",
      issued: "DEC 2025",
      href: "https://www.skills.google/public_profiles/66247599-bda3-4997-a75c-5146258d420d/badges/21227335",
    },
    {
      title: "Computer Use with Anthropic",
      issuer: "DeepLearning.AI",
      issued: "MAR 2025",
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
  ] satisfies Credential[],

  education: [
    {
      degree: "B.Tech — Computer Science Engineering",
      institution: "Silver Oak University, Ahmedabad",
      period: "2023 — PRESENT",
    },
  ],
} as const;

export type System = (typeof site.systems)[number];
