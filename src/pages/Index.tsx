import avatar from "@/assets/avatar.jpg";

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">
                ravani roshan's homepage
              </h1>
              <p className="text-primary font-medium mb-3">
                ai-powered alchemist · full-stack engineer
              </p>
              <p className="text-xs text-muted-foreground font-mono tracking-wider break-all">
                01110011 01110011 01101000 00101101 01100101 01100100 00110010 00111001 01101001
              </p>
            </div>
            <img
              src={avatar}
              alt="Ravani Roshan"
              className="w-24 h-24 rounded-full object-cover border-2 border-border flex-shrink-0"
            />
          </div>

          {/* About */}
          <Section title="about me">
            <p className="mb-4">
              i don't just "code"—i teach rocks how to think and get them to thank me for it.
              i'm a founder-engineer who treats production like a jazz solo: calculated chaos with
              a lot of soul. i build high-ROI AI products because "impossible" is just a dare i
              haven't taken yet.
            </p>
            <p>
              my goal? automate the mundane, scale the genius, and build the kind of tech that
              makes Skynet look like a pocket calculator. i'm here to ship fast, break the status
              quo, and turn ungodly amounts of caffeine into pure, monetizable magic.
            </p>
          </Section>

          {/* What I'm Up To */}
          <Section title="what i'm up to">
            <ul className="space-y-2 list-none p-0">
              <li>🔭 <strong>currently architecting:</strong> Axiom-One (Research-Grade Reasoning System) & Agent-X (Vision-Language Browser Agent)</li>
              <li>🌱 <strong>downloading to brain:</strong> Agentic AI, LangGraph, Fine-tuning... learning how to make the machines do my chores</li>
              <li>🤝 <strong>looking for co-conspirators:</strong> to build innovative AI projects or anything that sounds vaguely impossible</li>
              <li>💬 <strong>provoke me about:</strong> system architecture, the singularity, or why AI ethics is the only conversation worth having</li>
              <li>⚡ <strong>weird flex:</strong> fine-tuned 8 AI models, swept 3 hackathons, 120 WPM. blood stream is 90% Arabica</li>
            </ul>
          </Section>

          {/* Tools */}
          <Section title="tools i use to bend reality">
            <ToolCategory title="programming languages" items={["Python", "JavaScript", "TypeScript", "Rust", "C++", "C#", "Kotlin", "Swift", "PHP"]} />
            <ToolCategory title="frameworks & libraries" items={["React", "Node.js", "FastAPI", "Next.js", "Django", "Flask", "Playwright"]} />
            <ToolCategory title="ai/ml & data science" items={["TensorFlow", "PyTorch", "LangChain", "Hugging Face", "Anthropic", "Semantic Kernel", "Pandas", "NumPy", "scikit-learn"]} />
            <ToolCategory title="cloud & devops" items={["AWS", "Google Cloud", "Docker", "Kubernetes", "Git"]} />
          </Section>

          {/* Learn More */}
          <Section title="learn more">
            <p className="mb-4">
              you can find my featured projects and certifications on the{" "}
              <a href="/works">works page</a>.
            </p>
            <p>
              this website is intended to help people find and connect with me while also serving
              as a personal reference. feel free to reach out over{" "}
              <a href="https://www.linkedin.com/in/ravani-roshan" target="_blank" rel="noopener noreferrer">
                linkedin
              </a>{" "}
              or{" "}
              <a href="mailto:ravaniroshansingh@gmail.com">email</a>.
            </p>
          </Section>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          {/* News */}
          <SidebarSection title="news">
            <div className="space-y-4 text-sm">
              <NewsItem date="2025" text='currently architecting Axiom-One & Agent-X — research-grade AI systems' />
              <NewsItem date="2024" text="swept 3 hackathons and fine-tuned 8 AI models" />
              <NewsItem date="2024" text='completed "AI Agents in LangGraph" & "Finetuning LLMs" from DeepLearning.AI' />
              <NewsItem date="2025" text='earned "Building toward Computer Use" cert from Anthropic' />
            </div>
          </SidebarSection>

          {/* Links */}
          <SidebarSection title="links">
            <div className="space-y-2 text-sm">
              <SidebarLink icon="💼" label="linkedin" href="https://www.linkedin.com/in/ravani-roshan" />
              <SidebarLink icon="🐙" label="github" href="https://github.com/RavaniRoshan" />
              <SidebarLink icon="📧" label="email" href="mailto:ravaniroshansingh@gmail.com" />
              <SidebarLink icon="🌐" label="portfolio" href="https://ravani-roshan-singh.vercel.app/certificates" />
              <SidebarLink icon="💻" label="hackerrank" href="https://www.hackerrank.com/profile/ravaniroshansingh" />
            </div>
          </SidebarSection>
        </aside>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-base font-semibold mb-1 text-foreground">
      {title}
    </h2>
    <div className="border-b border-border mb-4" />
    <div className="text-sm leading-relaxed text-foreground/90">
      {children}
    </div>
  </section>
);

const SidebarSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h3 className="text-base font-semibold mb-1 text-foreground">{title}</h3>
    <div className="border-b border-border mb-4" />
    {children}
  </div>
);

const NewsItem = ({ date, text }: { date: string; text: string }) => (
  <div>
    <span className="text-primary font-medium">{date}:</span>{" "}
    <span className="text-foreground/80">{text}</span>
  </div>
);

const SidebarLink = ({ icon, label, href }: { icon: string; label: string; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-foreground/80 hover:text-primary no-underline transition-colors"
  >
    <span>{icon}</span>
    <span>{label}</span>
  </a>
);

const ToolCategory = ({ title, items }: { title: string; items: string[] }) => (
  <div className="mb-4">
    <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default HomePage;
