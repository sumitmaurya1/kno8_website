import type { SocialPlatform } from "@/types";
import { SocialIcon } from "./SocialIcon";

const labels = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  x: "X",
  linkedin: "LinkedIn",
};

const iconClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg";

/**
 * A row of round social buttons. An entry without a URL is drawn as a plain
 * icon rather than a link, so it never leads anywhere wrong. Renders nothing
 * when there are no entries.
 */
export function SocialLinks({
  links,
  owner,
}: {
  links: { platform: SocialPlatform; href: string | null }[];
  owner: string;
}) {
  if (links.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={link.platform}>
          {link.href ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${owner} on ${labels[link.platform]} (opens in a new tab)`}
              className={`${iconClass} transition-colors hover:border-electric/50 hover:text-electric`}
            >
              <SocialIcon platform={link.platform} className="h-[18px] w-[18px]" />
            </a>
          ) : (
            <span
              role="img"
              aria-label={`${owner} on ${labels[link.platform]} (link coming soon)`}
              title="Link coming soon"
              className={iconClass}
            >
              <SocialIcon platform={link.platform} className="h-[18px] w-[18px]" />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
