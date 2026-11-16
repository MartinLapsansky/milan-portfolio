import Image from "next/image";
import type { StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Badge from "@/components/atoms/Badge";
import { PROJECT_STATUS_META } from "@/lib/projects";
import type { ProjectStatus } from "@/lib/projects";

interface ProjectCardProps {
  name: string;
  image: StaticImageData | string;
  status: ProjectStatus;
  /** Opens the project detail dialog. */
  onOpen: () => void;
  className?: string;
}

export default function ProjectCard({
  name,
  image,
  status,
  onOpen,
  className,
}: ProjectCardProps) {
  const statusMeta = PROJECT_STATUS_META[status];

  return (
    <article
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-primary-subtle-border hover:shadow-md has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-focus-ring",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative aspect-3/2 w-full bg-surface-sunken">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-tight tracking-tight text-text">
            {name}
          </h3>
          <Badge tone={statusMeta.tone} className="shrink-0">
            {statusMeta.label}
          </Badge>
        </div>

        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-text-brand"
        >
          Zobraziť detaily
          <FontAwesomeIcon
            icon={faArrowRight}
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </span>
      </div>

      {/* Full-card hit area: the heading stays semantic while the whole card opens the dialog. */}
      <button
        type="button"
        onClick={(event) => {
          /* Keep the card focused so the dialog can restore focus here on close. */
          event.currentTarget.focus();
          onOpen();
        }}
        aria-haspopup="dialog"
        aria-label={`Zobraziť detaily projektu: ${name}`}
        className="absolute inset-0 cursor-pointer rounded-xl focus-visible:outline-none"
      />
    </article>
  );
}
