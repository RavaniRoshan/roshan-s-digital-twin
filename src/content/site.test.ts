import { describe, expect, it } from "vitest";
import { site } from "./site";

describe("site content", () => {
  it("exposes six systems with unique slugs", () => {
    expect(site.systems).toHaveLength(6);
    const slugs = site.systems.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("links every system to a RavaniRoshan repository", () => {
    for (const s of site.systems) {
      expect(s.href).toMatch(/^https:\/\/github\.com\/RavaniRoshan\//);
    }
  });

  it("gives every system a problem statement and an approach", () => {
    for (const s of site.systems) {
      expect(s.problem.length).toBeGreaterThan(40);
      expect(s.approach.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("keeps the timeline ordered newest first with valid states", () => {
    expect(site.timeline.length).toBeGreaterThan(0);
    for (const e of site.timeline) {
      expect(["shipped", "active", "killed"]).toContain(e.status);
    }
  });

  it("has safe contact channels and no experience claims", () => {
    for (const s of site.identity.socials) {
      expect(s.href).toMatch(/^(https:|mailto:)/);
    }
    expect("experience" in site).toBe(false);
  });
});
