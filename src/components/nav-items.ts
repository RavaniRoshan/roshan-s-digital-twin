export const NAV_ITEMS = [
  { index: "01", label: "dashboard", to: "/", hint: "live status" },
  { index: "02", label: "systems", to: "/systems", hint: "all builds" },
  { index: "03", label: "timeline", to: "/timeline", hint: "ship log" },
  { index: "04", label: "credentials", to: "/resume", hint: "skills + certs" },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
