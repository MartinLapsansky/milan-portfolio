import Image from "next/image";
import type { StaticImageData } from "next/image";
import Badge from "@/components/atoms/Badge";
import { PROJECT_STATUS_META } from "@/lib/projects";
import type { ProjectStatus } from "@/lib/projects";

type DetailKey = "goal" | "tools" | "results" | "nextSteps";

interface ProjectDetailsProps {
  name: string;
  image: StaticImageData | string;
  status: ProjectStatus;
  goal: string;
  tools: string;
  results: string;
  nextSteps: string;
}

const DETAILS: { key: DetailKey; label: string }[] = [
  { key: "goal", label: "Cieľ projektu" },
  { key: "tools", label: "Použité nástroje" },
  { key: "results", label: "Výsledky merania" },
  { key: "nextSteps", label: "Zistenia a ďalší postup" },
];

export default function ProjectDetails({
  name,
  image,
  status,
  goal,
  tools,
  results,
  nextSteps,
}: ProjectDetailsProps) {
  const statusMeta = PROJECT_STATUS_META[status];
  const details: Record<DetailKey, string> = { goal, tools, results, nextSteps };

  return (
    <div className="flex flex-col gap-5">
      <div className="relative aspect-16/9 w-full overflow-hidden rounded-lg bg-surface-sunken">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, 672px"
          className="object-cover"
        />
      </div>

      <Badge tone={statusMeta.tone} className="self-start">
        {statusMeta.label}
      </Badge>

      <dl className="flex flex-col gap-4">
        {DETAILS.map(({ key, label }) => (
          <div key={key}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-text-subtle">
              {label}
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-text-muted">
              {details[key]}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
