import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface ServiceCardProps {
  name: string;
  description: string;
  icon: IconDefinition;
  className?: string;
}

export default function ServiceCard({
  name,
  description,
  icon,
  className,
}: ServiceCardProps) {
  return (
    <article
      className={[
        "flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-bold leading-tight tracking-tight text-text sm:text-xl">
          {name}
        </h3>

        <span
          aria-hidden="true"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-subtle text-text-brand"
        >
          <FontAwesomeIcon icon={icon} className="h-6 w-6" />
        </span>
      </div>

      <p className="mt-auto pt-4 text-base leading-relaxed text-text-muted">
        {description}
      </p>
    </article>
  );
}
