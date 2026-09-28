import { site } from "./src/content/site";

const origin = "https://ravani-roshan.pages.dev";

/** One canonical markdown document per system, plus the two llms indexes. */
function systemDoc(slug: string): string {
  const s = site.systems.find((x) => x.slug === slug);
  if (!s) return "";
  return [
    `# ${s.codename}`,
    "",
    `${s.tagline}`,
    "",
    s.summary,
    "",
    "## metadata",
    "",
    `- status: ${s.status}`,
    `- role: ${s.role}`,
    `- language: ${s.language}`,
    `- runtime: ${s.runtime}`,
    ...(s.license ? [`- license: ${s.license}`] : []),
    `- stars: ${s.stars}`,
    `- topics: ${s.topics.join(", ")}`,
    `- repository: ${s.href}`,
    ...(s.homepage ? [`- homepage: ${s.homepage}`] : []),
    `- page: ${origin}/s/${s.slug}`,
    "",
    "## the problem",
    "",
    s.problem,
    "",
    "## the approach",
    "",
    ...s.approach.map((a) => `- ${a}`),
    "",
    "## capabilities",
    "",
    ...s.capabilities.map((c) => `- ${c}`),
    "",
  ].join("\n");
}

function fullDoc(): string {
  const i = site.identity;
  return [
    `# ${i.name}`,
    "",
    `> ${i.role} — ${i.discipline}`,
    "",
    `Location: ${i.location} (${i.timezone})`,
    "",
    "## summary",
    "",
    i.summary,
    "",
    "## background",
    "",
    ...i.bio.map((p) => `${p}\n`),
    `> ${i.statement}`,
    "",
    "## systems",
    "",
    ...site.systems.map((s) => {
      const a = s.approach;
      return [
        `### ${s.codename} — ${s.tagline}`,
        "",
        s.summary,
        "",
        `- status: ${s.status} · language: ${s.language} · runtime: ${s.runtime}`,
        ...(s.license ? [`- license: ${s.license}`] : []),
        `- stars: ${s.stars} · topics: ${s.topics.join(", ")}`,
        `- repository: ${s.href}`,
        ...(s.homepage ? [`- homepage: ${s.homepage}`] : []),
        `- detail: ${origin}/s/${s.slug}`,
        "",
        "**the problem.** " + s.problem,
        "",
        "**the approach.**",
        ...a.map((x) => `- ${x}`),
        "",
        "**capabilities.**",
        ...s.capabilities.map((c) => `- ${c}`),
        "",
      ].join("\n");
    }),
    "## capabilities",
    "",
    ...site.skills.map((t) => `### ${t.track}\n\n${t.items.map((x) => `- ${x.name} (${x.level})`).join("\n")}\n`),
    "## education",
    "",
    ...site.education.map((e) => `- **${e.degree}**, ${e.institution} (${e.period})`),
    "",
    "## credentials",
    "",
    ...site.credentials.map((c) => `- ${c.title} — ${c.issuer}, ${c.issued}${c.href ? ` (${c.href})` : ""}`),
    "",
    "## build log",
    "",
    ...site.timeline.map((t) => `- **${t.date}** — ${t.title}: ${t.body}`),
    "",
    "## contact",
    "",
    ...i.socials.map((s) => `- ${s.label}: ${s.href}`),
    "",
  ].join("\n");
}

function indexDoc(): string {
  const i = site.identity;
  return [
    `# ${i.name}`,
    "",
    `> ${i.role} — ${i.discipline}`,
    "",
    i.summary,
    "",
    "Single-column personal site. Autonomous agent systems, hermetic sandboxes,",
    "token budgets, deterministic policy runtimes, and local inference.",
    "",
    "## pages",
    "",
    `- [${origin}/](${origin}/) — index: position, rack, telemetry, capabilities, credentials, contact`,
    ...site.systems.map(
      (s) => `- [${origin}/s/${s.slug}](${origin}/s/${s.slug}) — ${s.codename}: ${s.tagline} (${s.status})`,
    ),
    "",
    "## markdown",
    "",
    "- Full text: [/llms-full.txt](/llms-full.txt)",
    ...site.systems.map((s) => `- ${s.codename}: [/${`md/${s.slug}.md`}](/md/${s.slug}.md)`),
    "",
    "## systems",
    "",
    ...site.systems.map(
      (s) =>
        `- **${s.codename}** — ${s.tagline}. ${s.language}, ${s.runtime}, ${s.status}. [repo](${s.href})${s.homepage ? ` · [live](${s.homepage})` : ""}`,
    ),
    "",
    "## optional",
    "",
    `- [github](https://github.com/${i.handle})`,
    ...i.socials
      .filter((s) => s.label !== "github")
      .map((s) => `- [${s.label}](${s.href})`),
    "",
  ].join("\n");
}

/** Emits llms.txt, llms-full.txt, and a markdown twin per system at build time. */
export function llmsPlugin() {
  return {
    name: "rr-llms-files",
    apply: "build" as const,
    generateBundle(this: { emitFile: (f: { type: "asset"; fileName: string; source: string }) => void }) {
      const files: Record<string, string> = {
        "llms.txt": indexDoc(),
        "llms-full.txt": fullDoc(),
      };
      for (const s of site.systems) {
        files[`md/${s.slug}.md`] = systemDoc(s.slug);
      }
      for (const [fileName, source] of Object.entries(files)) {
        this.emitFile({ type: "asset", fileName, source });
      }
    },
  };
}
