import type { ReactNode } from "react";
import Label from "@/components/atoms/Label";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}

export default function FormField({
  id,
  label,
  required = false,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div
      className={["flex flex-col gap-2", className ?? ""]
        .filter(Boolean)
        .join(" ")}
    >
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs font-medium text-danger-strong"
        >
          {error}
        </p>
      )}
    </div>
  );
}
