import { navigationItems } from "@/lib/navigation";

type NavigationProps = {
  className?: string;
  ariaLabel?: string;
};

export function Navigation({ className, ariaLabel = "Primary navigation" }: NavigationProps) {
  return (
    <nav className={className} aria-label={ariaLabel}>
      {navigationItems.map(({ href, label: itemLabel }) => (
        <a href={href} key={href}>{itemLabel}</a>
      ))}
    </nav>
  );
}
