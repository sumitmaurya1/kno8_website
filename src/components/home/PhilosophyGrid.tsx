import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { philosophy } from "@/data/content";
import { cn } from "@/lib/utils";
import { PhilosophyCard } from "./PhilosophyCard";

export function PhilosophyGrid({ columns = 4 }: { columns?: 2 | 4 }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2", columns === 4 && "lg:grid-cols-4")}>
      {philosophy.map((item, index) => (
        <li key={item.title}>
          <Reveal delay={index * 0.05} className="h-full">
            <Tilt>
              <PhilosophyCard {...item} />
            </Tilt>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
