import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  /**
   * Render a plain `<a>` (new tab) instead of a Next `Link` — for static files
   * such as a CV PDF that are not App Router routes.
   */
  external?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  "aria-label"?: string;
}

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary shadow-brand hover:bg-primary-hover active:bg-primary-active",
  secondary:
    "border border-border-strong bg-surface text-text hover:border-primary-subtle-border hover:bg-primary-subtle hover:text-text-brand active:bg-primary-subtle",
  ghost:
    "text-text-muted hover:bg-primary-subtle hover:text-text-brand active:bg-primary-subtle",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-11 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-12 px-6 text-base sm:h-14 sm:px-8 sm:text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external = false,
  type = "button",
  onClick,
  disabled = false,
  fullWidth = false,
  className,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = [
    BASE,
    VARIANTS[variant],
    SIZES[size],
    fullWidth ? "w-full" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
