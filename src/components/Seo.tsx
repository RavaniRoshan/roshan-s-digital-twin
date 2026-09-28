import { useEffect } from "react";
import { site } from "@/content/site";

/**
 * Document head: title, description, canonical, Open Graph, and a JSON-LD
 * Person graph built from the same data the page renders.
 *
 * Every absolute URL is gated on VITE_SITE_URL. There is no deploy config or
 * recorded domain for this site, and a wrong canonical is actively harmful —
 * it asserts an authoritative copy at a URL that does not serve it. So when the
 * origin is unknown the absolute tags are omitted and the relative descriptions
 * still ship. Set the variable and the full set appears.
 *
 * The JSON-LD reuses site.identity rather than restating it, so the structured
 * data cannot drift away from what a visitor actually sees — the failure mode
 * that makes most rich results untrustworthy.
 */
export function Seo() {
  useEffect(() => {
    const head = document.head;
    const origin = site.url;
    const person = site.identity;

    document.title = `${person.name} — AI Systems Builder`;

    const set = (attr: "name" | "property", key: string, content: string) => {
      let el = head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        head.appendChild(el);
      }
      el.content = content;
    };

    set("name", "description", person.summary);
    set("property", "og:type", "profile");
    set("property", "og:title", `${person.name} — AI Systems Builder`);
    set("property", "og:description", person.summary);
    set("property", "og:site_name", person.name);
    set("name", "twitter:card", "summary");
    set("name", "twitter:title", `${person.name} — AI Systems Builder`);
    set("name", "twitter:description", person.summary);

    if (origin) {
      set("property", "og:url", origin);
      set("property", "og:image", `${origin}/og.png`);
      set("name", "twitter:image", `${origin}/og.png`);

      let canonical = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        head.appendChild(canonical);
      }
      canonical.href = origin;

      const ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: person.name,
        alternateName: person.handle,
        description: person.summary,
        jobTitle: person.role,
        url: origin,
        image: `${origin}/og.png`,
        address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressCountry: "IN" },
        knowsAbout: [
          "autonomous agents",
          "multi-agent orchestration",
          "sandboxed execution",
          "token budgets",
          "circuit breakers",
          "policy runtimes",
          "rust",
          "python",
          "typescript",
        ],
        sameAs: person.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
      });
      head.appendChild(ld);

      return () => {
        ld.remove();
      };
    }
  }, []);

  return null;
}
