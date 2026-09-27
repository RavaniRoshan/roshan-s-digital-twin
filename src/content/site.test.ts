import { describe, expect, it } from "vitest";
import { site } from "./site";

describe("site content", () => {
  it("has six flagship projects with unique slugs", () => {
    expect(site.projects).toHaveLength(6);
    const slugs = site.projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("links every project to github", () => {
    for (const p of site.projects) {
      expect(p.href).toMatch(/^https:\/\/github\.com\/RavaniRoshan\//);
    }
  });

  it("has a non-empty build log and socials", () => {
    expect(site.log.length).toBeGreaterThan(0);
    for (const s of site.profile.socials) {
      expect(s.href).toMatch(/^(https:|mailto:)/);
    }
  });
});
