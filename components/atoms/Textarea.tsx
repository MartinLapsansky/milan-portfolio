import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

const BASE =
  "min-h-32 w-full resize-y rounded-lg border bg-surface px-4 py-3 text-base text-text transition-colors duration-200 placeholder:text-text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:cursor-not-allowed disabled:opacity-60";

export default function Textarea({
  invalid = false,
  className,
  ...props
}: TextareaProps) {
  return (
    <textarea
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
