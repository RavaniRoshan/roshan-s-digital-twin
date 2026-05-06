import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { siteContent } from "@/content/siteContent";
import { ExternalLink, Moon, Sun } from "lucide-react";

const copyToClipboard = (text: string) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for older browsers
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  return new Promise((resolve, reject) => {
    if (document.execCommand("copy")) {
      resolve(undefined);
    } else {
      reject(new Error("copy failed"));
    }
    textArea.remove();
  });
};

const ResumePage = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // State
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [lockedTag, setLockedTag] = useState<string | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [focusedProject, setFocusedProject] = useState<string | null>(null);

  // Derived state
  const currentTag = lockedTag || activeTag;

  const handleCopy = async (text: string, itemLabel: string) => {
    try {
      await copyToClipboard(text);
      setCopiedItem(itemLabel);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleRawExport = async () => {
    const raw = generateRawMarkdown();
    try {
      await copyToClipboard(raw);
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleTagClick = (tag: string) => {
    if (lockedTag === tag) {
      setLockedTag(null);
      setActiveTag(null);
    } else {
      setLockedTag(tag);
      setActiveTag(null);
    }
  };

  const handleTagHover = (tag: string | null) => {
    if (!lockedTag) {
      setActiveTag(tag);
    }
  };

  const getProjectOpacity = (projectTitle: string) => {
    if (!currentTag) return "";
    const project = siteContent.projects.find(p => p.title === projectTitle);
    if (!project) return "";
    return project.resumeTags?.includes(currentTag)
      ? ""
      : "opacity-30 grayscale transition-all duration-300";
  };

  const checkTagHighlight = (tags: string[]) => {
    if (!currentTag) return "";
    return tags.includes(currentTag) ? "bg-secondary font-semibold" : "";
  };

  const generateRawMarkdown = () => {
    const p = siteContent.profile;
    const edu = siteContent.education[0];
    const exp = siteContent.experience[0];
    const skills = siteContent.skillCategories.map(cat =>
      `${cat.name}: ${cat.items.join(", ")}`
    ).join("\n");
    const projects = siteContent.projects.map(proj => `
**${proj.title}** (${proj.period})
${proj.description}
${proj.highlights?.map(h => `- ${h}`).join("\n") || ""}
`.trim()).join("\n\n");

    const phone = "+91 91060 95375";
    const email = "ravaniroshansingh@gmail.com";
    const github = "https://github.com/RavaniRoshan";
    const summary = "Computer Science Engineering undergraduate specialising in agentic AI, LLM systems, and production-grade full-stack infrastructure.";

    return `# Ravani Roshan
AI Engineer • Full-Stack Developer • OSS Builder
${p.location} • ${phone} • ${email} • GitHub: ${github}

## SUMMARY
${summary}

## EDUCATION
**${edu.degree}** | ${edu.period}
${edu.institution} | CGPA: ${edu.gpa}

## EXPERIENCE
**${exp.role}** | ${exp.period}
${exp.organization}
${exp.points.map(p => `- ${p}`).join("\n")}

## PROJECTS
${projects}

## SKILLS
${skills}
`;
  };

  const askAI = (query: string) => ({
    gpt: `https://chatgpt.com/?q=${encodeURIComponent(query)}`,
    gemini: `https://gemini.google.com/app?q=${encodeURIComponent(query)}`,
  });

  return (
    <div className="min-h-screen py-8 md:py-12 px-4 font-serif bg-[#f5f5f5] print:bg-white dark:bg-[#111111]">
      <div className="max-w-[850px] mx-auto bg-white border border-gray-200 shadow-sm p-8 md:p-16 text-[15px] leading-relaxed relative transition-colors duration-300 overflow-hidden print:max-w-none print:m-0 print:border-0 print:p-0 dark:bg-[#1a1a1a] dark:border-neutral-800 dark:shadow-neutral-900/50">

        {/* Top Right Controls */}
        <div className="absolute top-6 right-6 md:right-12 flex gap-4 text-xs font-mono tracking-wider opacity-40 hover:opacity-100 transition-opacity z-10 print:hidden">
          <button
            onClick={handleRawExport}
            className="text-gray-900 dark:text-gray-300 hover:underline"
          >
            {copiedRaw ? "[Copied!]" : "[raw]"}
          </button>
          <button
            onClick={toggleTheme}
            className="text-gray-900 dark:text-gray-300 hover:underline"
          >
            {isDark ? "[☀ Light]" : "[☾ Dark]"}
          </button>
        </div>

        {/* Header */}
        <header className="text-center mb-8 group">
          <h1 className="text-3xl font-bold uppercase tracking-wide mb-1 text-black dark:text-white print:text-black">
            Ravani Roshan
          </h1>

          {/* Ask AI Links */}
          <div className="h-5 flex justify-center mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-tight text-gray-500 dark:text-neutral-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 print:hidden">
              <span className="opacity-60">↳ Ask AI:</span>
              <a
                href={askAI('Search the web for Ravani Roshan GitHub profile').gpt}
                target="_blank"
                rel="noreferrer"
                className="text-gray-900 dark:text-gray-300 hover:underline"
                title="Ask ChatGPT"
              >
                ChatGPT
              </a>
              <span className="opacity-40">|</span>
              <a
                href={askAI('Search the web for Ravani Roshan GitHub profile').gemini}
                target="_blank"
                rel="noreferrer"
                className="text-gray-900 dark:text-gray-300 hover:underline"
                title="Ask Gemini"
              >
                Gemini
              </a>
            </span>
          </div>

          <p className="text-sm italic mb-3 text-gray-900 dark:text-gray-300">
            AI Engineer&nbsp;&bull;&nbsp; Full-Stack Developer&nbsp;&bull;&nbsp; OSS Builder
          </p>
          <div className="text-sm flex flex-wrap justify-center gap-2 items-center text-gray-900 dark:text-gray-300">
            <span>{siteContent.profile.location}</span>
            <span>&bull;</span>
            <button
              onClick={() => handleCopy("+91 91060 95375", "phone")}
              className="border-b border-transparent hover:border-current transition-colors print:border-none cursor-pointer"
            >
              {copiedItem === "phone" ? "[Copied!]" : "+91 91060 95375"}
            </button>
            <span>&bull;</span>
            <button
              onClick={() => handleCopy("ravaniroshansingh@gmail.com", "email")}
              className="border-b border-transparent hover:border-current transition-colors print:border-none cursor-pointer"
            >
              {copiedItem === "email" ? "[Copied!]" : "ravaniroshansingh@gmail.com"}
            </button>
            <span>&bull;</span>
            <a
              href="https://github.com/RavaniRoshan"
              target="_blank"
              rel="noreferrer"
              className="hover:underline text-black dark:text-white print:text-black"
            >
              github.com/RavaniRoshan <ExternalLink className="inline h-3 w-3" />
            </a>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b mb-3 tracking-wider border-gray-300 dark:border-neutral-600 text-black dark:text-white print:border-black print:text-black">
            Summary
          </h2>
          <p className="text-justify text-gray-900 dark:text-gray-300">
            {siteContent.profile.intro}
          </p>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b mb-3 tracking-wider border-gray-300 dark:border-neutral-600 text-black dark:text-white print:border-black print:text-black">
            Education
          </h2>
          {siteContent.education.map((edu, idx) => (
            <div key={idx} className="flex flex-wrap justify-between items-baseline">
              <div>
                <h3 className="font-bold text-black dark:text-white print:text-black">{edu.degree}</h3>
                <p className="italic text-gray-900 dark:text-gray-300">{edu.institution}</p>
              </div>
              <div className="text-right mt-1 sm:mt-0 text-gray-900 dark:text-gray-300">
                <p>{edu.period}</p>
                {edu.gpa && <p>CGPA: {edu.gpa}</p>}
              </div>
            </div>
          ))}
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b mb-3 tracking-wider border-gray-300 dark:border-neutral-600 text-black dark:text-white print:border-black print:text-black">
            Experience
          </h2>
          {siteContent.experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex flex-wrap justify-between items-baseline mb-1">
                <h3 className="font-bold text-black dark:text-white print:text-black">{exp.role}</h3>
                <p className="whitespace-nowrap ml-auto text-gray-900 dark:text-gray-300">{exp.period}</p>
              </div>
              <p className="italic mb-2 text-gray-900 dark:text-gray-300">{exp.organization}</p>
              <ul className="list-disc list-outside ml-5 space-y-1 text-gray-900 dark:text-gray-300">
                {exp.points.map((point, pidx) => (
                  <li key={pidx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b mb-3 tracking-wider border-gray-300 dark:border-neutral-600 text-black dark:text-white print:border-black print:text-black">
            Projects
          </h2>

          {siteContent.projects.map((project) => (
            <div
              key={project.title}
              className={`mb-5 group transition-all duration-300 ${getProjectOpacity(project.title)}`}
              onMouseEnter={() => setFocusedProject(project.title)}
              onMouseLeave={() => setFocusedProject(null)}
            >
              <div className="flex flex-wrap justify-between items-baseline gap-x-4 mb-0.5">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h3 className="font-bold text-black dark:text-white print:text-black">{project.title}</h3>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white hidden md:inline"
                    title="View project"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  {/* Ask AI for project */}
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-tight text-gray-500 dark:text-neutral-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 print:hidden">
                    <span className="opacity-60">↳ Ask AI:</span>
                    <a
                      href={askAI(`Search the web for ${project.title} by Ravani Roshan`).gpt}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-900 dark:text-gray-300 hover:underline"
                    >
                      ChatGPT
                    </a>
                    <span className="opacity-40">|</span>
                    <a
                      href={askAI(`Search the web for ${project.title} by Ravani Roshan`).gemini}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-900 dark:text-gray-300 hover:underline"
                    >
                      Gemini
                    </a>
                  </span>
                </div>
                <p className="whitespace-nowrap ml-auto text-gray-900 dark:text-gray-300">{project.period}</p>
              </div>
              <p className="italic mb-2 text-gray-700 dark:text-gray-400">{project.description}</p>
              <ul className="list-disc list-outside ml-5 space-y-1 text-gray-900 dark:text-gray-300">
                {project.highlights?.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="mb-0 relative">
          <h2 className="text-lg font-bold uppercase border-b mb-3 tracking-wider flex justify-between items-end border-gray-300 dark:border-neutral-600 text-black dark:text-white print:border-black print:text-black">
            Skills
            <span className="text-[10px] font-normal normal-case tracking-normal mb-1 text-gray-500 dark:text-neutral-500 print:hidden">
              Hover items to highlight matching projects
            </span>
          </h2>

          <div className="space-y-2">
            {siteContent.skillCategories.map((category) => (
              <div key={category.name} className="flex flex-col sm:flex-row sm:items-start">
                <span className="font-bold w-48 shrink-0 mb-1 sm:mb-0 text-black dark:text-white print:text-black">
                  {category.name}:
                </span>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  {category.items.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => handleTagClick(skill)}
                      onMouseEnter={() => handleTagHover(skill)}
                      onMouseLeave={() => handleTagHover(null)}
                      className={`cursor-pointer border-b border-dotted px-1 transition-colors ${
                        currentTag === skill
                          ? "bg-gray-200 dark:bg-neutral-700 font-semibold text-black dark:text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
                      }`}
                      title={skill}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ResumePage;
