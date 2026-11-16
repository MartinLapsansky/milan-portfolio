import Link from "next/link";

interface NavItemProps {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function NavItem({
  href,
  label,
  active = false,
  onClick,
}: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "location" : undefined}
      className={[
        "inline-flex items-center rounded-full px-3 py-2 text-xs font-semibold tracking-wide transition-colors duration-200 xl:px-4 xl:text-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
        active
          ? "bg-primary text-on-primary shadow-brand"
          : "text-text-muted hover:bg-primary-subtle hover:text-text-brand",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}
