import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowDownToLine } from "lucide-react";
import avatar from "@/assets/profile/profile-home.png";
import { SocialIcon } from "@/components/SocialIcon";
import { siteContent } from "@/content/siteContent";

const HomePage = () => {
  const { profile } = siteContent;
  const brandSocials = profile.socials.filter((link) => link.iconMode === "brandfetch");
  const textActions = profile.socials.filter((link) => link.iconMode !== "brandfetch");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex-1 min-w-0">
          <section className="mb-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex-1">
                <p className="mb-3 text-sm uppercase tracking-[0.24em] text-muted-foreground">home</p>
                <h1 className="mb-2 text-2xl font-semibold text-foreground sm:text-3xl">{profile.name}</h1>
                <p className="mb-3 text-sm text-primary sm:text-base">{profile.headline}</p>
                <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">{profile.location}</p>
                <p className="max-w-2xl text-sm leading-7 text-foreground/85">{profile.intro}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={profile.resumeHref}
                    download
                    className="inline-flex items-center gap-2 rounded border border-primary/40 bg-primary/10 px-3 py-2 text-sm font-medium uppercase tracking-[0.16em] text-primary no-underline transition-colors hover:bg-primary/15"
                  >
                    <ArrowDownToLine className="h-3.5 w-3.5" />
                    download resume
                  </a>
                </div>
              </div>
              <img
                src={avatar}
                alt="Roshan Ravani"
                className="h-20 w-20 rounded-full border border-border object-cover sm:h-24 sm:w-24"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {profile.stats.map((stat) => (
                <span key={stat.label} className="rounded border border-border bg-card px-3 py-1 text-sm text-foreground/80">
                  {stat.value} {stat.label}
                </span>
              ))}
            </div>
          </section>

          <Section title="about">
            {profile.about.map((paragraph) => (
              <p key={paragraph} className="mb-4 last:mb-0 text-sm leading-7 text-foreground/85">
                {paragraph}
              </p>
            ))}
          </Section>

          <Section title="current focus">
            <ul className="space-y-3 text-sm leading-7 text-foreground/85">
              {profile.currentFocus.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </Section>

          <Section title="selected capabilities">
            <div className="space-y-4">
              {profile.skills.map((group) => (
                <div key={group.title}>
                  <h3 className="mb-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded bg-secondary px-2 py-1 text-sm text-secondary-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="next">
            <p className="mb-4 text-sm leading-7 text-foreground/85">
              the full project archive and updated certifications live on the <Link to="/works" className="text-primary underline hover:text-primary/90">works page</Link>.
            </p>
            <p className="text-sm leading-7 text-foreground/85">
              the latest product note is the <Link to="/news/openjck" className="text-primary underline hover:text-primary/90">OpenJCK feature</Link>, which now anchors the news section.
            </p>
          </Section>
        </div>

        <aside className="w-full flex-shrink-0 lg:w-72 lg:mt-0 mt-8">
          <SidebarSection title="news">
            <div className="space-y-4 text-sm">
              {profile.updates.map((item) => (
                <div key={`${item.date}-${item.text}`}>
                  <p className="mb-1 text-sm text-primary">{item.date}</p>
                  {item.href ? (
                    item.internal ? (
                      <Link to={item.href} className="text-foreground/80 no-underline hover:text-primary">
                        {item.text}
                      </Link>
                    ) : (
                      <a href={item.href} className="text-foreground/80 no-underline hover:text-primary">
                        {item.text}
                      </a>
                    )
                  ) : (
                    <p className="text-foreground/80">{item.text}</p>
                  )}
                </div>
              ))}
              <Link to="/news" className="inline-block text-sm no-underline hover:text-primary">
                view all news
              </Link>
            </div>
          </SidebarSection>

          <SidebarSection title="links">
            <div className="flex flex-wrap gap-3">
              {brandSocials.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded border border-border bg-card/90 p-2 no-underline transition-transform hover:-translate-y-0.5"
                >
                  <SocialIcon label={link.label} size={20} />
                </a>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-sm">
              {textActions.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-foreground/80 no-underline transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </SidebarSection>
        </aside>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mb-8">
    <h2 className="mb-1 text-base font-semibold text-foreground">{title}</h2>
    <div className="mb-4 border-b border-border" />
    <div className="text-sm leading-7 text-foreground/90">{children}</div>
  </section>
);

const SidebarSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="mb-8">
    <h3 className="mb-1 text-base font-semibold text-foreground">{title}</h3>
    <div className="mb-4 border-b border-border" />
    {children}
  </div>
);

export default HomePage;
