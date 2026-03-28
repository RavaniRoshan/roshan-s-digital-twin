export type BrandfetchLogoType = "icon" | "logo" | "symbol";
export type BrandfetchFallback = "brandfetch" | "transparent" | "lettermark" | "404";
export type BrandfetchTheme = "light" | "dark";

interface BuildBrandfetchLogoUrlOptions {
  domain: string;
  type?: BrandfetchLogoType;
  fallback?: BrandfetchFallback;
  theme?: BrandfetchTheme;
  w?: number;
  h?: number;
}

export const BRANDFETCH_CLIENT_ID = import.meta.env.VITE_BRANDFETCH_CLIENT_ID ?? "";

export const buildBrandfetchLogoUrl = ({
  domain,
  type = "icon",
  fallback = "lettermark",
  theme,
  w = 40,
  h = 40,
}: BuildBrandfetchLogoUrlOptions) => {
  if (!BRANDFETCH_CLIENT_ID) {
    return "";
  }

  const pathSegments = [
    "https://cdn.brandfetch.io",
    "domain",
    encodeURIComponent(domain),
    "w",
    String(w),
    "h",
    String(h),
  ];

  if (theme) {
    pathSegments.push("theme", theme);
  }

  pathSegments.push("fallback", fallback, "type", type);

  return `${pathSegments.join("/")}?c=${encodeURIComponent(BRANDFETCH_CLIENT_ID)}`;
};
