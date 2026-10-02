import { cn } from "@/lib/utils";

const tones = {
  blue: "radial-gradient(circle at 30% 28%, #9BF0FF 0%, #2F7BFF 38%, #1B2FD1 72%, #101A7A 100%)",
  violet: "radial-gradient(circle at 30% 28%, #E3B8FF 0%, #8B45FF 40%, #4A1FD0 74%, #25107A 100%)",
};

/** A lit sphere, echoing the two halves of the logo. Decorative only. */
export function Orb({
  tone = "blue",
  className,
}: {
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none block animate-float rounded-full shadow-[0_24px_40px_-14px_rgba(77,70,255,0.55)]",
        className,
      )}
      style={{ backgroundImage: tones[tone] }}
    />
  );
}
