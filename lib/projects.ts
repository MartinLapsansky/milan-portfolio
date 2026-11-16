import type { StaticImageData } from "next/image";
import type { BadgeTone } from "@/components/atoms/Badge";

export type ProjectStatus = "rozpracovany" | "dokonceny" | "modelove-zadanie";

export interface Project {
  name: string;
  image: StaticImageData | string;
  status: ProjectStatus;
  goal: string;
  tools: string;
  results: string;
  nextSteps: string;
}

/** Single source of truth for how each project status is presented. */
export const PROJECT_STATUS_META: Record<
  ProjectStatus,
  { label: string; tone: BadgeTone }
> = {
  rozpracovany: { label: "Rozpracovaný", tone: "warning" },
  dokonceny: { label: "Dokončený", tone: "success" },
  "modelove-zadanie": { label: "Modelové zadanie", tone: "info" },
};
