import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { industries } from "@/data/content";
import { IndustryCard } from "./IndustryCard";

export function IndustryGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((industry, index) => (
        <li key={industry.title}>
          <Reveal delay={(index % 3) * 0.06} className="h-full">
            <Tilt>
              <IndustryCard {...industry} />
            </Tilt>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
