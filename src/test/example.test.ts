import { describe, expect, it } from "vitest";
import { siteContent } from "@/content/siteContent";

describe("site content", () => {
  it("keeps OpenJCK as the leading project", () => {
    expect(siteContent.projects[0]?.title).toBe("OpenJCK");
  });

  it("publishes a news route for OpenJCK", () => {
    expect(siteContent.newsPosts.some((post) => post.slug === "openjck")).toBe(true);
  });

  it("provides a stable resume download path", () => {
    expect(siteContent.profile.resumeHref).toBe("/resume/roshan-ravani-resume-2026.pdf");
  });

  it("brands social and certification entries with explicit domains", () => {
    const brandedSocials = siteContent.profile.socials.filter((link) => link.iconMode === "brandfetch");

    expect(brandedSocials.every((link) => Boolean(link.brandDomain))).toBe(true);
    expect(siteContent.certifications.some((cert) => cert.issuerDomain === "anthropic.com")).toBe(true);
    expect(siteContent.certifications.some((cert) => cert.issuerDomain === "google.com")).toBe(true);
    expect(siteContent.certifications.some((cert) => cert.issuerDomain === "deeplearning.ai")).toBe(true);
  });
});
