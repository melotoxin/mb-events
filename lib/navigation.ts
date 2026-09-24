export type NavigationItem = {
  label: string;
  href: `/${string}`;
};

export const navigationItems = [
  { label: "Experiences", href: "/experiences" },
  { label: "Venues", href: "/venues" },
  { label: "Real Events", href: "/real-events" },
  { label: "About Us", href: "/about" },
] as const satisfies readonly NavigationItem[];
