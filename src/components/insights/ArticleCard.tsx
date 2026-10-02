import Link from "next/link";
import { LogoMark } from "@/components/ui/Logo";
import type { Article } from "@/types";
import { formatDate } from "@/lib/utils";

/** Cover gradients rotate by position until articles carry their own images. */
const covers = [
  "linear-gradient(135deg, #10CFF5 0%, #2563FF 60%, #1B2FD1 100%)",
  "linear-gradient(135deg, #2563FF 0%, #6D35FF 100%)",
  "linear-gradient(135deg, #6D35FF 0%, #A633FF 100%)",
];

export function ArticleCard({ article, index = 0 }: { article: Article; index?: number }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-transform duration-300 ease-out-soft hover:-translate-y-1">
      <div
        aria-hidden="true"
        className="relative flex aspect-[16/10] items-center justify-center overflow-hidden"
        style={{ backgroundImage: covers[index % covers.length] }}
      >
        <LogoMark className="h-24 w-auto opacity-90 mix-blend-luminosity" sizes="80px" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="self-start rounded-full bg-[#ECEBFF] px-3 py-1 text-xs font-semibold text-iris">
          {article.category}
        </p>
        <h3 className="mt-4 font-display text-xl font-bold leading-snug tracking-tight">
          <Link href={`/insights/${article.slug}`} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>
        <p className="mt-auto pt-5 text-sm text-muted">
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span className="mx-2" aria-hidden="true">
            •
          </span>
          {article.readingMinutes} min read
        </p>
      </div>
    </article>
  );
}
