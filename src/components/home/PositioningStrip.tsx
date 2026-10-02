import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { positioning } from "@/data/content";

export function PositioningStrip() {
  return (
    <section aria-label="What Kno8 stands for" className="pb-8 pt-6">
      <Container>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {positioning.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 0.05} className="h-full">
                <Tilt max={10}>
                  <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-card [transform-style:preserve-3d]">
                    <IconBadge icon={item.icon} className="[transform:translateZ(36px)]" />
                    <p className="mt-5 font-display text-lg font-bold tracking-tight [transform:translateZ(22px)]">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">{item.description}</p>
                  </div>
                </Tilt>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
