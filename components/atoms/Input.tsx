import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

const BASE =
  "h-12 w-full rounded-lg border bg-surface px-4 text-base text-text transition-colors duration-200 placeholder:text-text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:cursor-not-allowed disabled:opacity-60";

export default function Input({
  invalid = false,
  className,
  ...props
}: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={[
        BASE,
        invalid
          ? "border-danger focus-visible:ring-danger"
          : "border-border hover:border-border-strong",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
