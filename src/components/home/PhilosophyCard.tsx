import type { LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/ui/IconBadge";

export function PhilosophyCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <article className="h-full rounded-2xl border border-line bg-surface p-6 shadow-card [transform-style:preserve-3d]">
      <IconBadge icon={icon} className="[transform:translateZ(36px)]" />
      <h3 className="mt-5 font-display text-xl font-bold tracking-tight [transform:translateZ(22px)]">{title}</h3>
      <p className="mt-2 leading-relaxed text-muted">{description}</p>
    </article>
  );
}
