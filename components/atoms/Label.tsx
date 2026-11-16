import type { ReactNode } from "react";

interface LabelProps {
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export default function Label({
  htmlFor,
  required = false,
  children,
  className,
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={["block text-sm font-semibold text-text", className ?? ""]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
      {required && (
        <>
          <span aria-hidden="true" className="ml-0.5 text-danger-strong">
            *
          </span>
          <span className="sr-only"> (povinné)</span>
        </>
      )}
    </label>
  );
}
