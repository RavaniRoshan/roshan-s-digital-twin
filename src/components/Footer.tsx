import { SocialIcon } from "@/components/SocialIcon";
import { siteContent } from "@/content/siteContent";

const Footer = () => {
  const brandSocials = siteContent.profile.socials.filter((link) => link.iconMode === "brandfetch");
  const textActions = siteContent.profile.socials.filter((link) => link.iconMode !== "brandfetch");

  return (
    <footer className="mt-16 border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <p className="mb-6 max-w-2xl text-sm leading-7 text-foreground/75">
          building useful products, agentic systems, and developer tools with a product-first mindset.
        </p>

        <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
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
            {textActions.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded border border-border px-3 py-2 text-sm text-foreground no-underline transition-colors hover:border-primary hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
          <span>copyright 2026 roshan ravani</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
